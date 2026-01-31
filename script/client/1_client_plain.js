"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientPlain = void 0;
const _0_deps_js_1 = require("../0_deps.js");
const _1_utilities_js_1 = require("../1_utilities.js");
const _2_tl_js_1 = require("../2_tl.js");
const _3_transport_js_1 = require("../3_transport.js");
const _4_constants_js_1 = require("../4_constants.js");
const _4_session_js_1 = require("../4_session.js");
const _0_client_abstract_js_1 = require("./0_client_abstract.js");
const L = (0, _1_utilities_js_1.getLogger)("ClientPlain");
const LcreateAuthKey = L.branch("createAuthKey");
class ClientPlain extends _0_client_abstract_js_1.ClientAbstract {
    #publicKeys;
    session;
    constructor(dc, params) {
        super();
        this.#publicKeys = params?.publicKeys ?? _4_constants_js_1.PUBLIC_KEYS;
        this.session = new _4_session_js_1.SessionPlain(dc, params);
    }
    async invoke(function_) {
        await this.session.send(_2_tl_js_1.Mtproto.serializeObject(function_));
        const body = await this.session.receive();
        return await _2_tl_js_1.Mtproto.deserializeType(_2_tl_js_1.Mtproto.mustGetReturnType(function_._), body);
    }
    async createAuthKey() {
        const nonce = (0, _1_utilities_js_1.getRandomInt)(16);
        LcreateAuthKey.debug("auth key creation started");
        let resPq = null;
        for (let i = 0; i < 10; i++) {
            try {
                LcreateAuthKey.debug(`req_pq_multi [${i + 1}]`);
                resPq = await this.invoke({ _: "req_pq_multi", nonce });
                (0, _0_deps_js_1.assert)(_2_tl_js_1.Mtproto.is("resPQ", resPq));
                (0, _0_deps_js_1.assertEquals)(resPq.nonce, nonce);
                LcreateAuthKey.debug("got res_pq");
                break;
            }
            catch (err) {
                LcreateAuthKey.debug("req_pq_multi error:", err);
            }
        }
        if (!resPq) {
            (0, _0_deps_js_1.unreachable)();
        }
        const pq_ = (0, _1_utilities_js_1.intFromBytes)(resPq.pq, { byteOrder: "big", isSigned: false });
        LcreateAuthKey.debug(`pq=${pq_}`);
        const [p_, q_] = (0, _1_utilities_js_1.factorize)(pq_);
        LcreateAuthKey.debug("factorized pq");
        LcreateAuthKey.debug(`p=${p_}, q=${q_}`);
        const p = (0, _1_utilities_js_1.intToBytes)(p_, 4, { byteOrder: "big", isSigned: false });
        const q = (0, _1_utilities_js_1.intToBytes)(q_, 4, { byteOrder: "big", isSigned: false });
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
        const dc = (0, _3_transport_js_1.getDcId)(this.dc, this.cdn);
        const pq = resPq.pq;
        const serverNonce = resPq.server_nonce;
        const newNonce = (0, _1_utilities_js_1.getRandomInt)(32);
        let encryptedData = await (0, _1_utilities_js_1.rsaPad)(_2_tl_js_1.Mtproto.serializeObject({
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
        (0, _0_deps_js_1.assert)(_2_tl_js_1.Mtproto.is("server_DH_params_ok", dhParams));
        LcreateAuthKey.debug("got server_DH_params_ok");
        const newNonce_ = (0, _1_utilities_js_1.intToBytes)(newNonce, 32);
        const serverNonce_ = (0, _1_utilities_js_1.intToBytes)(serverNonce, 16);
        const tmpAesKey = (0, _0_deps_js_1.concat)([await (0, _1_utilities_js_1.sha1)((0, _0_deps_js_1.concat)([newNonce_, serverNonce_])), (await (0, _1_utilities_js_1.sha1)((0, _0_deps_js_1.concat)([serverNonce_, newNonce_]))).subarray(0, 0 + 12)]);
        const tmpAesIv = (0, _0_deps_js_1.concat)([(await (0, _1_utilities_js_1.sha1)((0, _0_deps_js_1.concat)([serverNonce_, newNonce_]))).subarray(12, 12 + 8), await (0, _1_utilities_js_1.sha1)((0, _0_deps_js_1.concat)([newNonce_, newNonce_])), newNonce_.subarray(0, 0 + 4)]);
        const answerWithHash = (0, _0_deps_js_1.ige256Decrypt)(dhParams.encrypted_answer, tmpAesKey, tmpAesIv);
        const dhInnerData = await _2_tl_js_1.Mtproto.deserializeType("server_DH_inner_data", answerWithHash.slice(20));
        const { g, g_a: gA_, dh_prime: dhPrime_ } = dhInnerData;
        const gA = (0, _1_utilities_js_1.intFromBytes)(gA_, { byteOrder: "big", isSigned: false });
        const dhPrime = (0, _1_utilities_js_1.intFromBytes)(dhPrime_, { byteOrder: "big", isSigned: false });
        const b = (0, _1_utilities_js_1.getRandomInt)(256, false);
        const gB = (0, _1_utilities_js_1.modExp)(BigInt(g), b, dhPrime);
        const data = _2_tl_js_1.Mtproto.serializeObject({
            _: "client_DH_inner_data",
            nonce,
            server_nonce: serverNonce,
            retry_id: 0n,
            g_b: (0, _1_utilities_js_1.intToBytes)(gB, 256, { byteOrder: "big" }),
        });
        let dataWithHash = (0, _0_deps_js_1.concat)([await (0, _1_utilities_js_1.sha1)(data), data]);
        while (dataWithHash.length % 16 !== 0) {
            dataWithHash = (0, _0_deps_js_1.concat)([dataWithHash, new Uint8Array(1)]);
        }
        encryptedData = (0, _0_deps_js_1.ige256Encrypt)(dataWithHash, tmpAesKey, tmpAesIv);
        const dhGenOk = await this.invoke({
            _: "set_client_DH_params",
            nonce,
            server_nonce: serverNonce,
            encrypted_data: encryptedData,
        });
        (0, _0_deps_js_1.assert)(_2_tl_js_1.Mtproto.is("dh_gen_ok", dhGenOk));
        LcreateAuthKey.debug("got dh_gen_ok");
        const serverNonceSlice = serverNonce_.subarray(0, 8);
        const salt = newNonce_.subarray(0, 0 + 8).map((v, i) => v ^ serverNonceSlice[i]);
        const authKey_ = (0, _1_utilities_js_1.modExp)(gA, b, dhPrime);
        const authKey = (0, _1_utilities_js_1.intToBytes)(authKey_, 256, { byteOrder: "big", isSigned: false });
        LcreateAuthKey.debug("auth key created");
        return [authKey, (0, _1_utilities_js_1.intFromBytes)(salt)];
    }
}
exports.ClientPlain = ClientPlain;
