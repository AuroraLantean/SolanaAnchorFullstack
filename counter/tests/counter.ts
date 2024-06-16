import * as anchor from "@coral-xyz/anchor";
import type { Program } from "@coral-xyz/anchor";
import type { Counter } from "../target/types/counter";
import { PublicKey } from "@solana/web3.js";

describe("counter", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Counter as Program<Counter>;
  const wallet = provider.wallet as anchor.Wallet;
  const connection = provider.connection;
  const lg = console.log;
  const lgerr = console.error;
  
  const [counterPDA, bump] = PublicKey.findProgramAddressSync(
    [Buffer.from("counter")],
    program.programId
  );//const counterAccount = new Keypair();

  it("Is initialized!", async () => {
      try {
        const txSig = await program.methods.initialize().rpc();
        lg(`Transaction Signature: ${txSig}`);

        const accountData = await program.account.counter.fetch(counterPDA);
        lg(`Count: ${accountData.count}`);
      } catch (error) {
        // If PDA Account already created, then we expect an error
        lgerr(error);
      }
    /**
    declare counterAccount outside of this "it()"
    const transactionSignature = await program.methods.initialize()
      .accounts({ counter: counterAccount.publicKey, })
      .signers([counterAccount])//include counter keypair as additional signer
      .rpc({ skipPreflight: true });
    */
  });
  
  it("Increment", async () => {
    const transactionSignature = await program.methods.increment().rpc();
    /* for non pda:
    .accounts({ counter: counterAccount.publicKey, })
    */

    lg(`Transaction Signature: ${transactionSignature}`);

    const accountData = await program.account.counter.fetch(counterPDA);
    lg(`Count: ${accountData.count}`);
  });
});
