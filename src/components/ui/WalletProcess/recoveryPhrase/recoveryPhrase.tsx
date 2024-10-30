import {InfoModal} from "./infoModal/infoModal";
import {DisplayMnemonicWordsStep} from "./DisplayMnemonicWordsStep/DisplayMnemonicWordsStep.tsx";
import {SelectMnemonicLengthStep} from "./SelectMnemonicLengthStep/SelectMnemonicLengthStep.tsx";
import {useHandlePhrases} from "../../../lib/useHandlePhrases/useHandlePhrases.ts";
import {recoveryProcessAtom} from "../../../lib/Atom/walletProcess/walletProcess.ts";
import {useAtom} from "jotai";
import {VerifyMnemonicStep} from "./VerifyMnemonicStep/VerifyMnemonicStep.tsx";


export const RecoveryPhrase = () => {
    const [recoveryProcess, setRecoveryProcess] = useAtom(recoveryProcessAtom)
    const {setSelectedPhraseCount, selectedPhraseCount, phrases} = useHandlePhrases()

    return <>
        {recoveryProcess === "selectMnemonicLength" ? (
            <SelectMnemonicLengthStep
                setRecoveryProcess={setRecoveryProcess}
                selectedPhraseCount={selectedPhraseCount}
                setSelectedPhraseCount={setSelectedPhraseCount}
            />
        ) : recoveryProcess === "displayMnemonicWords" ? (
            <DisplayMnemonicWordsStep
                setRecoveryProcess={setRecoveryProcess}
                phrases={phrases}
                selectedPhraseCount={selectedPhraseCount}
            />
        ) : recoveryProcess === "verifyMnemonic" ? (
            <VerifyMnemonicStep
                phrases={phrases}
                selectedPhraseCount={selectedPhraseCount}
            />
        ) : null}

        <InfoModal/>
    </>
}