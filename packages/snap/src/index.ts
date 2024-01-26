import { JsonBIP44CoinTypeNode, deriveBIP44AddressKey } from '@metamask/key-tree';
import type { OnRpcRequestHandler } from '@metamask/snaps-sdk';
import { panel, text } from '@metamask/snaps-sdk';

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
      const bip44Node = (await snap.request({
        method:'snap_getBip44Entropy',
        params: {
          coinType: 12586,
        }
      })) as JsonBIP44CoinTypeNode;
      console.log('snap_getBip44Entropy result:', bip44Node);
      const extendedPrivateKey = deriveBIP44AddressKey(bip44Node, {
        account: 0,
        address_index: 0,
        change: 0,
      });
      console.log('extendedPrivateKey:', extendedPrivateKey);
      // const extendedPrivateKeyShort = extendedPrivateKey.slice(0, 32);
      // extendedPrivateKeyShort[0] &= 0x3f;

      return bip44Node;
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
