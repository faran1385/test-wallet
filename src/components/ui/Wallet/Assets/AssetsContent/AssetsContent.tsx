import {asset, Asset} from "../Asset/Asset.tsx";

const assets: asset[] = [
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
        toBTC: 0.200,
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
        toBTC: 0.200,
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
        toBTC: 0.200,
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
        toBTC: 0.200,
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
        toBTC: 0.200,
        category: 'Ripple',
    },
]

export const AssetsContent = () => {
    return <div className="mt-4 sm:mt-7 flex flex-col gap-2">
        {assets.map((asset, i) => {
            return <Asset
                key={i}
                {...asset}
            />
        })}
        <h3 className="text-black text-lg font-bold leading-normal mt-4 sm:hidden">
            Others
        </h3>
        <div className="md:hidden relative flex flex-col items-center mt-4 sm:hiddenz">
            <div
                className="w-full h-[72px] px-4 py-2 bg-white rounded-lg shadow border-b border-[#ebeef1] inline-flex justify-start items-center gap-3 z-[3]"
            >
                <div
                    className="grow shrink basis-0 h-10 justify-start items-center gap-3 flex"
                >
                    <div className="w-10 h-10 px-1 pb-px justify-center items-center flex">
                        <div className="w-8 h-[39px] relative">
                            <div
                                className="w-[30px] h-[30px] left-0 top-0 absolute justify-center items-center inline-flex"
                            >
                                <div className="w-[30px] h-[30px] relative">
                                    <img src="/svg/home/Toncoin.svg" alt=""/>
                                </div>
                            </div>
                            <img
                                className="w-3.5 h-3.5 left-[18px] top-[25px] absolute rounded-[20px]"
                                src="/svg/home/Eth.svg"
                            />
                            <img
                                className="w-8 h-8 pt-[3.25px] pb-[3px] -left-2.5 top-[16px] absolute rounded-[20px] justify-center items-center inline-flex"
                                src="/svg/home/Bitcoin.svg"
                            />
                        </div>
                    </div>
                    <div
                        className="grow shrink basis-0 text-black text-sm font-medium font-['Plus Jakarta Sans'] leading-[18px] tracking-tight"
                    >
                        NFTs, Stocks, Commodities
                    </div>
                </div>
                <div
                    className="w-[45px] text-sm font-medium font-['Plus Jakarta Sans'] leading-[18px] tracking-tight"
                >
                    $0.00
                </div>
            </div>
            <div
                className="w-[94%] h-[72px] bg-white rounded-lg shadow border-b border-[#ebeef1] absolute top-2 z-[2]"
            ></div>
            <div
                className="w-[88%] h-[72px] bg-white rounded-lg shadow border-b border-[#ebeef1] absolute top-4"
            ></div>
        </div>
    </div>
}