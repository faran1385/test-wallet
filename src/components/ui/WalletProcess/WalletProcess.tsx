import {CreatePasswordState} from "./CreatePasswordState/CreatePasswordState";
import {WelcomeState} from "./WelcomeState/WelcomeState";
import {Dispatch, SetStateAction, useState} from "react";
import {RecoveryPhrase} from "./recoveryPhrase/recoveryPhrase";

type processType = "welcome" | "password" | "recoveryPhrase";

export type processComponentBaseArg = {
    setProcess: Dispatch<SetStateAction<processType>>
}


export const WalletProcess = () => {
    const [process, setProcess] = useState<processType>("recoveryPhrase");
    return <>
        {process === "welcome" ? (
            <WelcomeState key={"welcome"} setProcess={setProcess}/>
        ) : process === "password" ? (
            <CreatePasswordState key={"password"} setProcess={setProcess}/>
        ) : process === "recoveryPhrase" ? (
            <RecoveryPhrase setProcess={setProcess}/>
        ) : null}
    </>
}