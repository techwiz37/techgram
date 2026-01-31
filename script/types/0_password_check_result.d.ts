export declare namespace PasswordCheckResult {
    interface InvalidPassword {
        type: "invalid_password";
    }
    interface SignedIn {
        type: "signed_in";
        userId: number;
    }
}
export type PasswordCheckResult = PasswordCheckResult.InvalidPassword | PasswordCheckResult.SignedIn;
//# sourceMappingURL=0_password_check_result.d.ts.map