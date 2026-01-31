export declare class SessionState {
    #private;
    timeDifference: number;
    serverSalt: bigint;
    nextMessageId(): bigint;
    nextSeqNo(contentRelated: boolean): number;
    reset(): void;
}
//# sourceMappingURL=0_session_state.d.ts.map