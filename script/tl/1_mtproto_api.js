"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
exports.schema = Object.freeze({
    definitions: {
        resPQ: [
            0x05162463,
            [
                ["nonce", "int128"],
                ["server_nonce", "int128"],
                ["pq", "bytes"],
                ["server_public_key_fingerprints", "Vector<long>"],
            ],
            "ResPQ",
        ],
        p_q_inner_data_dc: [
            0xA9F55F95,
            [
                ["pq", "bytes"],
                ["p", "bytes"],
                ["q", "bytes"],
                ["nonce", "int128"],
                ["server_nonce", "int128"],
                ["new_nonce", "int256"],
                ["dc", "int"],
            ],
            "P_Q_inner_data",
        ],
        p_q_inner_data_temp_dc: [
            0x56FDDF88,
            [
                ["pq", "bytes"],
                ["p", "bytes"],
                ["q", "bytes"],
                ["nonce", "int128"],
                ["server_nonce", "int128"],
                ["new_nonce", "int256"],
                ["dc", "int"],
                ["expires_in", "int"],
            ],
            "P_Q_inner_data",
        ],
        server_DH_params_ok: [
            0xD0E8075C,
            [
                ["nonce", "int128"],
                ["server_nonce", "int128"],
                ["encrypted_answer", "bytes"],
            ],
            "Server_DH_Params",
        ],
        server_DH_inner_data: [
            0xB5890DBA,
            [
                ["nonce", "int128"],
                ["server_nonce", "int128"],
                ["g", "int"],
                ["dh_prime", "bytes"],
                ["g_a", "bytes"],
                ["server_time", "int"],
            ],
            "Server_DH_inner_data",
        ],
        client_DH_inner_data: [
            0x6643B654,
            [
                ["nonce", "int128"],
                ["server_nonce", "int128"],
                ["retry_id", "long"],
                ["g_b", "bytes"],
            ],
            "Client_DH_Inner_Data",
        ],
        dh_gen_ok: [
            0x3BCBF734,
            [
                ["nonce", "int128"],
                ["server_nonce", "int128"],
                ["new_nonce_hash1", "int128"],
            ],
            "Set_client_DH_params_answer",
        ],
        dh_gen_retry: [
            0x46DC1FB9,
            [
                ["nonce", "int128"],
                ["server_nonce", "int128"],
                ["new_nonce_hash2", "int128"],
            ],
            "Set_client_DH_params_answer",
        ],
        dh_gen_fail: [
            0xA69DAE02,
            [
                ["nonce", "int128"],
                ["server_nonce", "int128"],
                ["new_nonce_hash3", "int128"],
            ],
            "Set_client_DH_params_answer",
        ],
        bind_auth_key_inner: [
            0x75A3F765,
            [
                ["nonce", "long"],
                ["temp_auth_key_id", "long"],
                ["perm_auth_key_id", "long"],
                ["temp_session_id", "long"],
                ["expires_at", "int"],
            ],
            "BindAuthKeyInner",
        ],
        rpc_error: [
            0x2144CA19,
            [
                ["error_code", "int"],
                ["error_message", "string"],
            ],
            "RpcError",
        ],
        rpc_answer_unknown: [
            0x5E2AD36E,
            [],
            "RpcDropAnswer",
        ],
        rpc_answer_dropped_running: [
            0xCD78E586,
            [],
            "RpcDropAnswer",
        ],
        rpc_answer_dropped: [
            0xA43AD8B7,
            [
                ["msg_id", "long"],
                ["seq_no", "int"],
                ["bytes", "int"],
            ],
            "RpcDropAnswer",
        ],
        future_salt: [
            0x0949D9DC,
            [
                ["valid_since", "int"],
                ["valid_until", "int"],
                ["salt", "long"],
            ],
            "FutureSalt",
        ],
        future_salts: [
            0xAE500895,
            [
                ["req_msg_id", "long"],
                ["now", "int"],
                ["salts", "vector<FutureSalt>"],
            ],
            "FutureSalts",
        ],
        pong: [
            0x347773C5,
            [
                ["msg_id", "long"],
                ["ping_id", "long"],
            ],
            "Pong",
        ],
        destroy_session_ok: [
            0xE22045FC,
            [
                ["session_id", "long"],
            ],
            "DestroySessionRes",
        ],
        destroy_session_none: [
            0x62D350C9,
            [
                ["session_id", "long"],
            ],
            "DestroySessionRes",
        ],
        new_session_created: [
            0x9EC20908,
            [
                ["first_msg_id", "long"],
                ["unique_id", "long"],
                ["server_salt", "long"],
            ],
            "NewSession",
        ],
        gzip_packed: [
            0x3072CFA1,
            [
                ["packed_data", "bytes"],
            ],
            "Object",
        ],
        msgs_ack: [
            0x62D6B459,
            [
                ["msg_ids", "Vector<long>"],
            ],
            "MsgsAck",
        ],
        bad_msg_notification: [
            0xA7EFF811,
            [
                ["bad_msg_id", "long"],
                ["bad_msg_seqno", "int"],
                ["error_code", "int"],
            ],
            "BadMsgNotification",
        ],
        bad_server_salt: [
            0xEDAB447B,
            [
                ["bad_msg_id", "long"],
                ["bad_msg_seqno", "int"],
                ["error_code", "int"],
                ["new_server_salt", "long"],
            ],
            "BadMsgNotification",
        ],
        msg_resend_req: [
            0x7D861A08,
            [
                ["msg_ids", "Vector<long>"],
            ],
            "MsgResendReq",
        ],
        msgs_state_req: [
            0xDA69FB52,
            [
                ["msg_ids", "Vector<long>"],
            ],
            "MsgsStateReq",
        ],
        msgs_state_info: [
            0x04DEB57D,
            [
                ["req_msg_id", "long"],
                ["info", "bytes"],
            ],
            "MsgsStateInfo",
        ],
        msgs_all_info: [
            0x8CC0D131,
            [
                ["msg_ids", "Vector<long>"],
                ["info", "bytes"],
            ],
            "MsgsAllInfo",
        ],
        msg_detailed_info: [
            0x276D3EC6,
            [
                ["msg_id", "long"],
                ["answer_msg_id", "long"],
                ["bytes", "int"],
                ["status", "int"],
            ],
            "MsgDetailedInfo",
        ],
        msg_new_detailed_info: [
            0x809DB6DF,
            [
                ["answer_msg_id", "long"],
                ["bytes", "int"],
                ["status", "int"],
            ],
            "MsgDetailedInfo",
        ],
        destroy_auth_key_ok: [
            0xF660E1D4,
            [],
            "DestroyAuthKeyRes",
        ],
        destroy_auth_key_none: [
            0x0A9F2259,
            [],
            "DestroyAuthKeyRes",
        ],
        destroy_auth_key_fail: [
            0xEA109B13,
            [],
            "DestroyAuthKeyRes",
        ],
        http_wait: [
            0x9299359F,
            [
                ["max_delay", "int"],
                ["wait_after", "int"],
                ["max_wait", "int"],
            ],
            "HttpWait",
        ],
        req_pq_multi: [
            0xBE7E8EF1,
            [
                ["nonce", "int128"],
            ],
            "ResPQ",
        ],
        req_DH_params: [
            0xD712E4BE,
            [
                ["nonce", "int128"],
                ["server_nonce", "int128"],
                ["p", "bytes"],
                ["q", "bytes"],
                ["public_key_fingerprint", "long"],
                ["encrypted_data", "bytes"],
            ],
            "Server_DH_Params",
        ],
        set_client_DH_params: [
            0xF5045F1F,
            [
                ["nonce", "int128"],
                ["server_nonce", "int128"],
                ["encrypted_data", "bytes"],
            ],
            "Set_client_DH_params_answer",
        ],
        rpc_drop_answer: [
            0x58E4A740,
            [
                ["req_msg_id", "long"],
            ],
            "RpcDropAnswer",
        ],
        get_future_salts: [
            0xB921BD04,
            [
                ["num", "int"],
            ],
            "FutureSalts",
        ],
        ping: [
            0x7ABE77EC,
            [
                ["ping_id", "long"],
            ],
            "Pong",
        ],
        ping_delay_disconnect: [
            0xF3427B8C,
            [
                ["ping_id", "long"],
                ["disconnect_delay", "int"],
            ],
            "Pong",
        ],
        destroy_session: [
            0xE7512126,
            [
                ["session_id", "long"],
            ],
            "DestroySessionRes",
        ],
        destroy_auth_key: [
            0xD1435160,
            [],
            "DestroyAuthKeyRes",
        ],
    },
    identifierToName: {
        [0x05162463]: "resPQ",
        [0xA9F55F95]: "p_q_inner_data_dc",
        [0x56FDDF88]: "p_q_inner_data_temp_dc",
        [0xD0E8075C]: "server_DH_params_ok",
        [0xB5890DBA]: "server_DH_inner_data",
        [0x6643B654]: "client_DH_inner_data",
        [0x3BCBF734]: "dh_gen_ok",
        [0x46DC1FB9]: "dh_gen_retry",
        [0xA69DAE02]: "dh_gen_fail",
        [0x75A3F765]: "bind_auth_key_inner",
        [0x2144CA19]: "rpc_error",
        [0x5E2AD36E]: "rpc_answer_unknown",
        [0xCD78E586]: "rpc_answer_dropped_running",
        [0xA43AD8B7]: "rpc_answer_dropped",
        [0x0949D9DC]: "future_salt",
        [0xAE500895]: "future_salts",
        [0x347773C5]: "pong",
        [0xE22045FC]: "destroy_session_ok",
        [0x62D350C9]: "destroy_session_none",
        [0x9EC20908]: "new_session_created",
        [0x3072CFA1]: "gzip_packed",
        [0x62D6B459]: "msgs_ack",
        [0xA7EFF811]: "bad_msg_notification",
        [0xEDAB447B]: "bad_server_salt",
        [0x7D861A08]: "msg_resend_req",
        [0xDA69FB52]: "msgs_state_req",
        [0x04DEB57D]: "msgs_state_info",
        [0x8CC0D131]: "msgs_all_info",
        [0x276D3EC6]: "msg_detailed_info",
        [0x809DB6DF]: "msg_new_detailed_info",
        [0xF660E1D4]: "destroy_auth_key_ok",
        [0x0A9F2259]: "destroy_auth_key_none",
        [0xEA109B13]: "destroy_auth_key_fail",
        [0x9299359F]: "http_wait",
    },
});
