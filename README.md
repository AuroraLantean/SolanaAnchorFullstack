# Solana Anchor Fullstack

#### Setup Solana CLI, the local development environment
https://solana.com/developers/guides/getstarted/setup-local-development

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

#### Anchor CLI
```
$ anchor init counter
$ cd counter
$ anchor build
```
... should give you:
- "target/deploy/xyz-keypair.json". Keep this keypair secret because only that keypair json file can upgrade the deployed program! You can reuse it on all clusters.
- target/idl/xyz.json: This is used by the frontend
- target/types/xyz.ts: This is used by the frontend

If you have a local validator running already:
```
$ anchor test --skip-local-validator
```
