import {WalletHeader} from "./WalletHeader/WalletHeader.tsx";
import {WalletBalanceCard} from "./WalletBalanceCard/WalletBalanceCard.tsx";

export const Wallet = () => {
    return <div className={"mx-auto max-w-[1100px] w-full px-4 py-3"}>
        <WalletHeader/>
        <WalletBalanceCard/>
    </div>
}