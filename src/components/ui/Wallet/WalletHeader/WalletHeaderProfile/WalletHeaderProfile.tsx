import React from "react";

interface WalletHeaderProfileProps {
    name: string,
    image: string
}

export const WalletHeaderProfile: React.FC<WalletHeaderProfileProps> = (T) => {
    return <div
        style={{transition:".3s color ease-in-out,.3s fill ease-in-out"}}
        className={"flex space-x-2 sm:space-x-3 cursor-pointer text-[#686D74] hover:text-wallet-blue items-center"}>
        <div className={"rounded-full border-[#E1E5EB] border-4"}>
            <img
                className={"rounded-full w-8 h-8"}
                alt={"profile picture"}
                src={T.image}/>
        </div>
        <span className={"font-medium  text-[14px]"}>{T.name}</span>
        <svg className={"lg:block hidden"} width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.625 6.5L0 0.5H11.25L5.625 6.5Z" fill="currentColor"/>
        </svg>
    </div>
}