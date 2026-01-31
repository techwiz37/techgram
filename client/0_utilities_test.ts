import { assertEquals } from "../0_deps.ts";
import { assertThrows } from "../0_test_deps.ts";
import { getUsername } from "./0_utilities.ts";

Deno.test("getUsername", () => {
  const validUsernames = ["pic", "telegram", "p_ic", "test12345", "a".repeat(32)];
  const invalidUsernames = ["_pic", "2pic", "a__c", "a".repeat(33), "têst"];

  for (const username of validUsernames) {
    assertEquals(getUsername(username), username);
    assertEquals(getUsername("@" + username), username);
    assertEquals(getUsername("https:
    assertEquals(getUsername(`https:
    assertThrows(() => getUsername(`https:
    assertEquals(getUsername("https:
    assertEquals(getUsername("https:
    assertEquals(getUsername("https:
  }

  for (const username of invalidUsernames) {
    assertThrows(() => getUsername(username), username);
    assertThrows(() => getUsername("@" + username), username);
    assertThrows(() => getUsername("https:
    assertThrows(() => getUsername(`https:
    assertThrows(() => getUsername("https:
    assertThrows(() => getUsername("https:
  }
});
