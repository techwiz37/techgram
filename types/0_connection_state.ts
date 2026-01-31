export type ConnectionStateNotConnected = "notConnected";

export type ConnectionStateUpdating = "updating";

export type ConnectionStateReady = "ready";

export type ConnectionState = ConnectionStateNotConnected | ConnectionStateUpdating | ConnectionStateReady;
