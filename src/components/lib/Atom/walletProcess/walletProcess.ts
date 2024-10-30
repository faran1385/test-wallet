import {atom} from "jotai";

export type processType = "welcome" | "password" | "recoveryPhrase" | "chooseName";
// steps of recoveryPhrase while generating
export type recoveryGenerateProcessType = 'selectMnemonicLength' | "displayMnemonicWords" | "verifyMnemonic"
// steps of recoveryPhrase while importing
export type recoveryImportProcessType = "selectMnemonicLength" | "importPhrases"
// types of recoveryPhrase
export type walletProcessType = "generate" | "import"

export const processTypeArray: processType[] = ["welcome", "password", "recoveryPhrase", "chooseName"]
export const processAtom = atom<processType>("chooseName")

// opening state of info modal
export const infoModalAtom = atom(false)

// user wants to generate or wants to import
export const processTypeAtom = atom<walletProcessType>("generate")

// generate
export const recoveryGenerateProcessTypeArray: recoveryGenerateProcessType[] = ['selectMnemonicLength', "displayMnemonicWords", "verifyMnemonic"]
export const recoveryGenerateProcessAtom = atom<recoveryGenerateProcessType>("verifyMnemonic")

// import
export const recoveryImportProcessTypeArray: recoveryImportProcessType[] = ["selectMnemonicLength", "importPhrases"]
export const recoveryImportProcessAtom = atom<recoveryImportProcessType>("selectMnemonicLength")

// currency
export const currencyListAtom = atom<string[]>([])
export const selectedCurrencyAtom = atom<null | number>(null)
