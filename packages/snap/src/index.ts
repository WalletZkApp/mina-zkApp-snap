/* eslint-disable no-bitwise */
/* eslint-disable no-case-declarations */
import { SLIP10Node } from '@metamask/key-tree';
import type { OnRpcRequestHandler } from '@metamask/snaps-sdk';
import { panel, text } from '@metamask/snaps-sdk';
import bs58check from 'bs58check';
import Client from 'mina-signer';

import { Add } from './smart-contracts/Add.js';

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
export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}) => {
  const client = new Client({ network: 'mainnet' });
  switch (request.method) {
    case 'mina_getPublicKey': {
      const bip32Node: any = await snap.request({
        method: 'snap_getBip32Entropy',
        params: {
          path: ['m', "44'", `12586'`],
          curve: 'secp256k1',
        },
      });
      console.log('snap_getBip32Entropy result:', bip32Node);
      const minaSlip10Node = await SLIP10Node.fromJSON(bip32Node);
      const accountIndex = 0;
      const accountKey0 = await minaSlip10Node.derive([
        `bip32:${accountIndex}'`,
      ]);
      if (!accountKey0.privateKeyBytes) {
        // TODO: we should return error here
        throw new Error('Can not derive Mina keys');
      }
      accountKey0.privateKeyBytes[0] &= 0x3f;
      const reversed = Buffer.alloc(accountKey0.privateKeyBytes?.length);
      for (let i = accountKey0.privateKeyBytes.length; i > 0; i--) {
        reversed[accountKey0.privateKeyBytes.length - i] =
          accountKey0.privateKeyBytes[i - 1];
      }

      const childPrivateKey = reversed;
      const privateKeyHex = `5a01${childPrivateKey.toString('hex')}`;
      const privateKey = bs58check.encode(Buffer.from(privateKeyHex, 'hex'));
      const publicKey = client.derivePublicKey(privateKey);

      return { publicKey };
    }
    case 'hello': {
      console.log('compiling...');
      await Add.compile();
      console.log('compile finished!');
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
    }
    default:
      throw new Error('Method not found.');
  }
};
