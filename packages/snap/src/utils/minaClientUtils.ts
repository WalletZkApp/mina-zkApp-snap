import Client from 'mina-signer';

import type { NetworkConfig } from '../Mina/interfaces';
import { Networks } from '../Mina/types/Networks';

export const getMinaClient = (networkConfig: NetworkConfig) => {
  switch (networkConfig.name) {
    case Networks.MAINNET:
      return new Client({ network: 'mainnet' });
    case Networks.BERKELEY:
    case Networks.DEVNET:
    case Networks.TESTWORLD:
      return new Client({ network: 'testnet' });
    default:
      throw new Error('Cannot find the corresponding network type');
  }
};

export const getFaucetNetworkAlias = (networkConfig: NetworkConfig) => {
  switch (networkConfig.name) {
    case Networks.TESTWORLD:
      return 'itn-qanet';
    case Networks.BERKELEY:
      return 'berkeley-qanet';
    case Networks.DEVNET:
      return 'devnet';
    default:
      throw new Error('Cannot find the corresponding network faucet alias');
  }
};
