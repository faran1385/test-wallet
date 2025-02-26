import React from "react";
import { formatNumberWithCommas } from "../../../../lib/globalHelpers/globalHelpers.ts";
import { MainAssetProps, ManageAssetProps } from "./types.ts";
import { AssetSwitcher } from "./AssetSwitcher/AssetSwitcher.tsx";
import { useFetchBalances } from "../../../../lib/useFetchBalances/useFetchBalances.ts";

export const Asset: React.FC<MainAssetProps | ManageAssetProps> = (T) => {
  const { balances } = useFetchBalances({
    walletId: localStorage.getItem("walletId"),
    NetworkType: "testnet",
    Blockchain: T.req.blockchain,
    ContractId: T.req.contaractAddress,
    Address: T.address,
    ApiId: T.req.apiId,
  },T.usage);
  if (T.usage === "manage") {
    return (
      <>
        <div
          style={{
            transition: ".3s box-shadow ease-in-out",
          }}
          className="hover:shadow-xl sm:h-[82px] px-4 py-4 sm:py-5 bg-white md:bg-[#f8f9fb] shadow-sm rounded-lg sm:relative"
        >
          <div className="w-full items-center gap-3 inline-flex">
            <div className="flex grow justify-start items-center gap-3">
              <div className="w-10 h-10 rounded-[20px] flex justify-center items-center">
                <img src={T.req?.logoUrl} alt="" />
              </div>
              <div className="flex-col justify-start sm:items-center gap-1.5 inline-">
                <div className="justify-start items-start gap-2 inline-flex">
                  <div className="text-black text-base font-medium leading-tight tracking-tight">
                    {T.req.name} {T.req.caption}
                  </div>
                  <div className="hidden sm:flex px-1.5 py-0.5 bg-[#ebeef1] rounded justify-center items-center gap-2.5">
                    <div className="text-black text-[10px] font-semibold leading-[14px] tracking-tight">
                      {T.req.blockChain}
                     
                    </div>
                  </div>
                </div>
                <div className="text-[#686d74] text-xs leading-none tracking-tight">
                  <div className="text-[#686d74] text-xs leading-none tracking-tight flex sm:gap-1">
                  {T.req.symbol}
                  </div>
                </div>
              </div>
            </div>
            <AssetSwitcher value={T.req.isActive} />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div
        style={{
          transition: ".3s box-shadow ease-in-out",
        }}
        className="hover:shadow-xl sm:h-[82px] px-4 py-4 sm:py-5 bg-white md:bg-[#f8f9fb] shadow-sm rounded-lg sm:relative"
      >
        <a
          href="../details/Asset_Details.html"
          className="w-full justify-start items-end sm:items-center gap-3 inline-flex"
        >
          <div className="flex grow justify-start items-center gap-3">
            <div className="w-10 h-10 rounded-[20px] flex justify-center items-center">
              <img src={T.req.imageUrl} alt="" />
            </div>
            <div className="flex-col justify- sm:items-center gap-1.5 inline-">
              <div className="justify- items-start gap-2 inline-flex">
                <div className="text-black text-base font-medium leading-tight tracking-tight">
                  {T.req.name}
                </div>
                <div className="hidden sm:flex px-1.5 py-0.5 bg-[#ebeef1] rounded justify-center items-center gap-2.5">
                  <div className="text-black text-[10px] font-semibold leading-[14px] tracking-tight">
                    {T.req.blockchain}
                  </div>
                </div>
              </div>
              <div className="text-[#686d74] text-xs leading-none tracking-tight">
                <div className="text-[#686d74] text-xs leading-none tracking-tight flex sm:gap-1">
                  {balances?.balances && balances?.balances[0]?.unitPrice}
                  <span className="hidden sm:inline-block">
                    {balances?.currencyName}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden sm:flex justify-start items-end gap-2">
            <div className="flex justify-between items-center gap-1.5">
              {/* <img src="/svg/global/up-solid.svg" alt="" /> */}
              <span className="text-center text-[#24d998] text-xs font-semibold font-['Plus Jakarta Sans'] leading-none tracking-tight">
                {/* {T.req.asset.profitOrLost}% */}
              </span>
            </div>
            <div className="inline-flex flex-col justify-center items-end gap-1.5">
              <span className="text-right text-black text-base font-medium leading-tight tracking-tight">
                {balances?.balances &&
                  formatNumberWithCommas(balances?.balances[0]?.balance)}
              </span>
              <span className="text-right text-[#686d74] text-xs font-normal leading-none tracking-tight">
                {balances?.balances &&
                  Number(
                    formatNumberWithCommas(balances?.balances[0]?.inUsd)
                  )?.toFixed(2)}{" "}
                {balances?.currencyName}
              </span>
            </div>
          </div>
          <div className="flex sm:hidden justify-end items-end gap-2">
            {/* <span className="text-xs">{formatNumberWithCommas(T.req.asset.count)} {T.req.name}</span> */}
          </div>
        </a>
      </div>
    </>
  );
};
