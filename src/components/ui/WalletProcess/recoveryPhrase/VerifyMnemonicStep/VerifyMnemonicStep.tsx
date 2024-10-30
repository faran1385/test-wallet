import React, {useRef, useState} from "react";
import {recoveryProcessAtom} from "../../../../lib/Atom/walletProcess/walletProcess.ts";
import {RecoveryPhraseButton} from "../recoveryPhraseButton/RecoveryPhraseButton.tsx";
import {useAtom} from "jotai";
import {
    getRandomNumberArray,
    getThNumber,
    randomNumber,
    replaceAllItems, shuffleArray
} from "../../../../lib/globalHelpers/globalHelpers.ts";
import { ethers } from "ethers";
import * as bitcoin from "bitcoinjs-lib"; 
import * as bip39 from "bip39"; 
import { BIP32Factory } from "bip32"; 
import * as ecc from 'tiny-secp256k1';
import axios from "axios";
interface VerifyMnemonicStepProps {
    selectedPhraseCount: 12 | 15 | 24,
    phrases: {
        "12": string[],
        "15": string[],
        "24": string[]
    },
}

const bip32 = BIP32Factory(ecc); 
bitcoin.initEccLib(ecc);
export const VerifyMnemonicStep: React.FC<VerifyMnemonicStepProps> = (T) => {
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
          axios
            .post("https://api.hero.io/Account/CreateWallet", payload, {
              headers: {
                Authorization: localStorage.getItem("jwtToken"),
              },
            })
            .then((res: any) => {
              console.log("res", res);
              localStorage.setItem("walletId", res.data?.result?.walletId);
              axios
                .post(
                  "https://api.hero.io/account/GetUserWallets",
                  {
                    Token: localStorage.getItem("refreshToken"),
                  },
                  {
                    headers: {
                      Authorization: localStorage.getItem("jwtToken"),
                    },
                  }
                )
                .then((res: any) => {
                  console.log("res", res);
                  const balancePayload = {
                    NetworkType: "testnet",
                    Blockchain: "Holesky",
                    ContractId: "ETH",
                    Address: address,
                    WalletId: localStorage.getItem("walletId"),
                    ApiId: "ethereum",
                  };
                  axios?.post(
                    "https://api.hero.io/account/GetTotalBalance",
                    balancePayload,
                    {
                      headers: {
                        Authorization: localStorage.getItem("jwtToken"),
                      },
                    }
                  );
    
                  const nftPayload = [
                    {
                      NetworkType: "testnet",
                      Blockchain: "BSC",
                      Address: address,
                    },
                    {
                      NetworkType: "testnet",
                      Blockchain: "Mumbai",
                      Address: address,
                    },
                    {
                      NetworkType: "testnet",
                      Blockchain: "Holesky",
                      Address: address,
                    },
                    {
                      NetworkType: "testnet",
                      Blockchain: "BitCoin",
                      Address: taproot?.address,
                    },
                    {
                      NetworkType: "testnet",
                      Blockchain: "BitCoin",
                      Address: segwit?.address,
                    },
                    {
                      NetworkType: "testnet",
                      Blockchain: "BitCoin",
                      Address: legacy?.address,
                    },
                  ];
                  axios
                    .post("https://api.hero.io/NFTs/GetNFTsByWallet", nftPayload, {
                      headers: {
                        Authorization: localStorage.getItem("jwtToken"),
                      },
                    })
                    .then((res) => {
                      console.log("res"), res;
                    })
                    .catch((err: any) => {
                      console.log("err", err);
                    });
                })
                .catch((err: any) => {
                  console.log("err", err);
                });
            })
            .catch((err: any) => {
              console.log("err", err);
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
    const {phrases, selectedPhraseCount} = T

    const [randomIndexArray, setRandomIndexArray] = useState(getRandomNumberArray(3, T.selectedPhraseCount))

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_recoveryProcess, setRecoveryProcess] = useAtom(recoveryProcessAtom)

    const [verifyIndex, setVerifyIndex] = useState(0)

    // for indexs that were selected correctly and passed the checking
    const correctAnswers = useRef<string[]>([])

    // when the use chooses a phrase
    const chooseHandler = (selectedPhrase: string) => {
        const phrase = phrases[`${selectedPhraseCount}`][randomIndexArray[verifyIndex]]
        console.log(phrases[`${selectedPhraseCount}`], selectedPhrase)
        if (selectedPhrase === phrase && correctAnswers.current.length < 3) {
            setVerifyIndex(prevState => prevState + 1)
            correctAnswers.current.push(selectedPhrase)
        } else if (correctAnswers.current.length < 3) {
            const newRandomNumber = randomNumber(randomIndexArray, selectedPhraseCount)
            setRandomIndexArray(replaceAllItems(randomIndexArray, randomIndexArray[verifyIndex], newRandomNumber))
        }
    }


    // this tells that user is answers all tests and he/she can pass this section
    const isValid = correctAnswers.current.length === 3

    const phrasesShuffledArray = useRef(shuffleArray(phrases[`${selectedPhraseCount}`]))

    return <>
        <div className="w-full h-full sm:pb-0 pb-8 flex flex-col items-center">
            <div className={"sm:mt-8 my-auto"}>
                <div className="flex flex-col items-center justify-center gap-3">
                    <h2 className="text-2xl font-bold text-center leading-[30px]">
                        Verify your Secret<br className="pt-2"/>
                        Recovery Phrase
                    </h2>
                    <div
                        className={'grid my-2 px-4 phrases-container overflow-y-auto palce-items-center gap-4 grid-cols-3 sm:gap-5 text-[12px] sm:text-[14px]'}>
                        {randomIndexArray.map((index, i) => {
                            return <RecoveryPhraseButton
                                text={`${index + 1}`}
                                verify={i === verifyIndex ? 'about to be verified' : i < verifyIndex ? 'verified' : 'not verified'}
                                key={i}
                            />
                        })}
                    </div>
                    <p className="text-[14px]  font-normal text-[#686D74] text-center">
                        Let’s make sure you remember your phrase correctly.<br/>
                        Select your ({getThNumber(randomIndexArray[0] + 1)}) , ({getThNumber(randomIndexArray[1] + 1)})
                        &
                        ({getThNumber(randomIndexArray[2] + 1)}) words of your secret recovery phrase.
                    </p>
                </div>
                <div className="sm:block grid mt-8 gap-4">
                    <div
                        className="grid h-[189px] max-h-[189px] px-4 pt-1 phrases-container overflow-y-auto palce-items-center gap-4 grid-cols-3 sm:gap-5 text-[12px] sm:text-[14px]">
                        {phrases[`${selectedPhraseCount}`].length > 0 ? phrasesShuffledArray.current.map((phrase, i) => {
                            return <RecoveryPhraseButton
                                verifyClickHandler={chooseHandler}
                                checked={{
                                    border: correctAnswers.current.includes(phrase),
                                    badge: correctAnswers.current.includes(phrase),
                                }}
                                text={phrase}
                                key={phrase + i}
                            />
                        }) : (Array(12).fill("loading").map((phrase, i) => {
                            return <RecoveryPhraseButton key={i} loading={true} text={phrase}/>
                        }))}
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col items-center sm:mt-12 gap-7">
                <div className="w-full flex flex-col-reverse sm:flex-row items-center justify-between gap-12">
                    <button
                        onClick={() => setRecoveryProcess("displayMnemonicWords")}
                        className="text-nowrap text-center w-full first-line:text-white duration-300 bg-[#242431] hover:bg-[#282835] rounded-[40px] py-3 text-base font-normal peer-checked:hidden sm:block hidden">
                        Back
                    </button>
                    <button
                    onClick={()=>{
                        convertMnemonicToBnbDetails('glide refuse program laugh snack angle ready swear foot script fitness praise')
                    }}
                        className={`text-nowrap text-center w-full duration-300 ${isValid ? 'bg-[#24D998] hover:bg-[#21C58A]' : 'bg-wallet-disable-background text-wallet-disable-text opacity-60 cursor-not-allowed'}  rounded-[40px] py-3 text-base font-normal peer-checked:hidden`}>
                        Continue
                    </button>
                </div>
            </div>
        </div>
    </>
}