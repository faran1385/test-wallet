"use client"

import {CreatePasswordState} from "@/app/components/ui/WalletProcess/CreatePasswordState/CreatePasswordState";
import {WelcomeState} from "@/app/components/ui/WalletProcess/WelcomeState/WelcomeState";
import {Dispatch, SetStateAction, useState} from "react";

type processType = "welcome" | "password";

export type processComponentBaseArg = {
    setProcess: Dispatch<SetStateAction<processType>>
}




export const WalletProcess = () => {
    const [process, setProcess] = useState<processType>("welcome");
    return <>
        <>
            {process === "welcome" ? (
                <WelcomeState key={"welcome"} setProcess={setProcess}/>
            ) : process === "password" ? (
                <CreatePasswordState key={"password"} setProcess={setProcess}/>
            ) : null}
        </>
    </>
}