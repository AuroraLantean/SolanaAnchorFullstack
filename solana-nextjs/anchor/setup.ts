import { type IdlAccounts, Program } from "@coral-xyz/anchor";

import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import counterIDL from "./counter.json";
import type { Counter } from "./counter";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

export const program = new Program(counterIDL as unknown as Counter, {
  connection,
});

export const [counterPDA] = PublicKey.findProgramAddressSync(
  [Buffer.from("counter")],
  program.programId
);

export type CounterData = IdlAccounts<Counter>["counter"];