import {useAtom} from "jotai/index";
import {assetsAtom, selectedAssetAtom} from "../../../lib/Atom/WalletSend/WalletSend.ts";
import React, {SetStateAction} from "react";


interface SendSelectedAssetProps {
    setDropdownOpen: React.Dispatch<SetStateAction<boolean>>,
    isDropdownOpen: boolean
}

export const SendSelectedAsset = ({setDropdownOpen, isDropdownOpen}: SendSelectedAssetProps) => {
    const [selectedAsset] = useAtom(selectedAssetAtom)
    const [assets] = useAtom(assetsAtom)
    return <>
        <div className="w-full flex flex-col gap-2 cursor-pointer">
            <label htmlFor="" className="text-xs font-medium"
            >Select an assets to send</label
            >
            <div
                style={{transition: "border-color .3s ease-in-out"}}
                onClick={() => assets.length > 0 && setDropdownOpen(!isDropdownOpen)}
                className={`bg-[#F8F9FB] send-container-dont-close h-14 border ${isDropdownOpen ? 'border-[#24D998]' : ''} rounded-full flex items-center justify-between pl-4 pr-6`}
            >
                {assets.length > 0 ? <>
                    <div className="flex gap-3 send-container-dont-close items-center">
                        <img
                            src={assets[selectedAsset].image}
                            alt=""
                            className="rounded-full send-container-dont-close"
                        />
                        <span className="text-sm send-container-dont-close font-medium text-[#4F5459]"
                        >{assets[selectedAsset].name}</span
                        >
                    </div>
                    <img
                        className={'send-container-dont-close'}
                        src="/svg/sendReview/icons_down-solid.svg"
                        alt=""
                    />
                </> : <>
                    <div className={"flex space-x-2 currency-loading-container justify-center w-full"}>
                        <span className={"bg-wallet-disable-background"}></span>
                        <span className={"bg-wallet-disable-background"}></span>
                        <span className={"bg-wallet-disable-background"}></span>
                    </div>
                </>}
            </div>
        </div>
    </>
}