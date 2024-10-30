import React from "react";
import {CurrencyItem} from "../CurrencyItem/CurrencyItem.tsx";
import "./style.css"

interface CurrencyContainerProps {
    currencies: string[]
    openContainer: boolean
}

export const CurrencyContainer: React.FC<CurrencyContainerProps> = (T) => {

    return <ul
        style={{transition: "transform .3s ease-in-out,opacity .3s ease-in-out"}}
        className={`w-full currency-container-dont-close ${T.openContainer ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-1/2 opacity-0 pointer-events-none'} currency-container h-[400px] p-2 overflow-y-auto bg-white absolute bottom-[55px] rounded shadow-2xl`}>
        {T.currencies.map((currency, i) => {
            return <CurrencyItem index={i} key={i} text={currency}/>;
        })}
    </ul>
}