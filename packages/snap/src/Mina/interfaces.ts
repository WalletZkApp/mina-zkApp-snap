import type { ENetworkName } from '../constants/configConstants';

export type NormalAccountOptions = {
  [index: number]: {
    name: string;
    address: string;
  };
};

export type ImportedAccountOptions = {
  [index: number]: {
    name: string;
    address: string;
    privateKey: string;
  };
};

export type NetworkConfig = {
  name: string;
  gqlUrl: string;
  gqlTxUrl: string;
  explorerUrl: string;
  token: {
    name: string;
    coinType: number;
    symbol: string;
    decimals: number;
  };
  currentAccIndex: number;
  generatedAccounts: NormalAccountOptions;
  selectedImportedAccount: number | null;
  importedAccounts: ImportedAccountOptions;
};

export type SnapState = {
  mina: SnapConfig;
};

export type SnapConfig = {
  currentNetwork: ENetworkName;
  networks: { [key: string]: NetworkConfig };
};
