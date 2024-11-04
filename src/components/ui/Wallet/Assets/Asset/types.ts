export type valueType = {
  currency: string;
  amount: number;
};

// main asset
export type assetMain = {
  name: string;
  icon: string;
  category: string;
  value: valueType;
  asset: {
    profitOrLost: number;
    value: valueType;
    count: number;
  };
};

export type manageAsset = {
  accountAssetId: number;
  apiId: string;
  apiIdMarket: string;
  balance: number | null;
  balanceInUsd: number | null;
  blockchain: string;
  caption: string | null;
  color: string | null;
  contaractAddress: string;
  currencyName: string | null;
  currencyRatio: number | null;
  decimals: number;
  imageUrl: string;
  name: string;
  symbol: string;
  title: string;
  transaction: any | null;
  uniqGetId: string;
  unitPrice: number | null;
};
export interface MainAssetProps {
  usage: "main";
  req: manageAsset;
  networkType: string;
  address: string;
}

// manage-asset

export interface ManageAssetProps {
  usage: "manage";
  req: manageAsset;
  networkType: string;
  address: string;
}
