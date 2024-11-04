import {useAtom} from "jotai/index";
import {
    convertedAmountAtom,
    currencyPerAssetAtom,
    currentAssetAmountAtom
} from "../../../lib/Atom/WalletSend/WalletSend.ts";
import {useEffect, useState} from "react";

export const SendCommonConvertAmounts = () => {
    const [currentAssetAmount] = useAtom(currentAssetAmountAtom)
    const [convertedValue, setConvertedValue] = useAtom(convertedAmountAtom)
    const [selectedCommonAmount, setSelectedCommonAmount] = useState<'25%' | "50%" | "100%" | "75%" | null>(null)
    const [currencyPerAsset] = useAtom(currencyPerAssetAtom)

    useEffect(() => {
        if (currentAssetAmount / 4 === convertedValue.asset) {
            setSelectedCommonAmount('25%')
        } else if (currentAssetAmount / 2 === convertedValue.asset) {
            setSelectedCommonAmount('50%')
        } else if (currentAssetAmount - currentAssetAmount / 4 === convertedValue.asset) {
            setSelectedCommonAmount('75%')
        } else if (currentAssetAmount === convertedValue.asset) {
            setSelectedCommonAmount('100%')
        } else {
            setSelectedCommonAmount(null)
        }
    }, [convertedValue]);

    useEffect(() => {
        const assetInput = document.querySelector(".send-asset-input") as HTMLInputElement;
        const currencyInput = document.querySelector(".send-currency-input") as HTMLInputElement;
        if (selectedCommonAmount !== null) {
            const assetValue = (selectedCommonAmount === "25%" ? currentAssetAmount / 4 : selectedCommonAmount === "50%" ? currentAssetAmount / 2 : selectedCommonAmount === "75%" ? currentAssetAmount - currentAssetAmount / 4 : currentAssetAmount)
            setConvertedValue({
                asset: assetValue,
                currency: (assetValue / 4) * currencyPerAsset
            })
            console.log(assetValue)
            assetInput.value = assetValue.toFixed(2)
            currencyInput.value = (assetValue * currencyPerAsset).toFixed(2)
        }
    }, [selectedCommonAmount]);

    return <>
        <div className="grid grid-cols-4 gap-3 *:cursor-pointer">
            {['25%', '50%', '75%', '100%'].map((item) => {
                if (item === selectedCommonAmount) {
                    return <span
                        key={item}
                        className="flex items-center justify-center rounded-full h-8 text-xs font-semibold text-[#686D74] bg-[#F8F9FB] border border-[#24D998] relative">
                                <img
                                    src="/svg/sendReview/tick.svg"
                                    alt=""
                                    className="absolute -top-[3px] -right-[3px]"
                                />
                        {item}
                            </span>
                }
                return <span
                    key={item}
                    style={{transition: "ease-in-out .3s border-color"}}
                    onClick={() => setSelectedCommonAmount(item as any)}
                    className="flex items-center justify-center rounded-full h-8 text-xs font-semibold text-[#686D74] bg-[#F8F9FB] border hover:border-wallet-green border-[#D3D9E2] relative">{item}</span>
            })}
        </div>
    </>
}