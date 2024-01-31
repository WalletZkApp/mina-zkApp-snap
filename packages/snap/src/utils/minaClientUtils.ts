import Client from 'mina-signer';

import { ENetworkName } from '../constants/configConstants';
import type { NetworkConfig } from '../Mina/interfaces';

export const getMinaClient = (networkConfig: NetworkConfig) => {
  switch (networkConfig.name) {
    case ENetworkName.MAINNET:
      return new Client({ network: 'mainnet' });
    case ENetworkName.BERKELEY:
    case ENetworkName.DEVNET:
      return new Client({ network: 'testnet' });
    default:
      throw new Error('Cannot find the corresponding network type');
  }
};
