import type { Api } from "../2_tl.ts";

export interface FailedInvitation {
  userId: number;
  requiresPremiumToInvite: boolean;
  requiresPremiumToMessage: boolean;
}

export function constructFailedInvitation(missingInvitee: Api.MissingInvitee): FailedInvitation {
  return {
    userId: Number(missingInvitee.user_id),
    requiresPremiumToInvite: !!missingInvitee.premium_would_allow_invite,
    requiresPremiumToMessage: !!missingInvitee.premium_required_for_pm,
  };
}
