export const WalletBalanceCardTitles = () => {
    return <>
        <div className="flex flex-col *:text-white">
            <p className="text-sm hidden sm:block">My Available Balance</p>
            <div className="flex gap-2 sm:hidden">
                <span className="text-sm">Balance</span>
                <div className="p-1 rounded-full bg-[#ECA633] flex items-center">
                    <img src="/svg/home/circle-warn.svg" alt=""/>
                    <span className="text-[10px] font-semibold ml-1"
                    >Pending balance</span
                    >
                </div>
            </div>
            <div className="flex items-center gap-3">
                <h4 className="text-[32px] font-bold">$12,42100</h4>
                <img src="/svg/global/show.svg" alt=""/>
            </div>
            <div className="hidden sm:flex items-center gap-1 mt-3">
                <img src="/svg/global/up-solid.svg" alt=""/>
                <span className="text-[#24D998] text-xs font-semibold"
                >+75.7% (24h)</span
                >
            </div>
        </div>
    </>
}