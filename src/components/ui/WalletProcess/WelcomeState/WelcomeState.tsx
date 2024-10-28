import React, {useState} from "react";
import {processComponentBaseArg} from "../WalletProcess";


export const WelcomeState:React.FC<processComponentBaseArg> = (T) => {
    // agreement checkbox
    const [isChecked, setChecked] = useState(false)

    return <div className="flex items-center h-screen w-full justify-center">
        <div
            className="w-full h-full md:w-fit md:min-w-[530px] md:h-fit container-board md:bg-white rounded-xl p-6"
        >
            <div
                className="w-full h-full flex flex-col items-center justify-between md:justify-center gap-y-12"
            >
                <div
                    className="w-full flex justify-between md:justify-center items-center"
                >
                    <img
                        src={"/svg/global/arrow-left.svg"}
                        alt=""
                        className="cursor-pointer md:hidden"
                    />
                    <div
                        className="flex mx-auto items-center justify-center gap-4 *:h-[9px] *:w-[9px]"
                    >
                        <div className="circle rounded-full bg-[#1B65FF] sm:bg-[#24D998]"></div>
                        <div className="circle rounded-full bg-[#BDC7D3]"></div>
                        <div className="circle rounded-full bg-[#BDC7D3]"></div>
                        <div className="circle rounded-full bg-[#BDC7D3]"></div>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-3">
                    <img
                        src={"/imgs/Fly.png"}
                        width={248}
                        height={160}
                        alt="Hero fly"
                        className=""
                    />
                    <h2 className="text-2xl font-bold text-center">Welcome</h2>

                    <p className="text-sm font-normal text-[#686D74] text-center">
                        In the next steps, you’ll be able to create <br/>
                        your own self-custody wallet or import an existing one.
                    </p>
                </div>

                <div className="w-full flex flex-col items-center gap-7 md:gap-12">
                    <label
                        htmlFor="checkbox"
                        className="flex items-center gap-x-2 cursor-pointer"
                    >
                        <input
                            type="checkbox"
                            id="checkbox"
                            onClick={() => setChecked(!isChecked)}
                            className="peer text-xl h-[20px] w-[20px] checked:ring-2 accept-ra ring-[#1B65FF30] cursor-pointer"
                        />

                        <span className="text-sm text-[#686D74] font-normal select-none"
                        >I agree to the wallet<span className="font-bold text-black ml-1">Terms of Use</span></span>
                    </label>

                    <div
                        className="w-full flex flex-col-reverse sm:flex-row items-center justify-between gap-5"
                    >
                        <button
                            disabled={!isChecked}
                            className={`${isChecked ? 'opacity-100' : 'opacity-60 cursor-not-allowed'} text-center text-nowrap w-full first-line:text-white duration-300 bg-[#242431] hover:bg-[#282835] rounded-[40px] py-3 text-base font-normal peer-checked:hidden`}
                        >
                            Retrieve existing account
                        </button>
                        <button
                            onClick={()=>T.setProcess("password")}
                            disabled={!isChecked}
                            className={`${isChecked ? 'opacity-100' : 'opacity-60 cursor-not-allowed'} text-[#151523] text-center text-nowrap w-full duration-300 bg-[#24D998] hover:bg-[#21C58A] rounded-[40px] py-3 text-base font-normal peer-checked:hidden`}
                        >
                            Generate new wallet
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}