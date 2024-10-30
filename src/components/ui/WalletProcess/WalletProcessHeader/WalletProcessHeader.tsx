import React from "react";
import {useAtom} from "jotai";
import {
    infoModalAtom,
    processAtom,
    processTypeArray,
    recoveryGenerateProcessAtom, recoveryGenerateProcessTypeArray
} from "../../../lib/Atom/walletProcess/walletProcess.ts";

export const WalletProcessHeader: React.FC = () => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_infoModal, setInfoModal] = useAtom(infoModalAtom)

    const [recoveryProcess, setRecoveryProcess] = useAtom(recoveryGenerateProcessAtom)

    const [process, setProcess] = useAtom(processAtom)

    const processIndex = processTypeArray.findIndex((step) => {
    console.log(process,step)
        return step === process
    })

    const backClickHandler = () => {
        if (process === "recoveryPhrase" && recoveryProcess !== "selectMnemonicLength") {
            // finding the user is in witch step of this state
            const index = recoveryGenerateProcessTypeArray.findIndex(step => {
                return step === recoveryProcess
            })

            setRecoveryProcess(recoveryGenerateProcessTypeArray[index - 1]);
        } else {
            setProcess(processTypeArray[processIndex - 1])
        }
    }
    return <header className="w-full flex justify-between items-center">
        <button className={`${processIndex !== 0 ? 'visible' : 'invisible'}`}>
            <img
                onClick={backClickHandler}
                width={9}
                height={14}
                src={"/svg/global/arrow-left.svg"}
                alt=""
                className="cursor-pointer sm:hidden"
            />
        </button>
        <div className="flex items-center mx-auto justify-center gap-4 *:h-[9px] *:w-[9px]">
            {processTypeArray.map((step, i) => {
                return <div key={step + i}
                            className={`circle cursor-pointer rounded-full ${i <= processIndex ? 'bg-[#24D998]' : 'bg-[#BDC7D3]'}`}></div>
            })}
        </div>

        <span style={{transition: "opacity ease-in-out .3s"}}
              onClick={() => setInfoModal(true)}
              className={`opacity-60 ${process === "recoveryPhrase" ? 'visible' : 'invisible'} hover:opacity-100 cursor-pointer font-medium text-xl text-[#686D74]`}>?</span>
    </header>
}