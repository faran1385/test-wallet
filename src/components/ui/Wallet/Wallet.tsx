import { WalletBalanceCard } from "./WalletBalanceCard/WalletBalanceCard.tsx";
import { WalletTabs } from "./WalletTabs/WalletTabs.tsx";
import { PromoCard } from "./PromoCard/PromoCard.tsx";
import { Assets } from "./Assets/Assets.tsx";
// import { useFetchBalances } from "../../lib/useFetchBalances/useFetchBalances.ts";
import { useEffect } from "react";
import { useFetchUserWallets } from "../../lib/useFetchUserWallets/useFetchUserWallets.ts";

export const Wallet = () => {
  //   const fetchData = async () => {
  //     console.log("balances assets ", balances);
  //   };
  //   useEffect(() => {
  //     fetchData();
  //   }, []);
  const { loading, walletData } = useFetchUserWallets();

  return (
    <>
      <main className="w-[90%] sm:max-w-[1024px] mx-auto flex flex-col mt-5 px-0 pb-4">
        <WalletBalanceCard />
        <WalletTabs />
        <PromoCard />
        <Assets data={walletData} loading={loading} />
      </main>
    </>
  );
};
