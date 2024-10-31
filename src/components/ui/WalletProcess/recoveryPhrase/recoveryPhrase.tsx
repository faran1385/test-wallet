import {InfoModal} from "./infoModal/infoModal";
import {DisplayMnemonicWordsStep} from "./Generate/DisplayMnemonicWordsStep/DisplayMnemonicWordsStep.tsx";
import {SelectMnemonicLengthStep} from "./Generate/SelectMnemonicLengthStep/SelectMnemonicLengthStep.tsx";

import {
    processTypeAtom,
    recoveryGenerateProcessAtom,
    recoveryImportProcessAtom
} from "../../../lib/Atom/walletProcess/walletProcess.ts";
import {useAtom} from "jotai";
import {VerifyMnemonicStep} from "./Generate/VerifyMnemonicStep/VerifyMnemonicStep.tsx";
import {ImportPhrases} from "./Import/ImportPhrases/ImportPhrases.tsx";
import React from "react";

interface RecoveryPhraseProps {
    setSelectedPhraseCount: React.Dispatch<React.SetStateAction<12 | 15 | 24>>,
    selectedPhraseCount: 12 | 15 | 24,
    phrases: {
        "12": string[],
        "15": string[],
        "24": string[]
    }

}

export const RecoveryPhrase: React.FC<RecoveryPhraseProps> = (T) => {
    const {selectedPhraseCount, setSelectedPhraseCount, phrases} = T
    const [recoveryGenerateProcess, setRecoveryGenerateProcess] = useAtom(recoveryGenerateProcessAtom)
    const [processType] = useAtom(processTypeAtom)

    const [recoveryImportProcess, setRecoveryImportProcess] = useAtom(recoveryImportProcessAtom)

    return <>
        {processType === "generate" ? (recoveryGenerateProcess === "selectMnemonicLength" ? (
            <SelectMnemonicLengthStep
                setRecoveryProcess={setRecoveryGenerateProcess}
                selectedPhraseCount={selectedPhraseCount}
                setSelectedPhraseCount={setSelectedPhraseCount}
            />
        ) : recoveryGenerateProcess === "displayMnemonicWords" ? (
            <DisplayMnemonicWordsStep
                setRecoveryProcess={setRecoveryGenerateProcess}
                phrases={phrases}
                selectedPhraseCount={selectedPhraseCount}
            />
        ) : recoveryGenerateProcess === "verifyMnemonic" ? (
            <VerifyMnemonicStep
                phrases={phrases}
                selectedPhraseCount={selectedPhraseCount}
            />
        ) : null) : (recoveryImportProcess === "selectMnemonicLength" ? (
            <SelectMnemonicLengthStep
                setRecoveryProcess={setRecoveryImportProcess}
                selectedPhraseCount={selectedPhraseCount}
                setSelectedPhraseCount={setSelectedPhraseCount}
            />
        ) : recoveryImportProcess === "importPhrases" ? (
            <ImportPhrases
                selectedPhraseCount={selectedPhraseCount}
            />
        ) : null)}
        <InfoModal/>
    </>
}