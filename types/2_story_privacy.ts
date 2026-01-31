import { unreachable } from "../0_deps.ts";
import { Api } from "../2_tl.ts";
import type { PeerGetter } from "./1_chat_p.ts";

export interface StoryPrivacyEveryone {

  everyoneExcept: number[];
}

export interface StoryPrivacyConctacts {

  contactsExcept: number[];
}

export interface StoryPrivacyCloseFriends {

  closeFriends: true;
}

export interface StoryPrivacyOnly {

  only: number[];
}

export type StoryPrivacy =
  | StoryPrivacyEveryone
  | StoryPrivacyConctacts
  | StoryPrivacyCloseFriends
  | StoryPrivacyOnly;

function resolveUsers(ids: number[], getPeer: PeerGetter) {
  const users = new Array<Api.inputUser>();
  for (const id of ids) {
    const peer = getPeer({ _: "peerUser", user_id: BigInt(id) });
    if (!peer) {
      unreachable();
    } else {
      users.push({ _: "inputUser", user_id: BigInt(peer[0].id), access_hash: peer[1] });
    }
  }
  return users;
}
function restrict(users_: number[], rules: Api.InputPrivacyRule[], getPeer: PeerGetter) {
  if (users_.length) {
    const users = resolveUsers(users_, getPeer);
    rules.push({ _: "inputPrivacyValueDisallowUsers", users });
  }
}

export function storyPrivacyToTlObject(privacy: StoryPrivacy, getPeer: PeerGetter): Api.InputPrivacyRule[] {
  const rules = new Array<Api.InputPrivacyRule>();
  if ("everyoneExcept" in privacy) {
    restrict(privacy.everyoneExcept, rules, getPeer);
    rules.push({ _: "inputPrivacyValueAllowAll" });
  } else if ("contactsExcept" in privacy) {
    restrict(privacy.contactsExcept, rules, getPeer);
    rules.push({ _: "inputPrivacyValueAllowContacts" });
  } else if ("closeFriends" in privacy) {
    rules.push({ _: "inputPrivacyValueAllowCloseFriends" });
  } else if ("only" in privacy) {
    if (!privacy.only.length) {
      unreachable();
    }
    const users = resolveUsers(privacy.only, getPeer);
    rules.push({ _: "inputPrivacyValueAllowUsers", users });
  }
  return rules;
}

export function constructStoryPrivacy(privacy: Api.PrivacyRule[]): StoryPrivacy {
  const except = privacy.find((v): v is Api.privacyValueDisallowUsers => Api.is("privacyValueDisallowUsers", v))?.users?.map(Number) ?? [];
  if (privacy.some((v) => Api.is("privacyValueAllowAll", v))) {
    return { everyoneExcept: except };
  } else if (privacy.some((v) => Api.is("privacyValueAllowContacts", v))) {
    return { contactsExcept: except };
  } else if (privacy.some((v) => Api.is("privacyValueAllowCloseFriends", v))) {
    return { closeFriends: true };
  }

  const only = privacy.find((v): v is Api.privacyValueAllowUsers => Api.is("privacyValueAllowUsers", v))?.users?.map(Number) ?? [];
  return { only };
}
