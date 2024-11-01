import {WalletBalanceCardTitles} from "./WalletBalanceCardTitles/WalletBalanceCardTitles.tsx";
import {WalletBalanceCardActions} from "./WalletBalanceCardActions/WalletBalanceCardActions.tsx";

export const WalletBalanceCard = () => {
    return <>
        <div
            className={"relative mt-4 sm:mt-8"}>
            <img alt={''} className={"absolute h-full w-full object-cover top-0 rounded-xl"}
                 src={'/imgs/balanceCardBackground.png'}/>
            <div className={"relative z-[1] grid md:space-y-0 space-y-4 sm:space-y-8 md:grid-cols-2 items-center px-4 py-8 sm:p-8 sm:px-[60px] sm:py-[50px] w-full"}>
                <WalletBalanceCardTitles/>
                <WalletBalanceCardActions/>
            </div>
        </div>
    </>
}