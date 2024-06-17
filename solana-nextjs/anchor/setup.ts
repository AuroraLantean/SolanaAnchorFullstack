import { type IdlAccounts, Program } from "@coral-xyz/anchor";

import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import counterIDL from "./counter.json";
import type { Counter } from "./counter";

const programId = new PublicKey("C21vgVwS2X1g9XmSyJPFtLfrob5zwwoij54L7Rq6dmes"); 

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

export const program = new Program<Counter>(counterIDL, programId, {
  connection,
});

export const [counterPDA] = PublicKey.findProgramAddressSync(
  [Buffer.from("counter")],
  program.programId
);

export type CounterData = IdlAccounts<Counter>["counter"];