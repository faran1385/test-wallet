import {Asset} from "../Wallet/Assets/Asset/Asset.tsx";
import {manageAsset} from "../Wallet/Assets/Asset/types.ts";
import {Link} from "react-router-dom";
import {ManageAssetsFooter} from "./ManageAssetsFooter/ManageAssetsFooter.tsx";
import {ManageAssetsHeader} from "./ManageAssetsHeader/ManageAssetsHeader.tsx";
import "./style.css"

const assets: manageAsset[] = [
    {
        name: 'BTC',
        icon: '/imgs/home/Bitcoin.png',
        value: {
            currency: 'USD',
            amount: 62402
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
        category: 'Ethereum',
    },
    {
        name: 'USDT',
        icon: '/imgs/home/usdT.png',
        value: {
            currency: 'USD',
            amount: 62402
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
        category: 'Litecoin'
    },
    {
        name: 'XRP',
        icon: '/imgs/home/Nebulas (NAS).png',
        value: {
            currency: 'USD',
            amount: 62402
        },
        category: 'Ripple',
    },
]

export const ManageAssets = () => {

    return <>
        <main className="w-[90%] h-dvh sm:max-w-[1024px] mx-auto flex flex-col mt-8 pb-4">
            <div className="w-full flex justify-center items-center relative sm:hidden">
                <Link to={"/wallet"} className={"me-auto"}>
                    <img
                        src="/svg/global/arrow-left.svg"
                        alt=""
                        className="sm:hidden cursor-pointer"
                    />
                </Link>
                <h2
                    className="sm:me-[inherit] me-auto font-semibold sm:font-bold text-base text-center sm:text-[32px]"
                >
                    Add Assets
                </h2>
            </div>
            <div className={"sm:my-0 my-auto"}>
                <ManageAssetsHeader/>
                    <div className="mt-6 flex manage-asset-container px-1 lg:max-h-[55vh] overflow-y-auto flex-col gap-[6px]">
                    {assets.length > 0 ? assets.map((asset, i) => {
                        return <>
                            <Asset
                                key={i}
                                usage={"manage"}
                                req={{...asset}}
                            />
                        </>
                    }) : [1, 2, 3, 4, 5].map((value) => {
                        return <div
                            key={value}
                            className="animate-pulse h-[82px] px-4 py-4 sm:py-5 bg-[rgba(0,0,0,.3)] shadow-sm rounded-lg sm:relative"
                        >
                        </div>
                    })}
                </div>
            </div>
            <ManageAssetsFooter/>
        </main>
    </>
}