export const WalletBalanceCardTitles = () => {
    return <>
        <div className={"pe-4"}>
            <div className={"flex gap-y-2 flex-wrap items-center"}>
                <h3 className={"font-light hidden sm:block text-base text-white pe-4"}>My Available Balance</h3>
                <h3 className={"font-light sm:hidden text-[18px] text-white pe-4"}>Balance</h3>
                <div
                    className={"flex text-[14px] space-x-2 items-center px-3 py-[2px] rounded-xl text-wallet-blue font-normal bg-[#ECA633]"}>
                    <svg width={14} height={14} className={"mt-[1.5px]"} viewBox={'0 0 24 24'}>
                        <circle className={"fill-wallet-blue"} cx={12} cy={12} r={12}/>
                        <rect fill={"#ECA633"} x={4.5} y={10} width={15} height={4}/>
                    </svg>
                    <span className={"font-bold"}>Pending  balance</span>
                </div>
            </div>
            <div className={"flex items-center"}>
                <h1 className={"text-3xl font-bold mt-4 text-white"}>$12,42100</h1>
                <svg className={'mt-[18px] ms-2'} width="24" height="24" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M14 12C12.905 12 12 11.095 12 10C12 9.646 12.103 9.317 12.268 9.027C12.178 9.02 12.092 9 12 9C11.206 9.00524 10.4459 9.32299 9.88447 9.88447C9.32299 10.4459 9.00524 11.206 9 12C9 13.642 10.358 15 12 15C13.641 15 15 13.642 15 12C15 11.908 14.98 11.822 14.973 11.732C14.683 11.897 14.354 12 14 12Z"
                        fill="white"/>
                    <path
                        d="M11.9998 5C4.3668 5 2.0728 11.617 2.0518 11.684L1.9458 12L2.0508 12.316C2.0728 12.383 4.3668 19 11.9998 19C19.6328 19 21.9268 12.383 21.9478 12.316L22.0538 12L21.9488 11.684C21.9268 11.617 19.6328 5 11.9998 5ZM11.9998 17C6.6488 17 4.5758 13.154 4.0738 12C4.5778 10.842 6.6518 7 11.9998 7C17.3508 7 19.4238 10.846 19.9258 12C19.4218 13.158 17.3478 17 11.9998 17Z"
                        fill="white"/>
                </svg>
            </div>
            <div className={"flex items-center space-x-2 mt-4 text-wallet-green"}>
                <svg className={"mt-1"} width="12" height="12" viewBox="0 0 12 12" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.625 2L11.25 8H0L5.625 2Z" fill="#24D998"/>
                </svg>
                <span>+75.7% (24h)</span>
            </div>
        </div>
    </>
}