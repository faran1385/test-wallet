import React from "react";

interface RecoveryPhraseButtonProps {
    //global usage
    text: string,
    number?: number
    checked?: {
        border: boolean,
        badge: boolean
    },
    // setting mnemonic length
    setSelectedPhraseCount?: React.Dispatch<React.SetStateAction<12 | 15 | 24>>,
    // loading
    loading?: boolean,
    // verify
    verify?: 'verified' | 'not verified' | 'about to be verified',
    verifyClickHandler?: (selectedPhrase: string) => void,
    isValid?: boolean
}

export const RecoveryPhraseButton: React.FC<RecoveryPhraseButtonProps> = (T) => {
    if (T.verify) {
        return <div
            style={{
                transition: "border-color .3s ease-in-out,background-color .3s ease-in-out",
            }}
            className={`${T.checked?.badge ? '' : 'cursor-pointer'} sm:m-[inherit] m-auto hover:border-wallet-green rounded-[45px] ${T.checked?.border ? 'border-wallet-green' : ' border-[#D3D9E2]'} border-[1px] ${T.verify === "about to be verified" ? 'border-wallet-green bg-[#F8F9FB] text-[#4F5459] ' : T.verify === "verified" ? 'bg-wallet-green text-white' : 'text-[#4F5459] bg-[#F8F9FB]'}  min-w-[95px] flex items-center justify-center max-w-[95px] sm:min-w-[125px] sm:max-w-[125px] h-[40px] relative`}>
            {T.text}
            {T.checked?.badge && (
                <img width={13} height={12} src="/svg/backup/check.svg" alt="checked"
                     className="absolute right-0 bottom-7"/>
            )}
        </div>
    }

    if (T.loading) {
        return <div
            className={`rounded-[45px] sm:m-[inherit] m-auto animate-pulse bg-[#22222222] px-3 sm:px-5 max-w-[95px] min-w-[95px] sm:max-w-[125px] h-[40px] text-[#686D74]`}>
            <span className={"invisible"}>{T.number}</span> <span className="px-2 invisible sm:px-3">{T.text}</span>
        </div>
    }

    if ("number" in T) {
        return <div
            className={`rounded-[45px] sm:m-[inherit] m-auto border-[1px] ${T.checked?.border ? 'border-wallet-green' : ' border-[#D3D9E2]'} bg-[#F8F9FB] flex items-center px-3 sm:px-5 max-w-[95px] min-w-[95px] sm:max-w-[125px] h-[40px] text-[#686D74]`}>
            {T.number} <span className="px-2 sm:px-3">{T.text}</span>
        </div>
    }

    const clickHandler = () => {
        if (T.setSelectedPhraseCount) {
            T.setSelectedPhraseCount((+(T.text as "12" | "15" | "24") as 12 | 15 | 24))
        } else if (T.verifyClickHandler && !T.checked?.border) {
            T.verifyClickHandler(T.text)
        }
    }
    return <div
        style={{
            transition: "border-color .3s ease-in-out",
        }}
        onClick={clickHandler}
        className={`${T.checked?.badge || T.isValid ? 'cursor-default' : 'cursor-pointer hover:border-wallet-green'} sm:m-[inherit] m-auto  rounded-[45px] border-[1px] ${T.checked?.border ? 'border-wallet-green' : ' border-[#D3D9E2]'} bg-[#F8F9FB] min-w-[95px] flex items-center justify-center max-w-[95px] sm:min-w-[125px] sm:max-w-[125px] h-[40px] text-[#4F5459] relative`}>
        {T.text}
        {T.checked?.badge && (
            <img width={13} height={12} src="/svg/backup/check.svg" alt="checked"
                 className="absolute right-0 bottom-7"/>
        )}
    </div>
}