import React, { useState } from "react";
import { processComponentBaseArg } from "../WalletProcess";
import { RecoveryPhraseButton } from "./recoveryPhraseButton/RecoveryPhraseButton";
import { CopyToClipboardModal } from "./copyToClipboardModal/copyToClipboardModal";
import { InfoModal } from "./infoModal/infoModal";
import { useHandlePhrases } from "../../../lib/useHandlePhrases/useHandlePhrases.ts";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { ethers } from "ethers";
import BitcoinAddressGenerator from "../../../lib/useGenerateTaprootAddress/useGenerateTaprootAddress.tsx";
// import { useGenerateTaprootAddress } from "../../../lib/useGenerateTaprootAddress/useGenerateTaprootAddress.ts";
import * as bitcoin from "bitcoinjs-lib";
import * as bip39 from "bip39";
import { BIP32Factory } from "bip32";
import * as ecc from "tiny-secp256k1";
import axios from "axios";

const bip32 = BIP32Factory(ecc);
bitcoin.initEccLib(ecc);
const copiedToClipBoardVariant: Variants = {
  hidden: {
    y: 50,
    opacity: 0,
  },
  intro: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.5,
    },
  },
  outro: {
    y: 50,
    opacity: 0,
  },
};

export const RecoveryPhrase: React.FC<processComponentBaseArg> = (T) => {
  const convertMnemonicToBnbDetails = async (mnemonicPhrase: string) => {
    try {
      // Create a Mnemonic object from the string
      const mnemonic = ethers.Mnemonic.fromPhrase(mnemonicPhrase);

      // Create an HDNode wallet from the Mnemonic object
      const hdNode = ethers.HDNodeWallet.fromMnemonic(mnemonic);

      // Retrieve the BNB address, public key, and private key
      const address = hdNode.address;
      const publicKey = hdNode.publicKey;
      const privateKey = hdNode.privateKey;
      console.log("pub", publicKey);
      console.log("priv", privateKey);

      console.log("address", address);
      const seed = await bip39.mnemonicToSeed(mnemonicPhrase);
      const root = bip32.fromSeed(seed);

      // Legacy (BIP44) - m/44'/0'/0'/0/0
      const legacyPath = "m/44'/0'/0'/0/0";
      const legacyChild = root.derivePath(legacyPath);
      const legacy: any = bitcoin.payments.p2pkh({
        pubkey: legacyChild.publicKey,
        network: bitcoin.networks.bitcoin,
      });

      // SegWit (BIP84) - m/84'/0'/0'/0/0
      const segwitPath = "m/84'/0'/0'/0/0";
      const segwitChild = root.derivePath(segwitPath);
      const segwit: any = bitcoin.payments.p2wpkh({
        pubkey: segwitChild.publicKey,
        network: bitcoin.networks.bitcoin,
      });

      // Taproot (BIP86) - m/86'/0'/0'/0/0
      const taprootPath = "m/86'/0'/0'/0/0";
      const taprootChild = root.derivePath(taprootPath);
      const taproot: any = bitcoin.payments.p2tr({
        internalPubkey: taprootChild.publicKey.slice(1, 33),
        network: bitcoin.networks.bitcoin,
      });
      const pubKeyArrayTapRoot = new Uint8Array(taproot.internalPubkey);

      const pubKeyTapRootBuffer = Buffer.from(pubKeyArrayTapRoot);

      const pubKeyTapRootHex = pubKeyTapRootBuffer.toString("hex");

      const pubKeyArraySegwit = new Uint8Array(segwit.pubkey);

      const pubKeyTapSegwitBuffer = Buffer.from(pubKeyArraySegwit);

      const pubKeyTapSegwitHex = pubKeyTapSegwitBuffer.toString("hex");

      //legecy
      const pubKeyArrayLegacy = new Uint8Array(legacy.pubkey);

      const pubKeyTapLegacyBuffer = Buffer.from(pubKeyArrayLegacy);

      const pubKeyTapLegacyHex = pubKeyTapLegacyBuffer.toString("hex");

      const payload = {
        CurrencyId: 149,
        NetworkType: 2,
        Token: localStorage.getItem("refreshToken"),
        WalletType: 1,
        WalletName: "test",
        RegisterMode: 2,
        WalletAccounts: [
          // {
          //   Address: "",
          //   PublicKey:
          //     "12D1CD786C4BBEF262BB624D71C71FEC17B0AFD32481F9351F5080784B08283D",
          //   AddressType: 1,
          //   ContractAddress: "HBAR",
          // },
          {
            Address: address,
            PublicKey: publicKey,
            AddressType: 2,
            ContractAddress: "BNB",
          },
          // {
          //   Address: "0xfe9A29fbD39658CAF5CC24925bc8e62459087b88",
          //   PublicKey:
          //     "0x03ddd9955adf25afd5b780836d5dbb545952a6fac74a858de5bd495a12c089168a",
          //   AddressType: 2,
          //   ContractAddress: "MATIC",
          // },
          {
            Address: address,
            PublicKey: publicKey,
            AddressType: 2,
            ContractAddress: "ETH",
          },
          {
            Address: taproot?.address,
            PublicKey: pubKeyTapRootHex,
            AddressType: 5,
            ContractAddress: "BTCT",
          },
          {
            Address: legacy.address,
            PublicKey: pubKeyTapLegacyHex,
            AddressType: 3,
            ContractAddress: "BTCL",
          },
          {
            Address: segwit.address,
            PublicKey: pubKeyTapSegwitHex,
            AddressType: 4,
            ContractAddress: "BTCS",
          },
        ],
        WalletOption: 12,
        CurrentWallet: null,
      };
      console.log("payload", payload);
      axios.post("https://api.hero.io/Account/CreateWallet", payload, {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      });
      return {
        address,
        publicKey,
        privateKey,
      };
    } catch (error) {
      console.error("Error converting mnemonic:", error);
      throw new Error("Invalid mnemonic or unable to convert.");
    }
  };
  const { selectedPhraseCount, setSelectedPhraseCount, phrases } =
    useHandlePhrases();

  // opening state of clipboard modal
  const [clipboardModal, setClipboardModal] = useState(false);

  // opening state of info modal
  const [infoModal, setInfoModal] = useState(false);

  // copied to clipboard text
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  return (
    <>
      <div className="flex items-center h-screen w-full justify-center">
        <div className="w-full h-full md:w-fit md:min-w-[530px] md:h-fit container-board md:bg-white rounded-[12px]  p-6">
          <div className="w-full h-full flex flex-col items-center justify-between md:justify-center">
            <div className="w-full flex justify-between items-center">
              <button onClick={() => T.setProcess("password")}>
                <img
                  width={9}
                  height={14}
                  src={"/svg/global/arrow-left.svg"}
                  alt=""
                  className="cursor-pointer md:hidden"
                />
              </button>
              <div className="flex items-center justify-center gap-4 *:h-[9px] *:w-[9px]">
                <div
                  onClick={() => T.setProcess("welcome")}
                  className="circle cursor-pointer rounded-full bg-[#1B65FF] sm:bg-[#24D998]"
                ></div>
                <div
                  onClick={() => T.setProcess("password")}
                  className="circle cursor-pointer rounded-full bg-[#1B65FF] sm:bg-[#24D998]"
                ></div>
                <div className="circle rounded-full bg-[#1B65FF] sm:bg-[#24D998]"></div>
                <div className="circle rounded-full  bg-[#BDC7D3]"></div>
              </div>
              <span
                onClick={() => setInfoModal(true)}
                style={{
                  transition: "opacity ease-in-out .3s",
                }}
                className="opacity-60 hover:opacity-100 cursor-pointer font-medium text-xl text-[#686D74]"
              >
                ?
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 pt-12 pb-8">
              <h2 className="text-2xl font-bold text-center leading-[30px]">
                Back up your Secret
                <br className="pt-2" />
                Recovery Phrase
              </h2>
              <p className="text-[12px] md:text-[14px]  font-normal text-[#686D74] text-center hidden md:block">
                Remember that Hero cannot access your <br />
                Secret Recovery Phrase. It’s for your eyes only, never share it
                with
                <br />
                anyone and keep it safe.
              </p>
              <p className="text-[12px] md:text-[14px]  font-normal text-[#686D74] text-center  md:hidden">
                Remember that Hero cannot access your <br />
                Secret Recovery Phrase. It’s for your eyes only,
                <br /> never share it with anyone and keep it safe.
              </p>
            </div>
            <div className="grid palce-items-center gap-4 grid-cols-3 md:gap-5 text-[12px] md:text-[14px]">
              {[12, 15, 24].map((number) => {
                return (
                  <RecoveryPhraseButton
                    key={number}
                    checked={{
                      badge: selectedPhraseCount === number,
                      border: selectedPhraseCount === number,
                    }}
                    setSelectedPhraseCount={setSelectedPhraseCount}
                    text={`${number}`}
                  />
                );
              })}
            </div>
            <div className="md:block grid gap-4">
              <div className="grid palce-items-center gap-4 grid-cols-3 md:gap-5 pt-12 text-[12px] md:text-[14px]">
                {phrases[`${selectedPhraseCount}`].length > 0
                  ? phrases[`${selectedPhraseCount}`].map((phrase, i) => {
                      return (
                        <RecoveryPhraseButton
                          text={phrase}
                          key={phrase + i}
                          number={i + 1}
                        />
                      );
                    })
                  : Array(12)
                      .fill("loading")
                      .map((phrase, i) => {
                        return (
                          <RecoveryPhraseButton
                            key={i}
                            number={i + 1}
                            loading={true}
                            text={phrase}
                          />
                        );
                      })}
              </div>
            </div>
            <div className={"relative"}>
              <button
                onClick={() => setClipboardModal(true)}
                className="text-[#686D74] underline text-[12px] flex justify-center mb-12 mt-3 md:mt-5 md:text-[14px]"
              >
                Copy to clipboard
              </button>
              <AnimatePresence>
                {copiedToClipboard && (
                  <motion.div
                    variants={copiedToClipBoardVariant}
                    animate={"intro"}
                    initial={"hidden"}
                    exit={"outro"}
                    transition={{
                      duration: 0.7,
                      type: "spring",
                      ease: "easeInOut",
                    }}
                    className={
                      "absolute  top-[15%] md:top-[20px] -left-1/2 md:left-[-32%] bg-wallet-green shadow-lg min-w-[200px] text-white rounded text-center p-2 w-fit"
                    }
                  >
                    Copied to clipboard
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="w-full flex flex-col pb-3 items-center gap-7 md:gap-12">
              <div className="w-full flex flex-col-reverse sm:flex-row items-center justify-between gap-7">
                <button
                  onClick={() => T.setProcess("password")}
                  className="text-nowrap text-center w-full first-line:text-white duration-300 bg-[#242431] hover:bg-[#282835] rounded-[40px] py-3 text-base font-normal peer-checked:hidden md:block hidden"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    convertMnemonicToBnbDetails(
                      "glide refuse program laugh snack angle ready swear foot script fitness praise"
                    );
                    // useGenerateTaprootAddress()
                  }}
                  className="text-nowrap text-center w-full duration-300 bg-[#24D998] hover:bg-[#21C58A] rounded-[40px] py-3 text-base font-normal peer-checked:hidden"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
          <BitcoinAddressGenerator />
        </div>
      </div>
      <CopyToClipboardModal
        setCopiedToClipboard={setCopiedToClipboard}
        setClipboardModal={setClipboardModal}
        clipboardModal={clipboardModal}
        phrases={phrases[`${selectedPhraseCount}`]}
      />
      <InfoModal infoModal={infoModal} setInfoModal={setInfoModal} />
    </>
  );
};
