import { unreachable } from "../0_deps.js";
import { Api } from "../2_tl.js";
function resolveUsers(ids, getPeer) {
    const users = new Array();
    for (const id of ids) {
        const peer = getPeer({ _: "peerUser", user_id: BigInt(id) });
        if (!peer) {
            unreachable();
        }
        else {
            users.push({ _: "inputUser", user_id: BigInt(peer[0].id), access_hash: peer[1] });
        }
    }
    return users;
}
function restrict(users_, rules, getPeer) {
    if (users_.length) {
        const users = resolveUsers(users_, getPeer);
        rules.push({ _: "inputPrivacyValueDisallowUsers", users });
    }
}
export function storyPrivacyToTlObject(privacy, getPeer) {
    const rules = new Array();
    if ("everyoneExcept" in privacy) {
        restrict(privacy.everyoneExcept, rules, getPeer);
        rules.push({ _: "inputPrivacyValueAllowAll" });
    }
    else if ("contactsExcept" in privacy) {
        restrict(privacy.contactsExcept, rules, getPeer);
        rules.push({ _: "inputPrivacyValueAllowContacts" });
    }
    else if ("closeFriends" in privacy) {
        rules.push({ _: "inputPrivacyValueAllowCloseFriends" });
    }
    else if ("only" in privacy) {
        if (!privacy.only.length) {
            unreachable();
        }
        const users = resolveUsers(privacy.only, getPeer);
        rules.push({ _: "inputPrivacyValueAllowUsers", users });
    }
    return rules;
}
export function constructStoryPrivacy(privacy) {
    const except = privacy.find((v) => Api.is("privacyValueDisallowUsers", v))?.users?.map(Number) ?? [];
    if (privacy.some((v) => Api.is("privacyValueAllowAll", v))) {
        return { everyoneExcept: except };
    }
    else if (privacy.some((v) => Api.is("privacyValueAllowContacts", v))) {
        return { contactsExcept: except };
    }
    else if (privacy.some((v) => Api.is("privacyValueAllowCloseFriends", v))) {
        return { closeFriends: true };
    }
    const only = privacy.find((v) => Api.is("privacyValueAllowUsers", v))?.users?.map(Number) ?? [];
    return { only };
}
