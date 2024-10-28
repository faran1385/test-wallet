import React from "react";

interface RecoveryPhraseButtonProps {
    text: string,
    number?: number
    checked?: {
        border: boolean,
        badge: boolean
    },
    setSelectedPhraseCount?: React.Dispatch<React.SetStateAction<12 | 15 | 24>>,
    loading?: boolean
}

export const RecoveryPhraseButton: React.FC<RecoveryPhraseButtonProps> = (T) => {
    if (T.loading) {
        return <div
            className={`rounded-[45px] animate-pulse bg-[#22222222] px-3 md:px-5 max-w-[95px] min-w-[95px] md:max-w-[125px] h-[40px] text-[#686D74]`}>
            <span className={"invisible"}>{T.number}</span> <span className="px-2 invisible md:px-3">{T.text}</span>
        </div>
    }

    if ("number" in T) {
        return <div
            className={`rounded-[45px]  border-[1px] ${T.checked?.border ? 'border-wallet-green' : ' border-[#D3D9E2]'} bg-[#F8F9FB] flex items-center px-3 md:px-5 max-w-[95px] min-w-[95px] md:max-w-[125px] h-[40px] text-[#686D74]`}>
            {T.number} <span className="px-2 md:px-3">{T.text}</span>
        </div>
    }

    return <div
        style={{
            transition: "border-color .3s ease-in-out",
        }}
        onClick={() => T.setSelectedPhraseCount && T.setSelectedPhraseCount((+(T.text as "12" | "15" | "24") as 12 | 15 | 24))}
        className={`cursor-pointer hover:border-wallet-green rounded-[45px] border-[1px] ${T.checked?.border ? 'border-wallet-green' : ' border-[#D3D9E2]'} bg-[#F8F9FB] min-w-[95px] flex items-center justify-center max-w-[95px] md:min-w-[125px] md:max-w-[125px] h-[40px] text-[#4F5459] relative`}>
        {T.text}
        {T.checked?.badge && (
            <img width={13} height={12} src="/svg/backup/check.svg" alt="checked"
                   className="absolute right-0 bottom-7"/>
        )}
    </div>
}