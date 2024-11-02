import {WalletBalanceCardTitles} from "./WalletBalanceCardTitles/WalletBalanceCardTitles.tsx";
import {WalletBalanceCardActions} from "./WalletBalanceCardActions/WalletBalanceCardActions.tsx";


export const WalletBalanceCard = () => {
    return <>
        <div
            className="w-full md:h-[186px] rounded-xl bg-[#1B65FF] px-4 sm:px-9 py-4 sm:py-6 flex items-center"
        >
            <div className="w-full grid grid-cols-1 gap-y-4 sm:grid-cols-2">
                <WalletBalanceCardTitles/>
                <WalletBalanceCardActions/>
            </div>
        </div>
    </>
}