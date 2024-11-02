export type valueType = {
    currency: string,
    amount: number
}

// main asset
export type assetMain = {
    name: string,
    icon: string,
    category: string
    value: valueType
    asset: {
        profitOrLost: number,
        value: valueType,
        count: number
    },
}


export interface MainAssetProps {
    usage: "main",
    req: assetMain
}

// manage-asset

export type manageAsset = {
    name: string,
    icon: string,
    category: string
    value: valueType
}

export interface ManageAssetProps {
    usage: "manage",
    req: manageAsset
}