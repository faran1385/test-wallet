import {CreatePasswordState} from "./CreatePasswordState/CreatePasswordState";
import {WelcomeState} from "./WelcomeState/WelcomeState";
import {RecoveryPhrase} from "./recoveryPhrase/recoveryPhrase";
import {WalletProcessHeader} from "./WalletProcessHeader/WalletProcessHeader.tsx";
import {processAtom} from "../../lib/Atom/walletProcess/walletProcess.ts";
import {useAtom} from "jotai";
import {ChooseName} from "./ChooseName/ChooseName.tsx";
import {Waiting} from "./Waiting/Waiting.tsx";
import {useHandlePhrases} from "../../lib/useHandlePhrases/useHandlePhrases.ts";


export const WalletProcess = () => {
    const [process] = useAtom(processAtom)
    const {setSelectedPhraseCount, selectedPhraseCount, phrases} = useHandlePhrases()

    return <>
        <div id={'process-container'} className="flex  items-center h-dvh w-full justify-center">
            <div
                className="w-full process-card-container h-full sm:w-[530px] sm:h-fit sm:bg-white rounded-xl px-6 py-8">
                <WalletProcessHeader/>
                {process === "welcome" ? (
                    <WelcomeState key={"welcome"}/>
                ) : process === "password" ? (
                    <CreatePasswordState key={"password"}/>
                ) : process === "recoveryPhrase" ? (
                    <RecoveryPhrase
                        selectedPhraseCount={selectedPhraseCount}
                        setSelectedPhraseCount={setSelectedPhraseCount}
                        phrases={phrases}
                    />
                ) : process === "chooseName" ? (
                    <ChooseName/>
                ) : process === "waiting" ? (
                    <Waiting/>
                ) : null}
            </div>
        </div>
    </>
}