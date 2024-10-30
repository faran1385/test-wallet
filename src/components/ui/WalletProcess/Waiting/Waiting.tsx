import "./style.css"
export const Waiting = () => {
    return <>
        <div className="w-full h-full sm:pb-0 pb-8 flex flex-col items-center">
            <div className={"my-auto"}>
                <div className="flex flex-col items-center justify-center gap-3">
                    <h2 className="text-2xl font-bold text-center leading-[30px]">
                        Waiting
                    </h2>
                    <p className="text-[14px]  font-normal text-[#686D74] text-center">
                        Please wait while your Wallet is suited <br className={"sm:block hidden"}/>
                        and powered up for all your heroic transactions!<br className={"sm:block hidden"}/>
                        You will automatically be redirected to your<br className={"sm:block hidden"}/>
                        dashboard once setup is complete.
                    </p>
                    <div className={"mt-4"}>
                        <svg width="60" height="60" stroke="#000" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <g className="spinner" fill={"Red"}>
                                <circle className={"stroke-wallet-green"} cx="12" cy="12" r="9.5" fill="none" strokeWidth="3"></circle>
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </>
}