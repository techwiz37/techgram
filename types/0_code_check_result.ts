export declare namespace CodeCheckResult {

  export interface PasswordRequired {
    type: "password_required";
  }

  export interface InvalidCode {
    type: "invalid_code";
  }

  export interface SignedIn {
    type: "signed_in";
    userId: number;
  }
}

export type CodeCheckResult = CodeCheckResult.PasswordRequired | CodeCheckResult.InvalidCode | CodeCheckResult.SignedIn;
