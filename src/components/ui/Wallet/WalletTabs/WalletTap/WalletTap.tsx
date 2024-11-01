import React from "react";

interface WalletTapProps {
    text: string,
    children: React.ReactNode,
    active?: boolean
}

export const WalletTap: React.FC<WalletTapProps> = (T) => {
    return <>
        <li style={{transition: ".3s ease-in-out color"}}
            className={`flex space-x-2 items-center cursor-pointer hover:text-wallet-blue ${T.active ? 'text-wallet-blue':'text-[#686D74]'}`}>
            {T.children}
            <span>{T.text}</span>
        </li>
    </>
}