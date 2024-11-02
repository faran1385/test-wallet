import {atom} from "jotai";
import {assetMain} from "../../../ui/Wallet/Assets/Asset/types.ts";

export const assetsAtom = atom<assetMain[]>([
    {
        name: 'BTC',
        icon: '/imgs/home/Bitcoin.png',
        value: {
            currency: 'USD',
            amount: 62402
        },
        asset: {
            value: {
                currency: "USD",
                amount: 73327.57
            },
            count: 1.0002311,
            profitOrLost: 2.43
        },
        category: 'Bitcoin',
    },
    {
        name: 'ETH',
        icon: '/imgs/home/Wallet Earn.png',
        value: {
            currency: 'USD',
            amount: 62402
        },
        asset: {
            value: {
                currency: "USD",
                amount: 73327.57
            },
            count: 1.0002311,
            profitOrLost: 2.43
        },
        category: 'Ethereum',
    },
    {
        name: 'USDT',
        icon: '/imgs/home/usdT.png',
        value: {
            currency: 'USD',
            amount: 62402
        },
        asset: {
            value: {
                currency: "USD",
                amount: 73327.57
            },
            count: 1.0002311,
            profitOrLost: 2.43
        },
        category: 'Tether'
    },
    {
        name: 'LTC',
        icon: '/imgs/home/ETH.png',
        value: {
            currency: 'USD',
            amount: 62402
        },
        asset: {
            value: {
                currency: "USD",
                amount: 73327.57
            },
            count: 1.0002311,
            profitOrLost: 2.43
        },
        category: 'Litecoin'
    },
    {
        name: 'XRP',
        icon: '/imgs/home/Nebulas (NAS).png',
        value: {
            currency: 'USD',
            amount: 62402
        },
        asset: {
            value: {
                currency: "USD",
                amount: 73327.57
            },
            count: 1.0002311,
            profitOrLost: 2.43
        },
        category: 'Ripple',
    },
    {
        name: 'LTC',
        icon: '/imgs/home/ETH.png',
        value: {
            currency: 'USD',
            amount: 62402
        },
        asset: {
            value: {
                currency: "USD",
                amount: 73327.57
            },
            count: 1.0002311,
            profitOrLost: 2.43
        },
        category: 'Litecoin'
    },
    {
        name: 'XRP',
        icon: '/imgs/home/Nebulas (NAS).png',
        value: {
            currency: 'USD',
            amount: 62402
        },
        asset: {
            value: {
                currency: "USD",
                amount: 73327.57
            },
            count: 1.0002311,
            profitOrLost: 2.43
        },
        category: 'Ripple',
    },
])