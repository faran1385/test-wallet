import {RecoveryPhraseButton} from "../recoveryPhraseButton/RecoveryPhraseButton.tsx";
import {AnimatePresence, motion, Variants} from "framer-motion";
import {CopyToClipboardModal} from "../copyToClipboardModal/copyToClipboardModal.tsx";
import React, {useState} from "react";
import {ethers} from "ethers";
import "./style.css"
import {recoveryGenerateProcessType} from "../../../../../lib/Atom/walletProcess/walletProcess.ts";

const copiedToClipBoardVariant: Variants = {
    hidden: {
        y: 50,
        opacity: 0
    },
    intro: {
        y: 0,
        opacity: 1,
        transition: {
            delay: .5

        }
    },
    outro: {
        y: 50,
        opacity: 0
    }
}

interface DisplayMnemonicWordsStepProps {
    selectedPhraseCount: 12 | 15 | 24,
    phrases: {
        "12": string[],
        "15": string[],
        "24": string[]
    },
    setRecoveryProcess: React.Dispatch<React.SetStateAction<recoveryGenerateProcessType>>,
}


export const DisplayMnemonicWordsStep: React.FC<DisplayMnemonicWordsStepProps> = (T) => {
    const {phrases, selectedPhraseCount} = T

    // opening state of clipboard modal
    const [clipboardModal, setClipboardModal] = useState(false)

    // copied to clipboard text
    const [copiedToClipboard, setCopiedToClipboard] = useState(false)

    const convertMnemonicToBnbDetails = async (mnemonicPhrase: string) => {
        try {
            // Create a Mnemonic object from the string
            const mnemonic = ethers.Mnemonic.fromPhrase(mnemonicPhrase);

            // Create an HDNode wallet from the Mnemonic object
            const hdNode = ethers.HDNodeWallet.fromMnemonic(mnemonic);

            // Retrieve the BNB address, public key, and private key
            const address = hdNode.address;
            const publicKey = hdNode.publicKey;
            const privateKey = hdNode.privateKey;
            console.log('pub', publicKey)
            console.log('priv', privateKey)

            console.log('address', address)

            return {
                address,
                publicKey,
                privateKey,
            };
        } catch (error) {
            console.error("Error converting mnemonic:", error);
            throw new Error("Invalid mnemonic or unable to convert.");
        }
    };


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
                <div className="sm:block grid mt-8 gap-4">
                    <div
                        className="grid px-4 display-phrase-container overflow-y-auto palce-items-center gap-4 grid-cols-3 sm:gap-5 text-[12px] sm:text-[14px]">
                        {phrases[`${selectedPhraseCount}`].length > 0 ? phrases[`${selectedPhraseCount}`].map((phrase, i) => {
                            return <RecoveryPhraseButton text={phrase} key={phrase + i} number={i + 1}/>
                        }) : (Array(selectedPhraseCount).fill("loading").map((phrase, i) => {
                            return <RecoveryPhraseButton key={i} number={i + 1} loading={true} text={phrase}/>
                        }))}
                    </div>
                    <div className={"w-full flex justify-center"}>
                        <div className={"relative"}>
                            <button
                                onClick={() => setClipboardModal(true)}
                                className="text-[#686D74] underline text-[13px] flex justify-center mb-0 sm:mb-12 mt-3 sm:mt-5 sm:text-[14px]">
                                Copy to clipboard
                            </button>
                            <AnimatePresence>
                                {copiedToClipboard && <motion.div
                                    variants={copiedToClipBoardVariant}
                                    animate={"intro"}
                                    initial={"hidden"}
                                    exit={"outro"}
                                    transition={{
                                        duration: .7,
                                        type: "spring",
                                        ease: "easeInOut"
                                    }}
                                    className={"absolute  top-[15%] sm:top-[20px] -left-[40%] sm:left-[-33%] bg-wallet-green shadow-lg min-w-[200px] text-white rounded text-center p-2 w-fit"}>
                                    Copied to clipboard
                                </motion.div>}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col items-center gap-7">
                <div className="w-full flex flex-col-reverse sm:flex-row items-center justify-between gap-12">
                    <button
                        onClick={() => T.setRecoveryProcess("selectMnemonicLength")}
                        className="text-nowrap text-center w-full first-line:text-white duration-300 bg-[#242431] hover:bg-[#282835] rounded-[40px] py-3 text-base font-normal peer-checked:hidden sm:block hidden">
                        Back
                    </button>
                    <button
                        onClick={() => {
                            console.log('test')
                            T.setRecoveryProcess("verifyMnemonic")
                            convertMnemonicToBnbDetails('glide refuse program laugh snack angle ready swear foot script fitness praise')
                        }}
                        className="text-nowrap text-center w-full duration-300 bg-[#24D998] hover:bg-[#21C58A] rounded-[40px] py-3 text-base font-normal peer-checked:hidden">
                        Continue
                    </button>
                </div>
            </div>
        </div>
        <CopyToClipboardModal
            setCopiedToClipboard={setCopiedToClipboard}
            setClipboardModal={setClipboardModal}
            clipboardModal={clipboardModal}
            phrases={phrases[`${selectedPhraseCount}`]}
        />
    </>
}