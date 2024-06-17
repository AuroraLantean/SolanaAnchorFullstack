# Solana Anchor Fullstack

### Setup Solana CLI, the local development environment
Follow the steps here: https://solana.com/developers/guides/getstarted/setup-local-development

This is repo is developed under the following environment:
rustc 1.77.2 (25ef9e3d8 2024-04-09)
solana-cli 1.18.16
bun 1.1.12
yarn 1.22.22
anchor-cli 0.30.0
```
$ solana-keygen new
$ solana-keygen pubkey

$ solana config get
$ solana config set --url localhost

$ export RUST_LOG=solana_runtime::system_instruction_processor=trace,solana_runtime::message_processor=debug,solana_bpf_loader=debug,solana_rbpf=debug
$ solana-test-validator --log --reset

$ solana balance
$ solana airdrop 1000 //big amount is only possible for local network, on devnet you can only request 2 SOL per day
```

### Anchor To Build and Test the program
```
$ anchor init counter
$ cd counter && rm -r .git
$ anchor build
```
... should give you:
- "target/deploy/xyz-keypair.json". Keep this keypair secret because only that keypair json file can upgrade the deployed program! You can reuse it on all clusters. This keypair should contain the public key from your `declare_id!()` in your Solana program, also that public key should match the result from `anchor keys list`

If you change your program id inside `declare_id!()` after copying some Rust code from the internet, run `anchor keys sync` to update that in your Rust program according to your xyz-keypair.json

- target/idl/xyz.json: This is used by the frontend
- target/types/xyz.ts: This is used by the frontend

`anchor test` command does the following things: `build`, `spin up a test validator`, `deploy` and `test`. If you have a local validator running already:
```
$ solana-test-validator -r
$ anchor test --skip-local-validator
```
Copy a transaction signature and paste it into Solana Explorer for your cluster:
https://explorer.solana.com/?cluster=custom
Confirm the test logs

OR run `solana logs` command in another termina, then run the test again, confirm test logs and transaction signature.


### Anchor To Upgrade the program
If you encounter this error during tests: "account data too small for instruction", then you will need to extend your program code account size.

Initially, the deployed program account will be 2x the original program size.

To upgrade a program:
- make a new program deployment and abandon old deployment
`$ rm target`
... delete the target folder
`$ anchor keys sync`
... to generate a new keypair, and add that public key to your Rust code
`$ anchor test --skip-local-validator`

OR
- extend existing program by adding more SOL, and using solana program extend command:

`$ anchor keys list`
... show program data account address
`$ solana program show <PROGRAM_ADDRESS>`
... check that program account data length and its SOL balance

`$ du -h target/deploy/counter.so`
... show how much in data size will the program code need
`$ solana rent <SIZE>`
`$ solana rent 100000`
... show much much rent does 100k program need to pay
`$ solana balance`
... check how much SOL do we have
`$ solana program extend <PROGRAM_ADDRESS> <SIZE>`
... extend the program code account, ONLY IF the data structure HAS NOT BEEN CHANGED! OR you get "Invalid arguments: xyz not provided"

### Deploy to Devnet
#### Prepare to deploy to the Devnet
```
$ solana config set --url devnet
$ solana airdrop 2
$ solana balance
```

#### Add the following to anchor.toml
```
[programs.devnet]
counter = "xyz123..."
```
Change the provider from "Localnet" to "devnet"
```
[provider]
cluster = "devnet"
#cluster = "Localnet"
```
Then run `anchor test` without skipping the local validator

### If deployment failed
Claim devnet SOL back
```
solana program show --buffers
solana program close --buffers
```

### After Deployment
Copy the deployed Program Id: `C21vgVwS2X1g9XmSyJPFtLfrob5zwwoij54L7Rq6dmes`

If you lose the above deployed Program Id, use the following the recover it:
`$ solana program show --programs`
```
Program Id                                   | Slot      | Authority | Balance
C21vgVwS2X1g9XmSyJPFtLfrob5zwwoij54L7Rq6dmes | 306287597 | abc123... | 1.43735832 SOL
```
The above is all the programs owned by your wallet, which can be found by `solana address`