export declare namespace CodeCheckResult {
    interface PasswordRequired {
        type: "password_required";
    }
    interface InvalidCode {
        type: "invalid_code";
    }
    interface SignedIn {
        type: "signed_in";
        userId: number;
    }
}
export type CodeCheckResult = CodeCheckResult.PasswordRequired | CodeCheckResult.InvalidCode | CodeCheckResult.SignedIn;
//# sourceMappingURL=0_code_check_result.d.ts.map