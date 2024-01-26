import { SLIP10Node } from '@metamask/key-tree';
import type { OnRpcRequestHandler } from '@metamask/snaps-sdk';
import { panel, text } from '@metamask/snaps-sdk';
import { reverse } from './utils';
import { base64 } from '@scure/base';
import Client from 'mina-signer';

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
  switch (request.method) {
    case 'mina_getPublicKey':
      const bip32Node: any = await snap.request({
        method: 'snap_getBip32Entropy',
        params: {
          path: ['m', "44'", "12586'"],
          curve: 'secp256k1',
        },
      });
      const minaSlip10Node = await SLIP10Node.fromJSON(bip32Node);
      const accountKey0 = await minaSlip10Node.derive([`bip32:0'`]);
      if (accountKey0.privateKeyBytes) {
        // eslint-disable-next-line no-bitwise
        accountKey0.privateKeyBytes[0] &= 0x3f;
        console.log(accountKey0.privateKeyBytes);
      }
      const childPrivateKey = reverse(accountKey0.privateKeyBytes);
      const privateKeyHex = `5a01${childPrivateKey.toString('hex')}`;
      const privateKey = base64.encode(Buffer.from(privateKeyHex, 'hex'));
      console.log('privateKey', privateKey);
      const client = new Client({ network: 'testnet' });
      const publicKey = client.derivePublicKey(privateKey);
      console.log('publicKey', publicKey);

      return bip32Node;
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
