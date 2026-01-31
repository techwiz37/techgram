export declare namespace PasswordCheckResult {

  export interface InvalidPassword {
    type: "invalid_password";
  }

  export interface SignedIn {
    type: "signed_in";
    userId: number;
  }
}

export type PasswordCheckResult = PasswordCheckResult.InvalidPassword | PasswordCheckResult.SignedIn;
