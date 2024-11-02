import React from "react";

interface WalletHeaderProfileProps {
    name: string,
    image: string
}

export const WalletHeaderProfile: React.FC<WalletHeaderProfileProps> = (T) => {
    return <div className="flex gap-3">
        <div
            style={{transition: '.3s color ease-in-out'}}
            className="flex hover:text-wallet-blue text-[#686D74] items-center gap-3 cursor-pointer">
            <img
                src={T.image}
                alt="avatar"
                className="h-6 w-6 rounded-full object-cover shadow-[0_0_0_5px_#E1E5EB]"
            />
            <span className=" text-sm"
            >{T.name}</span
            >
            <svg width="12" height="12" viewBox="0 0 12 12" className={"mt-1"} xmlns="http://www.w3.org/2000/svg">
                <path d="M5.625 8L0 2H11.25L5.625 8Z" fill="currentColor"/>
            </svg>

        </div>
    </div>
}