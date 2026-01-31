import { assert, assertEquals, concat, ige256Decrypt, ige256Encrypt, unreachable } from "../0_deps.js";
import { factorize, getLogger, getRandomInt, intFromBytes, intToBytes, modExp, rsaPad, sha1 } from "../1_utilities.js";
import { Mtproto } from "../2_tl.js";
import { getDcId } from "../3_transport.js";
import { PUBLIC_KEYS } from "../4_constants.js";
import { SessionPlain } from "../4_session.js";
import { ClientAbstract } from "./0_client_abstract.js";
const L = getLogger("ClientPlain");
const LcreateAuthKey = L.branch("createAuthKey");
export class ClientPlain extends ClientAbstract {
    #publicKeys;
    session;
    constructor(dc, params) {
        super();
        this.#publicKeys = params?.publicKeys ?? PUBLIC_KEYS;
        this.session = new SessionPlain(dc, params);
    }
    async invoke(function_) {
        await this.session.send(Mtproto.serializeObject(function_));
        const body = await this.session.receive();
        return await Mtproto.deserializeType(Mtproto.mustGetReturnType(function_._), body);
    }
    async createAuthKey() {
        const nonce = getRandomInt(16);
        LcreateAuthKey.debug("auth key creation started");
        let resPq = null;
        for (let i = 0; i < 10; i++) {
            try {
                LcreateAuthKey.debug(`req_pq_multi [${i + 1}]`);
                resPq = await this.invoke({ _: "req_pq_multi", nonce });
                assert(Mtproto.is("resPQ", resPq));
                assertEquals(resPq.nonce, nonce);
                LcreateAuthKey.debug("got res_pq");
                break;
            }
            catch (err) {
                LcreateAuthKey.debug("req_pq_multi error:", err);
            }
        }
        if (!resPq) {
            unreachable();
        }
        const pq_ = intFromBytes(resPq.pq, { byteOrder: "big", isSigned: false });
        LcreateAuthKey.debug(`pq=${pq_}`);
        const [p_, q_] = factorize(pq_);
        LcreateAuthKey.debug("factorized pq");
        LcreateAuthKey.debug(`p=${p_}, q=${q_}`);
        const p = intToBytes(p_, 4, { byteOrder: "big", isSigned: false });
        const q = intToBytes(q_, 4, { byteOrder: "big", isSigned: false });
        let publicKeyFingerprint;
        let publicKey;
        for (const fingerprint of resPq.server_public_key_fingerprints) {
            const maybePublicKey = this.#publicKeys.find(([k]) => (k === fingerprint));
            if (maybePublicKey) {
                publicKeyFingerprint = fingerprint;
                publicKey = maybePublicKey[1];
                break;
            }
        }
        if (!publicKeyFingerprint || !publicKey) {
            throw new Error("No corresponding public key found");
        }
        const dc = getDcId(this.dc, this.cdn);
        const pq = resPq.pq;
        const serverNonce = resPq.server_nonce;
        const newNonce = getRandomInt(32);
        let encryptedData = await rsaPad(Mtproto.serializeObject({
            _: "p_q_inner_data_dc",
            pq,
            p,
            q,
            dc,
            new_nonce: newNonce,
            nonce,
            server_nonce: serverNonce,
        }), publicKey);
        const dhParams = await this.invoke({
            _: "req_DH_params",
            nonce,
            server_nonce: serverNonce,
            p,
            q,
            public_key_fingerprint: publicKeyFingerprint,
            encrypted_data: encryptedData,
        });
        assert(Mtproto.is("server_DH_params_ok", dhParams));
        LcreateAuthKey.debug("got server_DH_params_ok");
        const newNonce_ = intToBytes(newNonce, 32);
        const serverNonce_ = intToBytes(serverNonce, 16);
        const tmpAesKey = concat([await sha1(concat([newNonce_, serverNonce_])), (await sha1(concat([serverNonce_, newNonce_]))).subarray(0, 0 + 12)]);
        const tmpAesIv = concat([(await sha1(concat([serverNonce_, newNonce_]))).subarray(12, 12 + 8), await sha1(concat([newNonce_, newNonce_])), newNonce_.subarray(0, 0 + 4)]);
        const answerWithHash = ige256Decrypt(dhParams.encrypted_answer, tmpAesKey, tmpAesIv);
        const dhInnerData = await Mtproto.deserializeType("server_DH_inner_data", answerWithHash.slice(20));
        const { g, g_a: gA_, dh_prime: dhPrime_ } = dhInnerData;
        const gA = intFromBytes(gA_, { byteOrder: "big", isSigned: false });
        const dhPrime = intFromBytes(dhPrime_, { byteOrder: "big", isSigned: false });
        const b = getRandomInt(256, false);
        const gB = modExp(BigInt(g), b, dhPrime);
        const data = Mtproto.serializeObject({
            _: "client_DH_inner_data",
            nonce,
            server_nonce: serverNonce,
            retry_id: 0n,
            g_b: intToBytes(gB, 256, { byteOrder: "big" }),
        });
        let dataWithHash = concat([await sha1(data), data]);
        while (dataWithHash.length % 16 !== 0) {
            dataWithHash = concat([dataWithHash, new Uint8Array(1)]);
        }
        encryptedData = ige256Encrypt(dataWithHash, tmpAesKey, tmpAesIv);
        const dhGenOk = await this.invoke({
            _: "set_client_DH_params",
            nonce,
            server_nonce: serverNonce,
            encrypted_data: encryptedData,
        });
        assert(Mtproto.is("dh_gen_ok", dhGenOk));
        LcreateAuthKey.debug("got dh_gen_ok");
        const serverNonceSlice = serverNonce_.subarray(0, 8);
        const salt = newNonce_.subarray(0, 0 + 8).map((v, i) => v ^ serverNonceSlice[i]);
        const authKey_ = modExp(gA, b, dhPrime);
        const authKey = intToBytes(authKey_, 256, { byteOrder: "big", isSigned: false });
        LcreateAuthKey.debug("auth key created");
        return [authKey, intFromBytes(salt)];
    }
}
