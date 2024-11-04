import {atom} from "jotai";

type sendAssetType = {
    image: string,
    name: string,
    type: string,
    category: string
}

export const selectedAssetAtom = atom<number>(0)
export const assetsAtom = atom<sendAssetType[]>([
    {
        image: '/imgs/sendReview/bitcoin.png',
        name: 'Bitcoin-Legacy',
        type: 'BTC',
        category: 'bitcoin'
    },
    {
        image: '/imgs/sendReview/bitcoin.png',
        name: 'Bitcoin-Segwit',
        type: 'BTC',
        category: 'bitcoin'
    },
    {
        image: '/imgs/sendReview/bitcoin.png',
        name: 'Bitcoin-Tabroot',
        type: 'BTC',
        category: 'bitcoin'
    },
    {
        image: '/imgs/sendReview/bitcoin.png',
        name: 'Bitcoin-Legacy',
        type: 'BTC',
        category: 'bitcoin'
    },
    {
        image: '/imgs/sendReview/bitcoin.png',
        name: 'Bitcoin-Segwit',
        type: 'BTC',
        category: 'bitcoin'
    },
    {
        image: '/imgs/sendReview/bitcoin.png',
        name: 'Bitcoin-Tabroot',
        type: 'BTC',
        category: 'bitcoin'
    },
    {
        image: '/imgs/sendReview/bitcoin.png',
        name: 'Bitcoin-Legacy',
        type: 'BTC',
        category: 'bitcoin'
    },
    {
        image: '/imgs/sendReview/bitcoin.png',
        name: 'Bitcoin-Segwit',
        type: 'BTC',
        category: 'bitcoin'
    },
    {
        image: '/imgs/sendReview/bitcoin.png',
        name: 'Bitcoin-Tabroot',
        type: 'BTC',
        category: 'bitcoin'
    }
])

export const emailInputAtom = atom('')

export const convertedAmountAtom = atom({
    currency: 0,
    asset: 0
})

export const currentAssetAmountAtom = atom(12)

export const currencyPerAssetAtom = atom(2000)