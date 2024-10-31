import "./style.css";
import React, {useEffect, useRef} from "react";
import {CurrencyItem} from "../CurrencyItem/CurrencyItem.tsx";
import "./style.css"

interface CurrencyContainerProps {
    currencies: any[];
    openContainer: boolean;
}

export const CurrencyContainer: React.FC<CurrencyContainerProps> = (T) => {
    const containerRef = useRef<HTMLUListElement | null>(null);

    useEffect(() => {
        const handler = () => {
            if (containerRef.current) {
                const documentHeight = document.documentElement.clientHeight;
                const containerHeight = containerRef.current.clientHeight;
                const containerYPos = containerRef.current.getBoundingClientRect().top + (containerHeight / 2)
                containerRef.current.style.height = documentHeight - containerYPos - 20 + 'px'
            }
        }
        handler()
        window.addEventListener("resize", handler);

        return () => {
            window.removeEventListener("resize", handler);
        }
    }, []);

    return <ul
        ref={containerRef}
        style={{transition: "transform .3s ease-in-out,opacity .3s ease-in-out"}}
        className={`w-full border  currency-container-dont-close ${T.openContainer ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-1/2 opacity-0 pointer-events-none'} currency-container p-2 overflow-y-auto bg-white absolute top-[55px] z-[1] rounded shadow-2xl`}>
        {T.currencies.map((currency, i) => {
            return <CurrencyItem index={i} key={i} text={currency}/>;
        })}
    </ul>
}
