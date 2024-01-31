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
  token: {
    coinType: number;
  };
  currentAccIndex: number;
};
