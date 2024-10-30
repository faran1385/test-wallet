import {CreatePasswordState} from "./CreatePasswordState/CreatePasswordState";
import {WelcomeState} from "./WelcomeState/WelcomeState";
import {Dispatch, SetStateAction} from "react";
import {RecoveryPhrase} from "./recoveryPhrase/recoveryPhrase";
import {WalletProcessHeader} from "./WalletProcessHeader/WalletProcessHeader.tsx";
import {processAtom, processType} from "../../lib/Atom/walletProcess/walletProcess.ts";
import {useAtom} from "jotai";


export type processComponentBaseArg = {
    setProcess: Dispatch<SetStateAction<processType>>
}

export const WalletProcess = () => {
    const [process] = useAtom(processAtom)
    return <div id={'process-container'} className="flex  items-center h-dvh w-full justify-center">
        <div className="w-full overflow-hidden h-full sm:w-[530px] sm:h-fit sm:bg-white rounded-xl px-6 py-8">
            <WalletProcessHeader/>
            {process === "welcome" ? (
                <WelcomeState key={"welcome"}/>
            ) : process === "password" ? (
                <CreatePasswordState key={"password"}/>
            ) : process === "recoveryPhrase" ? (
                <RecoveryPhrase/>
            ) : null}
        </div>
    </div>
}