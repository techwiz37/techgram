import type { Api } from "../2_tl.js";
export interface FailedInvitation {
    userId: number;
    requiresPremiumToInvite: boolean;
    requiresPremiumToMessage: boolean;
}
export declare function constructFailedInvitation(missingInvitee: Api.MissingInvitee): FailedInvitation;
//# sourceMappingURL=0_failed_invitation.d.ts.map