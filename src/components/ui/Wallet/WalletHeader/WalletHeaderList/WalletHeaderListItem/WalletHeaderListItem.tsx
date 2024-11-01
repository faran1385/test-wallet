import React from "react";

interface WalletHeaderListItemProps {
    active?: boolean,
    text: string,
    children: React.ReactNode
}

export const WalletHeaderListItem: React.FunctionComponent<WalletHeaderListItemProps> = (T) => {
    return <>
        <li
            style={{transition:".3s color ease-in-out"}}
            className={`flex items-center ${T.active ? 'text-wallet-blue' : 'text-[#868D96]'} hover:text-wallet-blue cursor-pointer space-x-2`}>
            {T.children}
            <span className={"font-normal text-[14px]"}>{T.text}</span>
        </li>
    </>
}