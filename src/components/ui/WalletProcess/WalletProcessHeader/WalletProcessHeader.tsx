import React from "react";
import {useAtom} from "jotai";
import {
    infoModalAtom,
    processAtom,
    processType,
    processTypeArray,
    processTypeAtom,
    recoveryGenerateProcessAtom, recoveryGenerateProcessType,
    recoveryGenerateProcessTypeArray, recoveryImportProcessAtom,
    recoveryImportProcessType,
    recoveryImportProcessTypeArray
} from "../../../lib/Atom/walletProcess/walletProcess.ts";

export const WalletProcessHeader: React.FC = () => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_infoModal, setInfoModal] = useAtom(infoModalAtom)

    const [recoveryGenerateProcess, setRecoveryGenerateProcess] = useAtom(recoveryGenerateProcessAtom)

    const [recoveryImportProcess, setRecoveryImportProcess] = useAtom(recoveryImportProcessAtom)

    const [process, setProcess] = useAtom(processAtom)

    const [processType] = useAtom(processTypeAtom)

    const processIndex = processTypeArray.findIndex((step) => {
        return step === process
    })

    const backClickHandler = () => {
        if (process === "recoveryPhrase" && processType === "generate" && recoveryGenerateProcess !== "selectMnemonicLength") {
            // finding the user is in witch step of this state
            const index = recoveryGenerateProcessTypeArray.findIndex(step => {
                return step === recoveryGenerateProcess
            })

            setRecoveryGenerateProcess(recoveryGenerateProcessTypeArray[index - 1]);
        } else if (process === "recoveryPhrase" && processType === "import" && recoveryImportProcess !== "selectMnemonicLength") {
            // finding the user is in witch step of this state
            const index = recoveryImportProcessTypeArray.findIndex(step => {
                return step === recoveryImportProcess
            })

            setRecoveryImportProcess(recoveryImportProcessTypeArray[index - 1]);
        } else {
            setProcess(processTypeArray[processIndex - 1])
        }
    }

    if (process === "waiting" || process === "welcome") return null

    let steps: (processType | recoveryGenerateProcessType | recoveryImportProcessType)[] = [...processTypeArray]
    const recoveryIndex = steps.indexOf("recoveryPhrase")
    const typeArray = processType === "generate" ? recoveryGenerateProcessTypeArray : recoveryImportProcessTypeArray
    steps = [...steps.slice(1, recoveryIndex), ...typeArray, ...steps.slice(recoveryIndex + 1, steps.length - 1)]
    const currentStepIndex = processIndex + typeArray.indexOf(processType === "generate" ? (recoveryGenerateProcess) : (recoveryImportProcess as any)) - 1

    return <header className="w-full flex justify-between items-center">
        <button className={`visible`}>
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
            {steps.map((step, i) => {

                return <div key={step + i}
                            className={`circle cursor-pointer rounded-full ${i <= currentStepIndex ? 'bg-[#24D998]' : 'bg-[#BDC7D3]'}`}></div>
            })}
        </div>

        <span style={{transition: "opacity ease-in-out .3s"}}
              onClick={() => setInfoModal(true)}
              className={`opacity-60 ${process === "recoveryPhrase" ? 'visible' : 'invisible'} hover:opacity-100 cursor-pointer font-medium text-xl text-[#686D74]`}>?</span>
    </header>
}