import React from "react";
import {useAtom} from "jotai/index";
import {selectedAssetAtom} from "../../../../../lib/Atom/WalletSend/WalletSend.ts";

interface SendDropdownItem {
    name: string,
    category: string,
    type: string
}

export const SendDropdownItem: React.FC<SendDropdownItem> = (T) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_selectedAsset, setSelectedAsset] = useAtom(selectedAssetAtom)

    return <div onClick={() => setSelectedAsset(Math.floor(Math.random() * 2))}
                className={"bg-white flex px-2 py-3 rounded-md cursor-pointer"}>
        <div
            className="w-full items-center gap-3 inline-flex"
        >
            <div className="flex grow justify-start items-center">
                <div
                    className="w-10 h-10 rounded-[20px] flex justify-center items-center"
                >
                    <img
                        src="/imgs/sendReview/bitcoin.png"
                        alt=""
                        className="rounded-full"
                    />
                </div>
                <div
                    className="flex-col justify-start sm:items-center gap-1.5 inline-flex"
                >
                    <div className="justify-start items-start gap-2">
                        <div className={"flex gap-2"}>
                            <div
                                className="text-base font-medium leading-tight tracking-tight"
                            >
                                {T.name}
                            </div>
                            <div
                                className="hidden sm:flex px-1.5 py-0.5 bg-[#ebeef1] rounded justify-center items-center gap-2.5"
                            >
                                <div
                                    className="text-wallet-disable-text text-[10px] font-semibold leading-[14px] tracking-tight"
                                >
                                    {T.category}
                                </div>
                            </div>
                        </div>
                        <div className={"text-xs text-wallet-disable-text"}>
                            {T.type}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}