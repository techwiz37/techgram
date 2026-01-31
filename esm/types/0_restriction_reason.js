export function constructRestrictionReason(rr) {
    return { platform: rr.platform, reason: rr.reason, text: rr.text };
}
