import {atom} from "jotai";

export type processType = "welcome" | "password" | "recoveryPhrase";
export type recoveryProcessType = 'selectMnemonicLength' | "displayMnemonicWords" | "verifyMnemonic"

export const processTypeArray: processType[] = ["welcome", "password", "recoveryPhrase"]
export const processAtom = atom<processType>("recoveryPhrase")

// opening state of info modal
export const infoModalAtom = atom(false)

export const recoveryProcessTypeArray: recoveryProcessType[] = ['selectMnemonicLength', "displayMnemonicWords", "verifyMnemonic"]
export const recoveryProcessAtom = atom<recoveryProcessType>("displayMnemonicWords")


