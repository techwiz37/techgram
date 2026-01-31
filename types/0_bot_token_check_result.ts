export declare namespace BotTokenCheckResult {

  export interface SignedIn {
    type: "signed_in";
    userId: number;
  }
}

export type BotTokenCheckResult = BotTokenCheckResult.SignedIn;
