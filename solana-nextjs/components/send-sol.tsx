import { web3 } from "@coral-xyz/anchor";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import React, { type FC, useCallback } from "react";

export const SendSOL: FC = () => {
	const { connection } = useConnection();
	const { publicKey, sendTransaction } = useWallet();

	const onClick = useCallback(async () => {
		if (!publicKey) throw new WalletNotConnectedError();

		// 890880 lamports as of 2022-09-01
		const lamports = await connection.getMinimumBalanceForRentExemption(0);

		const transaction = new Transaction().add(
			SystemProgram.transfer({
				fromPubkey: publicKey,
				toPubkey: new web3.PublicKey(
					"5a8Mejdc5L3vgMDoc8BNFWuMTHDV9xm6ARbfTkk7KZBw",
				),
				lamports,
			}),
		);

		const {
			context: { slot: minContextSlot },
			value: { blockhash, lastValidBlockHeight },
		} = await connection.getLatestBlockhashAndContext();

		const signature = await sendTransaction(transaction, connection, {
			minContextSlot,
		});

		await connection.confirmTransaction({
			blockhash,
			lastValidBlockHeight,
			signature,
		});
	}, [publicKey, sendTransaction, connection]);

	return (
		<button type="button" onClick={onClick} disabled={!publicKey}>
			Send SOL to an address!
		</button>
	);
};
