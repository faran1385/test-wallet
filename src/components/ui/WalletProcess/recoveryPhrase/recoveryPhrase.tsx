import * as bip39 from 'bip39';
import React, {useEffect, useState} from "react";
import {processComponentBaseArg} from "../WalletProcess";
import {RecoveryPhraseButton} from "./recoveryPhraseButton/RecoveryPhraseButton";
import {CopyToClipboardModal} from "./copyToClipboardModal/copyToClipboardModal";
import {InfoModal} from "./infoModal/infoModal";

export const RecoveryPhrase: React.FC<processComponentBaseArg> = (T) => {

    // length of phrases state
    const [selectedPhraseCount, setSelectedPhraseCount] = useState<12 | 15 | 24>(12)

    // phrases array
    const [phrases, setPhrases] = useState({
        '12': [] as string[],
        '15': [] as string[],
        '24': [] as string[]
    })

    // opening state of clipboard modal
    const [clipboardModal, setClipboardModal] = useState(false)

    // opening state of info modal
    const [infoModal, setInfoModal] = useState(false)

    // setting phrases
    useEffect(() => {
        setPhrases({
            '12': bip39.generateMnemonic(256 * 12 / 24).split(" "),
            '15': bip39.generateMnemonic(256 * 15 / 24).split(" "),
            '24': bip39.generateMnemonic(256).split(" "),
        })
    }, []);

    return <>
        <div className="flex items-center h-screen w-full justify-center">
            <div
                className="w-full h-full md:w-fit md:min-w-[530px] md:h-fit container-board md:bg-white rounded-[12px]  p-6">
                <div className="w-full h-full flex flex-col items-center justify-between md:justify-center">
                    <div className="w-full flex justify-between items-center">
                        <button onClick={() => T.setProcess("password")}>
                            <img
                                width={9}
                                height={14}
                                src={"/svg/global/arrow-left.svg"}
                                alt=""
                                className="cursor-pointer md:hidden"
                            />
                        </button>
                        <div className="flex items-center justify-center gap-4 *:h-[9px] *:w-[9px]">
                            <div onClick={() => T.setProcess("welcome")}
                                 className="circle cursor-pointer rounded-full bg-[#1B65FF] sm:bg-[#24D998]"></div>
                            <div onClick={() => T.setProcess("password")}
                                 className="circle cursor-pointer rounded-full bg-[#1B65FF] sm:bg-[#24D998]"></div>
                            <div className="circle rounded-full bg-[#1B65FF] sm:bg-[#24D998]"></div>
                            <div className="circle rounded-full  bg-[#BDC7D3]"></div>
                        </div>
                        <span onClick={() => setInfoModal(true)}
                              style={{
                                  transition: "opacity ease-in-out .3s"
                              }}
                              className="opacity-60 hover:opacity-100 cursor-pointer font-medium text-xl text-[#686D74]">?</span>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-3 pt-12 pb-8">
                        <h2 className="text-2xl font-bold text-center leading-[30px]">
                            Back up your Secret<br className="pt-2"/>
                            Recovery Phrase
                        </h2>
                        <p className="text-[12px] md:text-[14px]  font-normal text-[#686D74] text-center hidden md:block">
                            Remember that Hero cannot access your <br/>
                            Secret Recovery Phrase. It’s for your eyes only, never share it
                            with<br/>
                            anyone and keep it safe.
                        </p>
                        <p className="text-[12px] md:text-[14px]  font-normal text-[#686D74] text-center  md:hidden">
                            Remember that Hero cannot access your <br/>
                            Secret Recovery Phrase. It’s for your eyes only,<br/> never share it
                            with
                            anyone and keep it safe.</p>
                    </div>
                    <div className="grid palce-items-center gap-4 grid-cols-3 md:gap-5 text-[12px] md:text-[14px]">
                        {[12, 15, 24].map((number) => {
                            return <RecoveryPhraseButton
                                key={number}
                                checked={{
                                    badge: selectedPhraseCount === number,
                                    border: selectedPhraseCount === number
                                }}
                                setSelectedPhraseCount={setSelectedPhraseCount}
                                text={`${number}`}
                            />
                        })}
                    </div>
                    <div className="md:block grid gap-4">
                        <div
                            className="grid palce-items-center gap-4 grid-cols-3 md:gap-5 pt-12 text-[12px] md:text-[14px]">
                            {phrases[`${selectedPhraseCount}`].length > 0 ? phrases[`${selectedPhraseCount}`].map((phrase, i) => {
                                return <RecoveryPhraseButton text={phrase} key={phrase + i} number={i + 1}/>
                            }) : (Array(12).fill("loading").map((phrase, i) => {
                                return <RecoveryPhraseButton key={i} number={i + 1} loading={true} text={phrase}/>
                            }))}
                        </div>
                    </div>
                    <button
                        onClick={() => setClipboardModal(true)}
                        className="text-[#686D74] underline text-[12px] flex justify-center mb-12 mt-3 md:mt-5 md:text-[14px]">
                        Copy to clipboard
                    </button>

                    <div className="w-full flex flex-col pb-3 items-center gap-7 md:gap-12">
                        <div className="w-full flex flex-col-reverse sm:flex-row items-center justify-between gap-7">
                            <button
                                onClick={() => T.setProcess("password")}
                                className="text-nowrap text-center w-full first-line:text-white duration-300 bg-[#242431] hover:bg-[#282835] rounded-[40px] py-3 text-base font-normal peer-checked:hidden md:block hidden">
                                Back
                            </button>
                            <button
                                className="text-nowrap text-center w-full duration-300 bg-[#24D998] hover:bg-[#21C58A] rounded-[40px] py-3 text-base font-normal peer-checked:hidden">
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <CopyToClipboardModal
            setClipboardModal={setClipboardModal}
            clipboardModal={clipboardModal}
            phrases={phrases[`${selectedPhraseCount}`]}
        />
        <InfoModal
            infoModal={infoModal}
            setInfoModal={setInfoModal}
        />
    </>
}