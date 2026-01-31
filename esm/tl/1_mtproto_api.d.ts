import type { Schema } from "./0_types.js";
declare const R: unique symbol;
export type Function = {
    [R]?: unknown;
};
export type ReturnType<T> = T extends Function ? NonNullable<T[typeof R]> : never;
export interface resPQ {
    _: "resPQ";
    nonce: bigint;
    server_nonce: bigint;
    pq: Uint8Array;
    server_public_key_fingerprints: Array<bigint>;
}
export interface p_q_inner_data_dc {
    _: "p_q_inner_data_dc";
    pq: Uint8Array;
    p: Uint8Array;
    q: Uint8Array;
    nonce: bigint;
    server_nonce: bigint;
    new_nonce: bigint;
    dc: number;
}
export interface p_q_inner_data_temp_dc {
    _: "p_q_inner_data_temp_dc";
    pq: Uint8Array;
    p: Uint8Array;
    q: Uint8Array;
    nonce: bigint;
    server_nonce: bigint;
    new_nonce: bigint;
    dc: number;
    expires_in: number;
}
export interface server_DH_params_ok {
    _: "server_DH_params_ok";
    nonce: bigint;
    server_nonce: bigint;
    encrypted_answer: Uint8Array;
}
export interface server_DH_inner_data {
    _: "server_DH_inner_data";
    nonce: bigint;
    server_nonce: bigint;
    g: number;
    dh_prime: Uint8Array;
    g_a: Uint8Array;
    server_time: number;
}
export interface client_DH_inner_data {
    _: "client_DH_inner_data";
    nonce: bigint;
    server_nonce: bigint;
    retry_id: bigint;
    g_b: Uint8Array;
}
export interface dh_gen_ok {
    _: "dh_gen_ok";
    nonce: bigint;
    server_nonce: bigint;
    new_nonce_hash1: bigint;
}
export interface dh_gen_retry {
    _: "dh_gen_retry";
    nonce: bigint;
    server_nonce: bigint;
    new_nonce_hash2: bigint;
}
export interface dh_gen_fail {
    _: "dh_gen_fail";
    nonce: bigint;
    server_nonce: bigint;
    new_nonce_hash3: bigint;
}
export interface bind_auth_key_inner {
    _: "bind_auth_key_inner";
    nonce: bigint;
    temp_auth_key_id: bigint;
    perm_auth_key_id: bigint;
    temp_session_id: bigint;
    expires_at: number;
}
export interface rpc_error {
    _: "rpc_error";
    error_code: number;
    error_message: string;
}
export interface rpc_answer_unknown {
    _: "rpc_answer_unknown";
}
export interface rpc_answer_dropped_running {
    _: "rpc_answer_dropped_running";
}
export interface rpc_answer_dropped {
    _: "rpc_answer_dropped";
    msg_id: bigint;
    seq_no: number;
    bytes: number;
}
export interface future_salt {
    _: "future_salt";
    valid_since: number;
    valid_until: number;
    salt: bigint;
}
export interface future_salts {
    _: "future_salts";
    req_msg_id: bigint;
    now: number;
    salts: Array<FutureSalt>;
}
export interface pong {
    _: "pong";
    msg_id: bigint;
    ping_id: bigint;
}
export interface destroy_session_ok {
    _: "destroy_session_ok";
    session_id: bigint;
}
export interface destroy_session_none {
    _: "destroy_session_none";
    session_id: bigint;
}
export interface new_session_created {
    _: "new_session_created";
    first_msg_id: bigint;
    unique_id: bigint;
    server_salt: bigint;
}
export interface gzip_packed {
    _: "gzip_packed";
    packed_data: Uint8Array;
}
export interface msgs_ack {
    _: "msgs_ack";
    msg_ids: Array<bigint>;
}
export interface bad_msg_notification {
    _: "bad_msg_notification";
    bad_msg_id: bigint;
    bad_msg_seqno: number;
    error_code: number;
}
export interface bad_server_salt {
    _: "bad_server_salt";
    bad_msg_id: bigint;
    bad_msg_seqno: number;
    error_code: number;
    new_server_salt: bigint;
}
export interface msg_resend_req {
    _: "msg_resend_req";
    msg_ids: Array<bigint>;
}
export interface msgs_state_req {
    _: "msgs_state_req";
    msg_ids: Array<bigint>;
}
export interface msgs_state_info {
    _: "msgs_state_info";
    req_msg_id: bigint;
    info: Uint8Array;
}
export interface msgs_all_info {
    _: "msgs_all_info";
    msg_ids: Array<bigint>;
    info: Uint8Array;
}
export interface msg_detailed_info {
    _: "msg_detailed_info";
    msg_id: bigint;
    answer_msg_id: bigint;
    bytes: number;
    status: number;
}
export interface msg_new_detailed_info {
    _: "msg_new_detailed_info";
    answer_msg_id: bigint;
    bytes: number;
    status: number;
}
export interface destroy_auth_key_ok {
    _: "destroy_auth_key_ok";
}
export interface destroy_auth_key_none {
    _: "destroy_auth_key_none";
}
export interface destroy_auth_key_fail {
    _: "destroy_auth_key_fail";
}
export interface http_wait {
    _: "http_wait";
    max_delay: number;
    wait_after: number;
    max_wait: number;
}
export interface req_pq_multi {
    _: "req_pq_multi";
    nonce: bigint;
    [R]?: ResPQ;
}
export interface req_DH_params {
    _: "req_DH_params";
    nonce: bigint;
    server_nonce: bigint;
    p: Uint8Array;
    q: Uint8Array;
    public_key_fingerprint: bigint;
    encrypted_data: Uint8Array;
    [R]?: Server_DH_Params;
}
export interface set_client_DH_params {
    _: "set_client_DH_params";
    nonce: bigint;
    server_nonce: bigint;
    encrypted_data: Uint8Array;
    [R]?: Set_client_DH_params_answer;
}
export interface rpc_drop_answer {
    _: "rpc_drop_answer";
    req_msg_id: bigint;
    [R]?: RpcDropAnswer;
}
export interface get_future_salts {
    _: "get_future_salts";
    num: number;
    [R]?: FutureSalts;
}
export interface ping {
    _: "ping";
    ping_id: bigint;
    [R]?: Pong;
}
export interface ping_delay_disconnect {
    _: "ping_delay_disconnect";
    ping_id: bigint;
    disconnect_delay: number;
    [R]?: Pong;
}
export interface destroy_session {
    _: "destroy_session";
    session_id: bigint;
    [R]?: DestroySessionRes;
}
export interface destroy_auth_key {
    _: "destroy_auth_key";
    [R]?: DestroyAuthKeyRes;
}
export interface Types {
    "resPQ": resPQ;
    "p_q_inner_data_dc": p_q_inner_data_dc;
    "p_q_inner_data_temp_dc": p_q_inner_data_temp_dc;
    "server_DH_params_ok": server_DH_params_ok;
    "server_DH_inner_data": server_DH_inner_data;
    "client_DH_inner_data": client_DH_inner_data;
    "dh_gen_ok": dh_gen_ok;
    "dh_gen_retry": dh_gen_retry;
    "dh_gen_fail": dh_gen_fail;
    "bind_auth_key_inner": bind_auth_key_inner;
    "rpc_error": rpc_error;
    "rpc_answer_unknown": rpc_answer_unknown;
    "rpc_answer_dropped_running": rpc_answer_dropped_running;
    "rpc_answer_dropped": rpc_answer_dropped;
    "future_salt": future_salt;
    "future_salts": future_salts;
    "pong": pong;
    "destroy_session_ok": destroy_session_ok;
    "destroy_session_none": destroy_session_none;
    "new_session_created": new_session_created;
    "gzip_packed": gzip_packed;
    "msgs_ack": msgs_ack;
    "bad_msg_notification": bad_msg_notification;
    "bad_server_salt": bad_server_salt;
    "msg_resend_req": msg_resend_req;
    "msgs_state_req": msgs_state_req;
    "msgs_state_info": msgs_state_info;
    "msgs_all_info": msgs_all_info;
    "msg_detailed_info": msg_detailed_info;
    "msg_new_detailed_info": msg_new_detailed_info;
    "destroy_auth_key_ok": destroy_auth_key_ok;
    "destroy_auth_key_none": destroy_auth_key_none;
    "destroy_auth_key_fail": destroy_auth_key_fail;
    "http_wait": http_wait;
}
export interface Functions<T = Function> {
    "req_pq_multi": req_pq_multi;
    "req_DH_params": req_DH_params;
    "set_client_DH_params": set_client_DH_params;
    "rpc_drop_answer": rpc_drop_answer;
    "get_future_salts": get_future_salts;
    "ping": ping;
    "ping_delay_disconnect": ping_delay_disconnect;
    "destroy_session": destroy_session;
    "destroy_auth_key": destroy_auth_key;
}
export interface Enums {
    "ResPQ": ResPQ;
    "P_Q_inner_data": P_Q_inner_data;
    "Server_DH_Params": Server_DH_Params;
    "Server_DH_inner_data": Server_DH_inner_data;
    "Client_DH_Inner_Data": Client_DH_Inner_Data;
    "Set_client_DH_params_answer": Set_client_DH_params_answer;
    "BindAuthKeyInner": BindAuthKeyInner;
    "RpcError": RpcError;
    "RpcDropAnswer": RpcDropAnswer;
    "FutureSalt": FutureSalt;
    "FutureSalts": FutureSalts;
    "Pong": Pong;
    "DestroySessionRes": DestroySessionRes;
    "NewSession": NewSession;
    "Object": Object;
    "MsgsAck": MsgsAck;
    "BadMsgNotification": BadMsgNotification;
    "MsgResendReq": MsgResendReq;
    "MsgsStateReq": MsgsStateReq;
    "MsgsStateInfo": MsgsStateInfo;
    "MsgsAllInfo": MsgsAllInfo;
    "MsgDetailedInfo": MsgDetailedInfo;
    "DestroyAuthKeyRes": DestroyAuthKeyRes;
    "HttpWait": HttpWait;
}
export type AnyType = Types[keyof Types];
export type AnyFunction<T = Function> = Functions<T>[keyof Functions<T>];
export type AnyObject<T = Function> = AnyType | AnyFunction<T>;
export type ResPQ = resPQ;
export type P_Q_inner_data = p_q_inner_data_dc | p_q_inner_data_temp_dc;
export type Server_DH_Params = server_DH_params_ok;
export type Server_DH_inner_data = server_DH_inner_data;
export type Client_DH_Inner_Data = client_DH_inner_data;
export type Set_client_DH_params_answer = dh_gen_ok | dh_gen_retry | dh_gen_fail;
export type BindAuthKeyInner = bind_auth_key_inner;
export type RpcError = rpc_error;
export type RpcDropAnswer = rpc_answer_unknown | rpc_answer_dropped_running | rpc_answer_dropped;
export type FutureSalt = future_salt;
export type FutureSalts = future_salts;
export type Pong = pong;
export type DestroySessionRes = destroy_session_ok | destroy_session_none;
export type NewSession = new_session_created;
export type Object = gzip_packed;
export type MsgsAck = msgs_ack;
export type BadMsgNotification = bad_msg_notification | bad_server_salt;
export type MsgResendReq = msg_resend_req;
export type MsgsStateReq = msgs_state_req;
export type MsgsStateInfo = msgs_state_info;
export type MsgsAllInfo = msgs_all_info;
export type MsgDetailedInfo = msg_detailed_info | msg_new_detailed_info;
export type DestroyAuthKeyRes = destroy_auth_key_ok | destroy_auth_key_none | destroy_auth_key_fail;
export type HttpWait = http_wait;
export declare const schema: Schema;
export {};
//# sourceMappingURL=1_mtproto_api.d.ts.map