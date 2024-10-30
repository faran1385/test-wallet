import React, {useRef, useState} from "react";
import {recoveryProcessAtom} from "../../../../lib/Atom/walletProcess/walletProcess.ts";
import {RecoveryPhraseButton} from "../recoveryPhraseButton/RecoveryPhraseButton.tsx";
import {useAtom} from "jotai";
import {
    getRandomNumberArray,
    getThNumber,
    randomNumber,
    replaceAllItems, shuffleArray
} from "../../../../lib/globalHelpers/globalHelpers.ts";

interface VerifyMnemonicStepProps {
    selectedPhraseCount: 12 | 15 | 24,
    phrases: {
        "12": string[],
        "15": string[],
        "24": string[]
    },
}


export const VerifyMnemonicStep: React.FC<VerifyMnemonicStepProps> = (T) => {
    const {phrases, selectedPhraseCount} = T

    const [randomIndexArray, setRandomIndexArray] = useState(getRandomNumberArray(3, T.selectedPhraseCount))

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_recoveryProcess, setRecoveryProcess] = useAtom(recoveryProcessAtom)

    const [verifyIndex, setVerifyIndex] = useState(0)

    // for indexs that were selected correctly and passed the checking
    const correctAnswers = useRef<string[]>([])

    // when the use chooses a phrase
    const chooseHandler = (selectedPhrase: string) => {
        const phrase = phrases[`${selectedPhraseCount}`][randomIndexArray[verifyIndex]]
        console.log(phrases[`${selectedPhraseCount}`], selectedPhrase)
        if (selectedPhrase === phrase && correctAnswers.current.length < 3) {
            setVerifyIndex(prevState => prevState + 1)
            correctAnswers.current.push(selectedPhrase)
        } else if (correctAnswers.current.length < 3) {
            const newRandomNumber = randomNumber(randomIndexArray, selectedPhraseCount)
            setRandomIndexArray(replaceAllItems(randomIndexArray, randomIndexArray[verifyIndex], newRandomNumber))
        }
    }


    // this tells that user is answers all tests and he/she can pass this section
    const isValid = correctAnswers.current.length === 3

    const phrasesShuffledArray = useRef(shuffleArray(phrases[`${selectedPhraseCount}`]))

    return <>
        <div className="w-full h-full sm:pb-0 pb-8 flex flex-col items-center">
            <div className={"sm:mt-8 my-auto"}>
                <div className="flex flex-col items-center justify-center gap-3">
                    <h2 className="text-2xl font-bold text-center leading-[30px]">
                        Verify your Secret<br className="pt-2"/>
                        Recovery Phrase
                    </h2>
                    <div
                        className={'grid my-2 px-4 phrases-container overflow-y-auto palce-items-center gap-4 grid-cols-3 sm:gap-5 text-[12px] sm:text-[14px]'}>
                        {randomIndexArray.map((index, i) => {
                            return <RecoveryPhraseButton
                                text={`${index + 1}`}
                                verify={i === verifyIndex ? 'about to be verified' : i < verifyIndex ? 'verified' : 'not verified'}
                                key={i}
                            />
                        })}
                    </div>
                    <p className="text-[14px]  font-normal text-[#686D74] text-center">
                        Let’s make sure you remember your phrase correctly.<br/>
                        Select your ({getThNumber(randomIndexArray[0] + 1)}) , ({getThNumber(randomIndexArray[1] + 1)})
                        &
                        ({getThNumber(randomIndexArray[2] + 1)}) words of your secret recovery phrase.
                    </p>
                </div>
                <div className="sm:block grid mt-8 gap-4">
                    <div
                        className="grid h-[189px] max-h-[189px] px-4 pt-1 phrases-container overflow-y-auto palce-items-center gap-4 grid-cols-3 sm:gap-5 text-[12px] sm:text-[14px]">
                        {phrases[`${selectedPhraseCount}`].length > 0 ? phrasesShuffledArray.current.map((phrase, i) => {
                            return <RecoveryPhraseButton
                                verifyClickHandler={chooseHandler}
                                checked={{
                                    border: correctAnswers.current.includes(phrase),
                                    badge: correctAnswers.current.includes(phrase),
                                }}
                                text={phrase}
                                key={phrase + i}
                            />
                        }) : (Array(12).fill("loading").map((phrase, i) => {
                            return <RecoveryPhraseButton key={i} loading={true} text={phrase}/>
                        }))}
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col items-center sm:mt-12 gap-7">
                <div className="w-full flex flex-col-reverse sm:flex-row items-center justify-between gap-12">
                    <button
                        onClick={() => setRecoveryProcess("displayMnemonicWords")}
                        className="text-nowrap text-center w-full first-line:text-white duration-300 bg-[#242431] hover:bg-[#282835] rounded-[40px] py-3 text-base font-normal peer-checked:hidden sm:block hidden">
                        Back
                    </button>
                    <button
                        className={`text-nowrap text-center w-full duration-300 ${isValid ? 'bg-[#24D998] hover:bg-[#21C58A]' : 'bg-wallet-disable-background text-wallet-disable-text opacity-60 cursor-not-allowed'}  rounded-[40px] py-3 text-base font-normal peer-checked:hidden`}>
                        Continue
                    </button>
                </div>
            </div>
        </div>
    </>
}