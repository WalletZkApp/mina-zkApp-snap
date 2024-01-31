import { SLIP10Node } from '@metamask/key-tree';
import bs58check from 'bs58check';

import { ESnapMethod } from '../constants/snapMethodConstants';
import { getMinaClient, reverseBytes } from '../utils';
import type { NetworkConfig } from './interfaces';

export const generateKeyPair = async (
  networkConfig: NetworkConfig,
  index?: number,
) => {
  const client = getMinaClient(networkConfig);
  const { coinType } = networkConfig.token;
  const bip32Node: any = await snap.request({
    method: ESnapMethod.SnapGetBip32Entropy,
    params: {
      path: ['m', "44'", `${coinType}'`],
      curve: 'secp256k1',
    },
  });
  const minaSlip10Node = await SLIP10Node.fromJSON(bip32Node);
  let accountIndex = networkConfig.currentAccIndex;
  if (index) {
    accountIndex = index;
  }
  const accountKey0 = await minaSlip10Node.derive([`bip32:${accountIndex}'`]);
  if (!accountKey0.privateKeyBytes) {
    // eslint-disable-next-line no-bitwise
    throw new Error('Unable to derive Mina key');
  }
  // eslint-disable-next-line no-bitwise
  accountKey0.privateKeyBytes[0] &= 0x3f;
  const childPrivateKey = reverseBytes(accountKey0.privateKeyBytes);
  const privateKeyHex = `5a01${childPrivateKey.toString('hex')}`;
  // eslint-disable-next-line no-restricted-globals
  const privateKey = bs58check.encode(Buffer.from(privateKeyHex, 'hex'));
  const publicKey = client.derivePublicKey(privateKey);
  return {
    privateKey,
    publicKey,
  };
};
