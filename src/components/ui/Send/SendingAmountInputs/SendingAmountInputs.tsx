import {useRef} from "react";
import {useAtom} from "jotai";
import {convertedAmountAtom, currencyPerAssetAtom} from "../../../lib/Atom/WalletSend/WalletSend.ts";

export const SendingAmountInputs = () => {
    const [currencyPerAsset] = useAtom(currencyPerAssetAtom)

    const assetAmountInput = useRef<null | HTMLInputElement>(null);
    const defaultCurrencyInput = useRef<null | HTMLInputElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_convertedValue, setConvertedValue] = useAtom(convertedAmountAtom)
    const handleOnInput = (event: any) => {
        event.target.value = event.target.value.replace(/[^0-9.]/g, ""); // Remove non-digit and non-period characters

        // Ensure only one decimal point
        const parts = event.target.value.split(".");
        if (parts.length > 2) {
            event.target.value = parts[0] + "." + parts[1];
        }
    }

    const handleConvert = (type: "currency" | "asset") => {
        if (assetAmountInput.current && defaultCurrencyInput.current) {
            if (type === "currency") {
                const currencyAmount = +(defaultCurrencyInput.current.value);
                setConvertedValue({
                    currency: ((currencyAmount * currencyPerAsset) * currencyPerAsset),
                    asset: (currencyAmount / currencyPerAsset)
                })
                assetAmountInput.current.value = (currencyAmount / currencyPerAsset).toFixed(2)

            } else {
                const assetAmount = +(assetAmountInput.current.value);
                setConvertedValue({
                    asset: ((assetAmount / currencyPerAsset) * currencyPerAsset),
                    currency: (assetAmount * currencyPerAsset)
                })
                defaultCurrencyInput.current.value = (assetAmount * currencyPerAsset).toFixed(2)
            }
        }
    }

    return <>
        <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full flex flex-col gap-2">
                <label htmlFor="s-2" className="text-xs font-medium cursor-pointer"
                >BTC Amount</label
                >
                <div
                    className="bg-[#F8F9FB] h-14 border border-[#D3D9E2] rounded-full flex items-center gap-3 justify-between pl-4 pr-6 focus-within:border-[#24D998]"
                >
                    <span className="text-[#686D74] text-xs font-medium">BTC</span>
                    <input
                        onInput={(event) => handleOnInput(event)}
                        onChange={() => handleConvert("asset")}
                        type="text"
                        placeholder="0.00"
                        ref={assetAmountInput}
                        className="h-full send-asset-input w-full bg-transparent border-none focus:outline-none placeholder:text-lg placeholder:font-semibold placeholder:text-[#686D74] font-semibold text-lg text-[#4F5459]"
                        id="s-2"
                    />
                </div>
            </div>
            <div className="w-full flex flex-col gap-2">
                <label htmlFor="s-3" className="text-xs font-medium cursor-pointer"
                >BTC Amount in USD</label
                >
                <div
                    className="bg-[#F8F9FB] h-14 border border-[#D3D9E2] rounded-full flex items-center gap-3 justify-between pl-4 pr-6 focus-within:border-[#24D998]"
                >
                    <span className="text-[#686D74] text-xs font-medium">USD</span>
                    <input
                        onInput={(event) => handleOnInput(event)}
                        onChange={() => handleConvert("currency")}
                        type="text"
                        placeholder="0.00"
                        ref={defaultCurrencyInput}
                        className="h-full w-full send-currency-input bg-transparent border-none focus:outline-none placeholder:text-lg placeholder:font-semibold placeholder:text-[#686D74] font-semibold text-lg text-[#4F5459]"
                        id="s-3"
                    />
                </div>
            </div>
        </div>
    </>
}