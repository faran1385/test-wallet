import {WalletHeader} from "../../components/ui/Wallet/WalletHeader/WalletHeader.tsx";
import {MobileWalletNavigation} from "../../components/ui/Wallet/MobileWalletNavigation/MobileWalletNavigation.tsx";
import {Outlet, useLocation} from "react-router";

export const WalletLayout = () => {
    const {pathname} = useLocation();

    return <div className={"w-full h-dvh flex flex-col"}>
        <WalletHeader
            additionalClasses={`${pathname.includes('manage-assets') ? 'hidden sm:block' : ''}`}
        />
        <Outlet/>
        <MobileWalletNavigation
            additionalClasses={`${pathname.includes('manage-assets') ? 'hidden' : ''}`}
        />
    </div>
}