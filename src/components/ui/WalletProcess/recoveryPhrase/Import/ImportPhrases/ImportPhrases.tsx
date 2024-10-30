import {useAtom} from "jotai";
import {
    recoveryImportProcessAtom
} from "../../../../../lib/Atom/walletProcess/walletProcess.ts";
import React, {useRef, useState} from "react";
import {ImportPhraseInput} from "./ImportPhraseInput/ImportPhraseInput.tsx";
import * as bip39 from "bip39";

interface ImportPhrasesProps {
    selectedPhraseCount: 12 | 15 | 24,
}

export const ImportPhrases: React.FC<ImportPhrasesProps> = (T) => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_importProcess, setImportProcess] = useAtom(recoveryImportProcessAtom)

    const fakeArray = new Array(T.selectedPhraseCount).fill('')

    const valueArray = useRef(new Array(T.selectedPhraseCount).fill(''))

    // this tells that the mnemonic is correct or not
    const [isValid, setIsValid] = useState(false)

    const inputOnChangeHandler = (index: number, value: string) => {
        valueArray.current[index] = value
        const mnemonic = valueArray.current.join(' ')
        setIsValid(bip39.validateMnemonic(mnemonic))
    }

    const pasteHandler = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pastedText = e.clipboardData.getData('text');
        const rawPastedTextArray = pastedText.split(' ').filter((item) => item.trim())
        if (rawPastedTextArray.length === T.selectedPhraseCount) {
            e.preventDefault()
            const pastedArray = rawPastedTextArray.map((text) => {
                if (Number.isInteger(+(text.trim().slice(0, 1))) && (text.slice(1, 2) === "-")) {
                    return text.slice(2)
                } else if (Number.isInteger(+(text.trim().slice(0, 2))) && text.slice(2, 3) === "-") {
                    return text.slice(3)
                }
                return text
            })

            const inputs = document.querySelectorAll('.import-phrase-input') as NodeListOf<HTMLInputElement>
            inputs.forEach((input, i) => {
                input.value = pastedArray[i]
                valueArray.current[i] = pastedArray[i]
            })

            const mnemonic = valueArray.current.join(' ')
            setIsValid(bip39.validateMnemonic(mnemonic))
        }
    }

    return <>
        <div className="w-full h-full sm:pb-0 pb-8 flex flex-col items-center">
            <div className={"sm:mt-8 my-auto"}>
                <div className="flex flex-col items-center justify-center gap-3">
                    <h2 className="text-2xl font-bold text-center leading-[30px]">
                        Enter your Secret Recovery<br className="pt-2"/>
                        Phrase
                    </h2>
                    <p className="text-[14px]  font-normal text-[#686D74] text-center">
                        Use the fields below to enter your
                        Secret Recovery Phrase.<br/> Pay attention to the words and their order and ensure they are
                        correct
                        when entering.
                    </p>
                </div>
                <div className="sm:block grid mt-8 gap-4">
                    <div
                        className="grid px-4 phrases-container overflow-y-auto palce-items-center gap-4 grid-cols-3 sm:gap-5 text-[12px] sm:text-[14px]">
                        {fakeArray.map((_value, index) => {
                            return <ImportPhraseInput
                                key={index}
                                isValid={isValid}
                                index={index}
                                pasteHandler={pasteHandler}
                                changeHandler={inputOnChangeHandler}
                                number={index + 1}
                            />
                        })}
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col items-center gap-7 sm:mt-12 mt-0">
                <div className="w-full flex flex-col-reverse sm:flex-row items-center justify-between gap-12">
                    <button
                        onClick={() => setImportProcess("selectMnemonicLength")}
                        className="text-nowrap text-center w-full first-line:text-white duration-300 bg-[#242431] hover:bg-[#282835] rounded-[40px] py-3 text-base font-normal peer-checked:hidden sm:block hidden">
                        Back
                    </button>
                    <button
                        disabled={!isValid}
                        className={`text-nowrap text-center w-full duration-300 ${isValid ? 'bg-[#24D998] hover:bg-[#21C58A]' : 'bg-wallet-disable-background text-wallet-disable-text opacity-60 cursor-not-allowed'}  rounded-[40px] py-3 text-base font-normal peer-checked:hidden`}>
                        Continue
                    </button>
                </div>
            </div>
        </div>
    </>
}