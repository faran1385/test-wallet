import React from "react";
import {formatNumberWithCommas} from "../../../../lib/globalHelpers/globalHelpers.ts";

export type asset = {
    name: string,
    icon: string,
    category: string
    value: valueType
    asset: {
        profitOrLost: number,
        value: valueType,
        count: number
    },
    toBTC: number,
}

export type valueType = {
    currency: string,
    amount: number
}

export const Asset: React.FC<asset> = (T) => {



    return <>
        <div
            style={{
                transition: ".3s box-shadow ease-in-out",
            }}
            className="hover:shadow-xl sm:h-[82px] px-4 py-4 sm:py-5 bg-white md:bg-[#f8f9fb] shadow-sm rounded-lg sm:relative"
        >
            <a
                href="../details/Asset_Details.html"
                className="w-full justify-start items-end sm:items-center gap-3 inline-flex"
            >
                <div className="flex grow justify-start items-center gap-3">
                    <div
                        className="w-10 h-10 rounded-[20px] flex justify-center items-center"
                    >
                        <img src={T.icon} alt=""/>
                    </div>
                    <div
                        className="flex-col justify-start sm:items-center gap-1.5 inline-flex"
                    >
                        <div className="justify-start items-start gap-2 inline-flex">
                            <div
                                className="text-black text-base font-medium leading-tight tracking-tight"
                            >
                                {T.name}
                            </div>
                            <div
                                className="hidden sm:flex px-1.5 py-0.5 bg-[#ebeef1] rounded justify-center items-center gap-2.5"
                            >
                                <div
                                    className="text-black text-[10px] font-semibold leading-[14px] tracking-tight"
                                >
                                    {T.category}
                                </div>
                            </div>
                        </div>
                        <div className="text-[#686d74] text-xs leading-none tracking-tight">
                            <div
                                className="text-[#686d74] text-xs leading-none tracking-tight flex sm:gap-1"
                            >
                                {formatNumberWithCommas(T.value.amount)}
                                <span className="hidden sm:inline-block">{T.value.currency}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden sm:flex justify-start items-end gap-2">
                    <div className="flex justify-between items-center gap-1.5">
                        <img src="/svg/global/up-solid.svg" alt=""/>
                        <span
                            className="text-center text-[#24d998] text-xs font-semibold font-['Plus Jakarta Sans'] leading-none tracking-tight"
                        >
                  {T.asset.profitOrLost}%
                </span>
                    </div>
                    <div
                        className="inline-flex flex-col justify-center items-end gap-1.5"
                    >
                <span
                    className="text-right text-black text-base font-medium leading-tight tracking-tight"
                >
                    {formatNumberWithCommas(T.asset.count)}
                </span>
                        <span
                            className="text-right text-[#686d74] text-xs font-normal leading-none tracking-tight"
                        >
                  {formatNumberWithCommas(T.asset.value.amount)} {T.asset.value.currency}
                </span>
                    </div>
                </div>
                <div className="flex sm:hidden justify-end items-end gap-2">
                    <span className="text-xs">{formatNumberWithCommas(T.toBTC)} BTC</span>
                </div>
            </a>
        </div>
    </>
}