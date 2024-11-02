import {WalletBalanceCard} from "./WalletBalanceCard/WalletBalanceCard.tsx";
import {WalletTabs} from "./WalletTabs/WalletTabs.tsx";
import {PromoCard} from "./PromoCard/PromoCard.tsx";
import {Assets} from "./Assets/Assets.tsx";

export const Wallet = () => {
    return <>
        <main className="w-[90%] sm:max-w-[1024px] mx-auto flex flex-col mt-5 px-0 pb-4">
            <WalletBalanceCard/>
            <WalletTabs/>
            <PromoCard/>
            <Assets/>
        </main>
    </>
}