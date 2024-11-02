import {WalletHeaderProfile} from "./WalletHeaderProfile/WalletHeaderProfile.tsx";
import {WalletHeaderList} from "./WalletHeaderList/WalletHeaderList.tsx";
import {WalletHeaderIcons} from "./WalletHeaderIcons/WalletHeaderIcons.tsx";

export const WalletHeader = () => {
    return <header
        className="w-[90%] sm:max-w-[1024px] mx-auto block h-16 sm:bg-white sm:border-b-[2px] sm:border-b-[#BDC7D3] rounded-xl py-4 sm:px-5 mt-3"
    >
        <div className="h-full  flex sm:grid grid-cols-3 items-center justify-between">
            <WalletHeaderProfile
                name={"Main Wallet"}
                image={"/imgs/sendReview/mainwallet.png"}
            />
            <div className={"flex justify-center"}>
                <WalletHeaderList/>
            </div>
            <div className={"flex justify-end"}>
                <WalletHeaderIcons/>
            </div>
        </div>
    </header>
}