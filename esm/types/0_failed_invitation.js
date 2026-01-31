export function constructFailedInvitation(missingInvitee) {
    return {
        userId: Number(missingInvitee.user_id),
        requiresPremiumToInvite: !!missingInvitee.premium_would_allow_invite,
        requiresPremiumToMessage: !!missingInvitee.premium_required_for_pm,
    };
}
