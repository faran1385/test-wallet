import React from "react";
import {useAtom} from "jotai";
import {selectedCurrencyAtom} from "../../../../../lib/Atom/walletProcess/walletProcess.ts";

interface CurrencyItemProps {
    text: string,
    index: number
}

export const CurrencyItem: React.FC<CurrencyItemProps> = (T) => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_selectedCurrency, setSelectedCurrency] = useAtom(selectedCurrencyAtom)

    return <li
        onClick={() => setSelectedCurrency(T.index)}
        style={{transition: "color .3s ease-in-out,background-color .3s ease-in-out"}}
        className={`py-2 text-[#A1A2A3] px-4 hover:bg-wallet-dark hover:text-white cursor-pointer rounded`}>
        {T.text}
    </li>
}