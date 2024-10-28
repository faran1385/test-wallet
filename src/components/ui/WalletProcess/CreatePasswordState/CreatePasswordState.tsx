import React, {useState} from "react";
import {processComponentBaseArg} from "../WalletProcess.tsx";
import axios from "axios";


// patterns
const hasSpecialCharsPattern = /[!@#$%^&*(),.?":{}|<>]/
const hasNumbersPattern = /\d/

export const CreatePasswordState: React.FC<processComponentBaseArg> = (T) => {

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
    const passwordInputKeyUpHandler = () => {
        setSubmitRequirements({
            includesNumbers: hasNumbersPattern.test(password),
            includesTenChars: password.trim().length > 9,
            includesSpecialChars: hasSpecialCharsPattern.test(password)
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
                    T.setProcess("recoveryPhrase")
                }
            } catch (e: any) {
                console.log(e)
            }
        }
    }

    return <div className="flex md:items-center min-h-screen bg-[#EBEEF1]">
        <div
            className="max-w-[530px] p-6 rounded-[12px] mx-auto sm:bg-[#ffffff]"
        >
            <div
                className="w-full flex justify-between md:justify-center items-center"
            >
                <button onClick={() => T.setProcess("welcome")}>
                    <img
                        width={9}
                        height={14}
                        src={"/svg/global/arrow-left.svg"}
                        alt="arrow"
                        className="cursor-pointer md:hidden"
                    />
                </button>
                <div
                    className="flex mx-auto items-center justify-center gap-4 *:h-[9px] *:w-[9px]"
                >
                    <div onClick={() => T.setProcess("welcome")}
                         className="circle cursor-pointer rounded-full bg-[#1B65FF] sm:bg-[#24D998]"></div>
                    <div className="circle rounded-full bg-[#1B65FF] sm:bg-[#24D998]"></div>
                    <div className="circle rounded-full bg-[#BDC7D3]"></div>
                    <div className="circle rounded-full bg-[#BDC7D3]"></div>
                </div>
            </div>

            <div className="md:mt-[58px] mt-[110px] w-full">
                <h2 className="w-fit font-bold text-[24px] mx-auto">
                    Create a main password
                </h2>
                <p
                    className="w-fit text-center mt-4 text-[12px] sm:text-[14px] text-[#686D74]"
                >
                    Choose a strong password to secure your new Wallet. Pay extra
                    attention to remembering it! For security reasons the main password
                    cannot be recovered later.
                </p>
            </div>
            <div className="mt-[24px] sm:mt-[48px]">
                <div className="flex flex-col gap-2">
                    <label htmlFor="*" className="text-[12px] sm:font-bold px-2">
                        Enter new password
                    </label>
                    <div className="rounded-[48px] border-[1px] flex relative">
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Minimum of 10 characters"
                            type={hidePassword ? 'password' : 'text'}
                            onKeyUp={passwordInputKeyUpHandler}
                            className="pl-4 bg-[#F8F9FB] w-full rounded-[48px] placeholder:text-[14px] placeholder:text-[#686D74] sm:placeholder:font-bold h-[50px] outline-0 focus:border-green-500"
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

                    <p className="text-[10px] text-[#686D74] px-[6px]">
                        *Strong passwords are <span
                        className={`${submitRequirements.includesTenChars ? 'text-wallet-green' : ''}`}>10 characters or more</span>,
                        and&nbsp;
                        <span className={`${submitRequirements.includesSpecialChars ? 'text-wallet-green' : ''}`}>include special characters</span>
                        &nbsp;and&nbsp;<span
                        className={`${submitRequirements.includesNumbers ? 'text-wallet-green' : ''}`}> numbers.</span>
                    </p>
                </div>
                <div className="mt-4 flex flex-col gap-2">
                    <label htmlFor="*" className="text-[12px] sm:font-bold px-2">
                        Re-enter new password
                    </label>
                    <div className="rounded-[48px] bg-[#F8F9FB] border-[1px] flex relative">
                        <input
                            value={reEnteredPassword}
                            onChange={(e) => setReEnteredPassword(e.target.value)}
                            placeholder="Re-enter your set password"
                            type={hideReEnteredPassword ? 'password' : 'text'}
                            className="pl-4 bg-[#F8F9FB] w-full placeholder:text-[14px] placeholder:text-[#686D74] sm:placeholder:font-bold rounded-[48px] outline-0  h-[50px]"
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

            <div
                className="sm:mt-[48px] mt-[40%] items-end h-fit md:flex md:gap-[48px] md:justify-between"
            >
                <button
                    onClick={() => T.setProcess("welcome")}
                    style={{transition: "background-color ease-in-out .3s"}}
                    className="hidden hover:bg-[#282835] md:grid bg-[#242431]  rounded-[48px] w-full py-[14px] text-white text-4 text-center"
                >
                    Back
                </button>
                <button
                    onClick={submitHandler}
                    style={{transition: "opacity ease-in-out .3s,background-color ease-in-out .3s"}}
                    disabled={!isValid}
                    className={`hidden relative overflow-hidden sm:grid place-content-center min-h-[52px] hover:bg-[#21C58A]  ${isValid ? 'opacity-100' : 'opacity-60 cursor-not-allowed'} bg-wallet-green rounded-[48px] w-full py-[14px] text-4 text-[#242431] text-center`}
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
                <div className="md:hidden flex justify-center">
                    <button
                        onClick={submitHandler}
                        style={{transition: "opacity ease-in-out .3s,background-color ease-in-out .3s"}}
                        disabled={!isValid}
                        className={`grid relative overflow-hidden w-full place-content-center hover:bg-[#21C58A] min-h-[52px] bottom-10 ${isValid ? 'opacity-100' : 'opacity-60 cursor-not-allowed'} bg-wallet-green absolute sm:hidden rounded-[48px] w-[90%] py-[14px] text-[#242431] text-center`}
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
    </div>
}