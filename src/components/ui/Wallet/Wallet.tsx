import {WalletHeader} from "./WalletHeader/WalletHeader.tsx";
import {WalletBalanceCard} from "./WalletBalanceCard/WalletBalanceCard.tsx";
import {WalletTabs} from "./WalletTabs/WalletTabs.tsx";
import {PromoCard} from "./PromoCard/PromoCard.tsx";
import {Assets} from "./Assets/Assets.tsx";
import {MobileWalletNavigation} from "./MobileWalletNavigation/MobileWalletNavigation.tsx";

export const Wallet = () => {
    return <>
        <WalletHeader/>
        <main className="w-[90%] sm:max-w-[1024px] mx-auto flex flex-col mt-5 pb-28">
            <WalletBalanceCard/>
            <WalletTabs/>
            <PromoCard/>
            <Assets/>
        </main>
        <MobileWalletNavigation/>
    </>
}