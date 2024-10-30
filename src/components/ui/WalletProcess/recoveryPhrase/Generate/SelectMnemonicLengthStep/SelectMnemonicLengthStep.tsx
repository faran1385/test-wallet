import {RecoveryPhraseButton} from "../recoveryPhraseButton/RecoveryPhraseButton.tsx";
import React from "react";
import {useAtom} from "jotai";
import {
    processAtom, processTypeAtom,
    recoveryGenerateProcessType,
    recoveryImportProcessType
} from "../../../../../lib/Atom/walletProcess/walletProcess.ts";

interface SelectMnemonicLengthStepProps {
    setSelectedPhraseCount: React.Dispatch<React.SetStateAction<12 | 15 | 24>>,
    setRecoveryProcess: React.Dispatch<React.SetStateAction<recoveryGenerateProcessType>> | React.Dispatch<React.SetStateAction<recoveryImportProcessType>>,
    selectedPhraseCount: 12 | 15 | 24,
}

export const SelectMnemonicLengthStep: React.FC<SelectMnemonicLengthStepProps> = (T) => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_process, setProcess] = useAtom(processAtom)

    const [processType] = useAtom(processTypeAtom)


    return <>
        <div className="w-full h-full sm:pb-0 pb-8 flex flex-col items-center">
            <div className={"sm:mt-8 my-auto"}>
                <div className="flex flex-col items-center justify-center gap-3">
                    <h2 className="text-2xl font-bold text-center leading-[30px]">
                        Back up your Secret<br className="pt-2"/>
                        Recovery Phrase
                    </h2>
                    <p className="text-[14px]  font-normal text-[#686D74] text-center">
                        Remember that Hero cannot access your <br/>
                        Secret Recovery Phrase. It’s for your eyes only, never share it
                        with<br/>
                        anyone and keep it safe.
                    </p>
                </div>
                <div
                    className="grid palce-items-center gap-4 grid-cols-3 sm:gap-5 pt-8 text-[12px] sm:text-[14px]">
                    {[12, 15, 24].map((length, i) => {
                        return <RecoveryPhraseButton setSelectedPhraseCount={T.setSelectedPhraseCount}
                                                     text={`${length}`} key={i} checked={{
                            border: T.selectedPhraseCount === length,
                            badge: T.selectedPhraseCount === length
                        }}/>
                    })}
                </div>
            </div>
            <div className="w-full flex flex-col items-center mt-0 sm:mt-12 gap-7">
                <div className="w-full flex flex-col-reverse sm:flex-row items-center justify-between gap-12">
                    <button
                        onClick={() => setProcess("password")}
                        className="text-nowrap text-center w-full first-line:text-white duration-300 bg-[#242431] hover:bg-[#282835] rounded-[40px] py-3 text-base font-normal peer-checked:hidden sm:block hidden">
                        Back
                    </button>
                    <button
                        onClick={() => T.setRecoveryProcess(processType === "import" ? "importPhrases" as any : "displayMnemonicWords" as any)}
                        className="text-nowrap text-center w-full duration-300 bg-[#24D998] hover:bg-[#21C58A] rounded-[40px] py-3 text-base font-normal peer-checked:hidden">
                        Continue
                    </button>
                </div>
            </div>
        </div>
    </>
}