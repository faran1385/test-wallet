import {SendSelectedAsset} from "./SendSelectedAsset/SendSelectedAsset.tsx";
import "./style.css"
import {SendDropdown} from "./SendSelectedAsset/SendDropdown/SendDropdown.tsx";
import {useState} from "react";
import {SendEmailInput} from "./SendEmailInput/SendEmailInput.tsx";
import {SendingAmountInputs} from "./SendingAmountInputs/SendingAmountInputs.tsx";
import {useAtom} from "jotai";
import {
    assetsAtom,
    convertedAmountAtom,
    currentAssetAmountAtom,
    emailInputAtom
} from "../../lib/Atom/WalletSend/WalletSend.ts";
import {SendCommonConvertAmounts} from "./SendCommonConvertAmounts/SendCommonConvertAmounts.tsx";

export const Send = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false)
    const [assetList] = useAtom(assetsAtom)
    const [emailInput] = useAtom(emailInputAtom)
    const [convertedValue] = useAtom(convertedAmountAtom)
    const [currentAssetAmount] = useAtom(currentAssetAmountAtom)
    const isValid = assetList.length > 0 && emailInput.length > 0 && (convertedValue.asset > 0 || convertedValue.currency > 0) && currentAssetAmount >= convertedValue.asset

    return <>
        <main className="sm:py-5">
            <div
                className="w-full h-dvh sm:max-w-[550px] sm:h-fit py-4 sm:rounded-xl sm:bg-white sm:py-6 px-[14px] sm:p-6 mx-auto flex flex-col sm:justify-between items-center"
            >
                <div className="w-full flex justify-between items-center pb-8 sm:justify-center">
                    <a href="../dashboard/index.html">
                        <img
                            src="/svg/global/arrow-left.svg"
                            alt=""
                            className="sm:hidden cursor-pointer"
                        />
                    </a>
                    <h2 className="font-semibold sm:font-bold text-base sm:text-[32px]">
                        Send Assets
                    </h2>
                    <img
                        src="/svg/global/hugeicons_exchange-01.svg"
                        alt=""
                        className="sm:hidden cursor-pointer"
                    />
                </div>

                <div className="w-full my-auto sm:mt-0">
                    <div className="relative send-asset-content pe-1 overflow-y-auto flex flex-col gap-4">
                        <SendDropdown
                            isDropdownOpen={isDropdownOpen}
                            setDropdownOpen={setDropdownOpen}
                        />
                        <SendSelectedAsset
                            isDropdownOpen={isDropdownOpen}
                            setDropdownOpen={setDropdownOpen}
                        />
                        <SendEmailInput/>
                        <SendingAmountInputs/>
                        <hr/>
                        <div className="w-full flex flex-col gap-[6px]">
                            <div
                                className="bg-[#F8F9FB] h-14 border border-[#D3D9E2] rounded-full flex items-center justify-between pl-4 pr-6 focus-within:border-[#24D998]"
                            >
                                <span className={'text-sm text-[#9fa5b1]'}>Balance</span>
                                <div className="flex flex-col items-end gap-0">
                  <span className="font-medium text-sm text-nowrap"
                  >2.30 BTC /168264.55 USD</span
                  >
                                </div>
                            </div>
                            <p className="text-[10px] font-medium text-[#686D74] pl-4">
                                Network Fee : <span className="text-black">30 - 60 min</span>
                            </p>
                        </div>

                        <div>
                            <p className="text-[10px] font-medium text-[#686D74] pl-2">
                                Total fee:
                                <span className="text-black">0.00010848 BTC / 6.14 USD</span>
                            </p>
                            <p className="text-[10px] font-medium text-[#686D74] pl-2">
                                * 1 SAT = 0.00000001 BTC / 0.000566 USD
                            </p>
                        </div>
                        <SendCommonConvertAmounts/>
                    </div>
                </div>
                <div className={"grid pt-4 w-full"}>
                    <button
                        disabled={!isValid}
                        className={`text-nowrap text-center w-full duration-300 ${isValid ? "bg-[#24D998] hover:bg-[#21C58A]" : "bg-wallet-disable-background text-wallet-disable-text opacity-60 cursor-not-allowed pointer"}  rounded-[40px] py-3 text-base font-normal peer-checked:hidden`}>
                        Send
                    </button>
                </div>
            </div>
        </main>
    </>
}