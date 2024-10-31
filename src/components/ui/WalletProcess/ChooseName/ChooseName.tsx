import {Currency} from "./Currency/Currency.tsx";
import {useAtom} from "jotai/index";
import {processAtom, selectedCurrencyAtom} from "../../../lib/Atom/walletProcess/walletProcess.ts";
import {useState} from "react";
import {handleFocus} from "../../../lib/globalHelpers/globalHelpers.ts";

const pattern = /[a-zA-Z]/;

export const ChooseName = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_process, setProcess] = useAtom(processAtom)

    const [selectedCurrency] = useAtom(selectedCurrencyAtom)

    const [inputIsValid, setInputIsValid] = useState(false)

    const changeHandler = (target: HTMLInputElement) => {
        if (target.value.trim().length > 2 && target.value.trim().length < 15 && pattern.test(target.value)) {
            setInputIsValid(true)
        } else {
            setInputIsValid(false)
        }
    }


    return <>
        <div className="w-full h-full sm:pb-0 pb-8 flex flex-col items-center">
            <div className={"sm:mt-8 my-auto"}>
                <div className="flex flex-col items-center justify-center gap-3">
                    <h2 className="text-2xl font-bold text-center leading-[30px]">
                        Hero Wallet
                    </h2>
                    <p className="text-[14px]  font-normal text-[#686D74] text-center">
                        Choose a name for your new wallet, and a default currency in which you want to see your wallet
                        balance.
                    </p>
                    <div className="flex w-full mt-6 flex-col gap-2">
                        <label htmlFor="*" className="text-[14px] font-medium px-2">
                            Name your new wallet
                        </label>
                        <div
                            style={{transition: "border-color .3s ease-in-out"}}
                            className={`rounded-[48px] border-[1px] ${inputIsValid ? 'border-wallet-green' : ''} flex relative `}>
                            <input
                                onFocus={handleFocus}
                                onChange={(e) => changeHandler(e.target)}
                                placeholder="Wallet Name"
                                type={'text'}
                                className="pl-4 bg-[#F8F9FB] w-full rounded-[48px] placeholder:text-[13px] placeholder:text-[#686D74] h-[50px] outline-1 outline-wallet-green"
                            />
                        </div>
                    </div>
                    <Currency/>
                </div>
            </div>

            <div className="w-full flex flex-col items-center mt-0 sm:mt-12 gap-7">
                <div className="w-full flex flex-col-reverse sm:flex-row items-center justify-between gap-12">
                    <button
                        onClick={() => setProcess("recoveryPhrase")}
                        className="text-nowrap text-center w-full first-line:text-white duration-300 bg-[#242431] hover:bg-[#282835] rounded-[40px] py-3 text-base font-normal peer-checked:hidden sm:block hidden">
                        Back
                    </button>
                    <button
                        onClick={() => setProcess("waiting")}
                        disabled={!(selectedCurrency !== null && inputIsValid)}
                        className={`text-nowrap ${selectedCurrency !== null && inputIsValid ? 'opacity-100  hover:bg-[#21C58A] bg-[#24D998] text-[#151523]' : 'opacity-60 bg-wallet-disable-background text-wallet-disable-text  cursor-not-allowed'} text-center w-full duration-300 bg-[#24D998] rounded-[40px] py-3 text-base font-normal peer-checked:hidden`}>
                        Continue
                    </button>
                </div>
            </div>
        </div>
    </>
}