/* eslint-disable no-bitwise */
/* eslint-disable no-case-declarations */
import type { OnRpcRequestHandler } from '@metamask/snaps-sdk';
import { panel, text } from '@metamask/snaps-sdk';
import Client from 'mina-signer';

import { generateKeyPair } from './Mina/account';
import type { NetworkConfig } from './Mina/interfaces';
import { Networks } from './Mina/types/Networks';
import { getFaucetNetworkAlias } from './utils';

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns The result of `snap_dialog`.
 * @throws If the request method is not valid for this snap.
 */

/** Default network config */
const networkConfig: NetworkConfig = {
  name: Networks.BERKELEY,
  token: { coinType: 12586 },
  currentAccIndex: 0,
};

export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}) => {
  switch (request.method) {
    case 'mina_getPublicKey': {
      const keyPair = await generateKeyPair(networkConfig);
      console.log('mina_getPublicKey', keyPair.publicKey);
      const { publicKey } = keyPair;
      return { publicKey };
    }
    case 'mina_createNullifier': {
      const keyPair = await generateKeyPair(networkConfig);
      console.log('mina_createNullifier', keyPair.privateKey);
      const client = new Client({ network: 'mainnet' });
      const message = Array.from(new BigInt64Array([BigInt(1)]));

      const jsonNullifier1 = client.createNullifier(
        message,
        keyPair.privateKey,
      );
      const publicNullifier = jsonNullifier1.public;
      console.log('publicNullifier', publicNullifier);
      return publicNullifier;
    }
    case 'mina_generateKeypair': {
      const { index } = request.params as { index: number };
      const keyPair = await generateKeyPair(networkConfig, index);
      return keyPair;
    }
    case 'mina_faucetAccount': {
      const { address } = request.params as { address: string };
      const faucetUrl =
        'https://cors-anywhere.herokuapp.com/https://faucet.minaprotocol.com/api/v1/faucet';
      try {
        const faucetResponse = await fetch(faucetUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            address,
            network: getFaucetNetworkAlias(networkConfig),
          }),
        });
        const result = await faucetResponse.json();
        console.log('faucet result:', result);
        const txHash = result?.message?.paymentID as string;
        return {
          error: null,
          txHash: `https://minascan.io/berkeley/tx/${txHash}`,
        };
      } catch (error) {
        return {
          error: 'Maximum allowed withdrawls exceeded.',
        };
      }
    }
    case 'hello':
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: panel([
            text(`Hello, **${origin}**!`),
            text('This custom confirmation is just for display purposes.'),
            text(
              'But you can edit the snap source code to make it do something, if you want to!',
            ),
          ]),
        },
      });
    default:
      throw new Error('Method not found.');
  }
};
