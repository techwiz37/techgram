import { assertEquals } from "../0_deps.ts";
import { ClientEncrypted } from "./2_client_encrypted.ts";
import { ClientEncryptedPool } from "./3_client_encrypted_pool.ts";

Deno.test("ClientEncryptedPool", () => {
  const pool = new ClientEncryptedPool();
  const clients = new Array(3).fill(null).map(() => new ClientEncrypted("1", 0));
  for (const client of clients) {
    pool.add(client);
  }
  for (let i = 0; i < 10; ++i) {
    assertEquals(pool.nextClient(), clients[0]);
    assertEquals(pool.nextClient(), clients[1]);
    assertEquals(pool.nextClient(), clients[2]);
  }
});
