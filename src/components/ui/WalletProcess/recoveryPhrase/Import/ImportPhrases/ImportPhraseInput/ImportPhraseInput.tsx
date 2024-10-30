import React from "react";
import "./style.css"

interface ImportPhraseInputProps {
    number: number,
    changeHandler: (index: number, value: string) => void,
    index: number,
    isValid: boolean,
}

export const ImportPhraseInput: React.FC<ImportPhraseInputProps> = (T) => {

    return <div className={"relative phrase-input-container"}>
        <input

            onChange={(event) => T.changeHandler(T.index, event.target.value)}
            style={{transition: "border-color .3s ease-in-out"}}
            className={`border  w-full bg-[#F8F9FB] ${T.isValid ? 'border-wallet-green' : ''} p-2 border-[#D3D9E2]  rounded outline-0 ps-8`}/>
        <span
            style={{
                transition: "color .3s ease-in-out",
            }}
            className={`font-bold absolute ${T.isValid ? 'text-wallet-green' : ''} left-[15px] top-[9px] text-wallet-disable-text`}>{T.number}</span>
    </div>
}