import React, { useEffect, useState } from "react";
import { CurrencyContainer } from "./CurrencyContainer/CurrencyContainer.tsx";
import { handleClickOutSide } from "../../../../lib/globalHelpers/globalHelpers.ts";
import { useAtom } from "jotai";
import {
  currencyListAtom,
  selectedCurrencyAtom,
} from "../../../../lib/Atom/walletProcess/walletProcess.ts";
import "./style.css";

export const Currency: React.FC = () => {
  const [openContainer, setOpenContainer] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currencyList] = useAtom(currencyListAtom);

  // this is for currency container that if user clicks outside of container it will close
  useEffect(() => {
    handleClickOutSide(["currency-container-dont-close"], setOpenContainer);
  }, []);

  const [selectedCurrency] = useAtom(selectedCurrencyAtom);

  return (
    <div className="flex w-full mt-6 flex-col gap-2">
      <span className="text-[14px] font-medium px-2">Choose your default currency</span>
      <div
        style={{ transition: "border-color .3s ease-in-out" }}
        className={`rounded-[48px] border-[1px] flex relative currency-container-dont-close`}
      >
        <div
          onClick={() => setOpenContainer(!openContainer)}
          className={`px-4 flex currency-container-dont-close justify-between items-center bg-[#F8F9FB]  w-full rounded-[48px] h-[50px] ${
            currencyList.length > 0 ? "" : "pointer-events-none"
          } cursor-pointer`}
        >
          {currencyList?.length > 0 ? (
            <>
              <span
                className={
                  "text-[14px] currency-container-dont-close text-wallet-disable-text"
                }
              >
                {currencyList?.find((i: any) => i?.id == selectedCurrency)
                  ?.name ??
                  currencyList?.find((i: any) => i?.name == "US Dollar")
                    ?.name}{" "}
                -{" "}
                {currencyList?.find((i: any) => i?.id == selectedCurrency)
                  ?.code ??
                  currencyList?.find((i: any) => i?.name == "US Dollar")
                    ?.code}{" "}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="currency-container-dont-close text-wallet-disable-text"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  strokeWidth={1}
                  className={"currency-container-dont-close"}
                  stroke={"currentColor"}
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                />
              </svg>
            </>
          ) : (
            <>
              <div
                className={
                  "flex space-x-2 currency-loading-container justify-center w-full"
                }
              >
                <span className={"bg-wallet-disable-background"}></span>
                <span className={"bg-wallet-disable-background"}></span>
                <span className={"bg-wallet-disable-background"}></span>
              </div>
            </>
          )}
        </div>
        <CurrencyContainer
          openContainer={openContainer}
          currencies={currencyList}
        />
      </div>
    </div>
  );
};
