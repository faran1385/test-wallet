import {useState} from "react";
import axios from "axios";
import {useAtom} from "jotai";
import {processAtom} from "../../../lib/Atom/walletProcess/walletProcess.ts";


// patterns
const hasSpecialCharsPattern = /[!@#$%^&*(),.?":{}|<>]/
const hasNumbersPattern = /\d/

export const CreatePasswordState = () => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_process, setProcess] = useAtom(processAtom)

    const [submitRequirements, setSubmitRequirements] = useState({
        includesTenChars: false,
        includesNumbers: false,
        includesSpecialChars: false
    })

    // password states
    const [password, setPassword] = useState("")
    const [hidePassword, setHidePassword] = useState(true)
    // reEntered password states
    const [reEnteredPassword, setReEnteredPassword] = useState("")
    const [hideReEnteredPassword, setHideReEnteredPassword] = useState(true)

    // submit loading state
    const [loading, setLoading] = useState<boolean>(false)

    //functions
    const passwordInputChangeHandler = (value: string) => {
        setPassword(value);
        setSubmitRequirements({
            includesNumbers: hasNumbersPattern.test(value),
            includesTenChars: value.trim().length > 9,
            includesSpecialChars: hasSpecialCharsPattern.test(value)
        })

    }

    // this tells that user can submit the form or not
    const isValid = reEnteredPassword === password &&
        submitRequirements.includesTenChars &&
        submitRequirements.includesNumbers &&
        submitRequirements.includesSpecialChars
    const submitHandler = async () => {
        if (isValid && !loading) {
            setLoading(true)
            try {
                const res = await axios.post("https://api.hero.io" + "/Users/Register", {
                    password
                })
                if (res.status === 200) {
                    setLoading(false)
                    localStorage.setItem("refreshToken", res.data.result.refreshToken)
                    setProcess("recoveryPhrase")
                }
            } catch (e: any) {
                console.log(e)
            }
        }
    }

    const handleFocus = () => {
        const processContainer = document.querySelector("#process-container")
        setTimeout(() => {
            if (processContainer) {
                processContainer.scrollIntoView({
                    behavior: "smooth",
                    block: "end"
                });
            }
        }, 300);
    };

    return <div className={"flex justify-between sm:pb-0 pb-8 flex-col h-full"}>
        <div className={"sm:mt-8 my-auto"}>
            <div className="w-full">
                <h2 className="w-fit font-bold text-[24px] mx-auto">
                    Create a main password
                </h2>
                <p
                    className="w-fit text-center mt-4 text-[14px] text-[#686D74]"
                >
                    Choose a strong password to secure your new Wallet. Pay extra
                    attention to remembering it! For security reasons the main password
                    cannot be recovered later.
                </p>
            </div>
            <div className="mt-[24px] sm:mt-[48px]">
                <div className="flex flex-col gap-2">
                    <label htmlFor="*" className="text-[14px] font-medium px-2">
                        Enter new password
                    </label>
                    <div className="rounded-[48px] border-[1px] flex relative">
                        <input
                            value={password}
                            onFocus={handleFocus}
                            onChange={(e) => passwordInputChangeHandler(e.target.value)}
                            placeholder="Minimum of 10 characters"
                            type={hidePassword ? 'password' : 'text'}
                            className="pl-4 bg-[#F8F9FB] w-full rounded-[48px] placeholder:text-[13px] placeholder:text-[#686D74] h-[50px] outline-1 outline-wallet-green focus:border-green-500"
                        />
                        <img
                            width={22}
                            height={18}
                            onClick={() => setHidePassword(!hidePassword)}
                            src={"/svg/createPass/eye.svg"}
                            style={{transition: 'opacity .3s ease-in-out'}}
                            className="right-0 w-[54px] h-[18px] top-1/3 opacity-60 hover:opacity-100 px-4 absolute cursor-pointer"
                            alt="eye"
                        />
                    </div>

                    <p className="text-[13px] leading-5 text-[#686D74] px-[6px]">
                        *Strong passwords are <span
                        className={`${submitRequirements.includesTenChars ? 'text-wallet-green' : ''}`}>10 characters or more</span>,
                        and&nbsp;
                        <span className={`${submitRequirements.includesSpecialChars ? 'text-wallet-green' : ''}`}>include special characters</span>
                        &nbsp;and&nbsp;<span
                        className={`${submitRequirements.includesNumbers ? 'text-wallet-green' : ''}`}> numbers.</span>
                    </p>
                </div>
                <div className="mt-6 flex flex-col gap-2">
                    <label htmlFor="*" className="text-[14px] font-medium px-2">
                        Re-enter new password
                    </label>
                    <div className="rounded-[48px] bg-[#F8F9FB] border-[1px] flex relative">
                        <input
                            value={reEnteredPassword}
                            onFocus={handleFocus}
                            onChange={(e) => setReEnteredPassword(e.target.value)}
                            placeholder="Re-enter your set password"
                            type={hideReEnteredPassword ? 'password' : 'text'}
                            className="pl-4 bg-[#F8F9FB] w-full placeholder:text-[13px] placeholder:text-[#686D74] rounded-[48px] outline-1 outline-wallet-green  h-[50px]"
                        />
                        <img
                            width={22}
                            height={18}
                            onClick={() => setHideReEnteredPassword(!hideReEnteredPassword)}
                            src={"/svg/createPass/eye.svg"}
                            style={{transition: 'opacity .3s ease-in-out'}}
                            className="right-0 w-[54px] h-[18px] top-1/3 opacity-60 hover:opacity-100 px-4 absolute cursor-pointer"
                            alt="eye"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div
            className="sm:mt-[48px]  h-fit sm:flex sm:gap-12 sm:justify-between"
        >
            <button
                onClick={() => setProcess("welcome")}
                style={{transition: "background-color ease-in-out .3s"}}
                className="hidden hover:bg-[#282835] sm:grid bg-[#242431]  rounded-[48px] w-full py-3 text-white  text-center"
            >
                Back
            </button>
            <button
                onClick={submitHandler}
                style={{transition: "opacity ease-in-out .3s,background-color ease-in-out .3s"}}
                disabled={!isValid}
                className={`hidden submit-button relative overflow-hidden sm:grid place-content-center min-h-[48px]  ${isValid ? 'opacity-100 bg-wallet-green text-[#242431] hover:bg-[#21C58A]' : 'opacity-60 bg-wallet-disable-background text-wallet-disable-text cursor-not-allowed'}  rounded-[48px] w-full py-3  text-center`}
            >
                <svg
                    style={{transition: "transform ease-in-out .3s"}}
                    className={`absolute ${loading ? "-translate-y-1/2" : 'translate-y-[100px]'} top-1/2 left-1/2 transform -translate-x-1/2`}
                    xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 24 24">
                    <path fill="currentColor"
                          d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                          opacity="0.25"/>
                    <path fill="currentColor"
                          d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z">
                        <animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite"
                                          type="rotate" values="0 12 12;360 12 12"/>
                    </path>
                </svg>
                <span
                    style={{transition: "transform ease-in-out .3s"}}
                    className={`absolute top-1/2 left-1/2 ${!loading ? "-translate-y-1/2" : 'translate-y-[-100px]'}  transform -translate-x-1/2`}>Continue</span>
            </button>
            <div className="sm:hidden flex justify-center">
                <button
                    onClick={submitHandler}
                    style={{transition: "opacity ease-in-out .3s,background-color ease-in-out .3s"}}
                    disabled={!isValid}
                    className={`grid overflow-hidden w-full place-content-center min-h-[48px] ${isValid ? 'opacity-100 hover:bg-[#21C58A] bg-wallet-green' : 'opacity-60 bg-wallet-disable-background text-wallet-disable-text cursor-not-allowed'}  sm:hidden rounded-[48px] relative  text-[#242431] text-center`}
                >
                    <svg
                        style={{transition: "transform ease-in-out .3s"}}
                        className={`absolute ${loading ? "-translate-y-1/2" : 'translate-y-[100px]'} top-1/2 left-1/2 transform -translate-x-1/2`}
                        xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 24 24">
                        <path fill="currentColor"
                              d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                              opacity="0.25"/>
                        <path fill="currentColor"
                              d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z">
                            <animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite"
                                              type="rotate" values="0 12 12;360 12 12"/>
                        </path>
                    </svg>
                    <span
                        style={{transition: "transform ease-in-out .3s"}}
                        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 ${!loading ? "-translate-y-1/2" : 'translate-y-[-100px]'}`}>Continue</span>
                </button>
            </div>
        </div>
    </div>
}