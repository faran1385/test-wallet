import {Currency} from "./Currency/Currency.tsx";
import {useAtom} from "jotai/index";
import {processAtom, selectedCurrencyAtom} from "../../../lib/Atom/walletProcess/walletProcess.ts";
import {handleFocus} from "../../../lib/globalHelpers/globalHelpers.ts";
import {
    currencyListAtom,
    userMnemonic,
} from "../../../lib/Atom/walletProcess/walletProcess.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import {ethers} from "ethers";
import * as bitcoin from "bitcoinjs-lib";
import * as bip39 from "bip39";
import {BIP32Factory} from "bip32";
import * as ecc from "tiny-secp256k1";
import { useNavigate } from "react-router";
const pattern = /[a-zA-Z]/;
const bip32 = BIP32Factory(ecc);
bitcoin.initEccLib(ecc);
export const ChooseName = () => {
    const [_mnemonic] = useAtom(userMnemonic);
    const [loading, setLoading] = useState(false)
    const [walletName, setWalletName] = useState("");
  const navigator = useNavigate();  


    const convertMnemonicToBnbDetails = async (mnemonicPhrase: string) => {
        setLoading(true)
        try {
            // Create a Mnemonic object from the string
            const mnemonic = ethers.Mnemonic.fromPhrase(mnemonicPhrase);

            // Create an HDNode wallet from the Mnemonic object
            const hdNode = ethers.HDNodeWallet.fromMnemonic(mnemonic);

            // Retrieve the BNB address, public key, and private key
            const address = hdNode.address;
            const publicKey = hdNode.publicKey;
            // const privateKey = hdNode.privateKey;
            // console.log("pub", publicKey);
            // console.log("priv", privateKey);

            // console.log("address", address);
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
                CurrencyId: selectedCurrency,
                NetworkType: 2,
                Token: localStorage.getItem("refreshToken"),
                WalletType: 1,
                WalletName: walletName,
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
            axios
                .post("https://api.hero.io/Account/CreateWallet", payload, {
                    headers: {
                        Authorization: localStorage.getItem("jwtToken"),
                    },
                })
                .then((res: any) => {
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
                            setLoading(false)
                            setProcess("waiting");
                            console.log("res", res);
                            // const balancePayload = {
                            //     NetworkType: "testnet",
                            //     Blockchain: "Holesky",
                            //     ContractId: "ETH",
                            //     Address: address,
                            //     WalletId: localStorage.getItem("walletId"),
                            //     ApiId: "ethereum",
                            // };
                            // axios?.post(
                            //     "https://api.hero.io/account/GetTotalBalance",
                            //     balancePayload,
                            //     {
                            //         headers: {
                            //             Authorization: localStorage.getItem("jwtToken"),
                            //         },
                            //     }
                            // );

                            // const nftPayload = [
                            //     {
                            //         NetworkType: "testnet",
                            //         Blockchain: "BSC",
                            //         Address: address,
                            //     },
                            //     {
                            //         NetworkType: "testnet",
                            //         Blockchain: "Mumbai",
                            //         Address: address,
                            //     },
                            //     {
                            //         NetworkType: "testnet",
                            //         Blockchain: "Holesky",
                            //         Address: address,
                            //     },
                            //     {
                            //         NetworkType: "testnet",
                            //         Blockchain: "BitCoin",
                            //         Address: taproot?.address,
                            //     },
                            //     {
                            //         NetworkType: "testnet",
                            //         Blockchain: "BitCoin",
                            //         Address: segwit?.address,
                            //     },
                            //     {
                            //         NetworkType: "testnet",
                            //         Blockchain: "BitCoin",
                            //         Address: legacy?.address,
                            //     },
                            // ];
                            // axios
                            //     .post("https://api.hero.io/NFTs/GetNFTsByWallet", nftPayload, {
                            //         headers: {
                            //             Authorization: localStorage.getItem("jwtToken"),
                            //         },
                            //     })
                            //     .then((res) => {
                            //         console.log("res"), res;
                            //     })
                            //     .catch((err: any) => {
                            //         console.log("err", err);
                            //     });
                            navigator('/test')
                        })
                        .catch((err: any) => {
                            console.log("err", err);
                            setLoading(false)
                        });
                })
                .catch((err: any) => {
                    console.log("err", err);
                    setLoading(false)
                });
        } catch (error) {
            setLoading(false)
            console.error("Error converting mnemonic:", error);
            throw new Error("Invalid mnemonic or unable to convert.");
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_process, setProcess] = useAtom(processAtom);

    const [selectedCurrency, setSelectedCurrency] = useAtom(selectedCurrencyAtom);
    const [, _setCurrencyList] = useAtom(currencyListAtom);

    const [inputIsValid, setInputIsValid] = useState(false);

    const changeHandler = (target: HTMLInputElement) => {
        setWalletName(target.value);

        if (
            target.value.trim().length > 2 &&
            target.value.trim().length < 15 &&
            pattern.test(target.value)
        ) {
            setInputIsValid(true);
        } else {
            setInputIsValid(false);
        }
    };

    const getCurrencies = async () => {
        axios
            .get("https://api.hero.io/Currencies/GetCurrencies")
            .then((res: any) => {
                _setCurrencyList(res?.data?.result);
                setSelectedCurrency(
                    res?.data?.result?.find((i: any) => i?.name == "US Dollar")?.id
                );
            })
            .catch((err: any) => {
                console.log("err", err);
            });
    };
    useEffect(() => {
        getCurrencies();
    }, []);


    return <>
        <div className="w-full h-full sm:pb-0 pb-8 flex flex-col items-center">
            <div className={"sm:mt-8 my-auto"}>
                <div className="flex flex-col items-center justify-center gap-3">
                    <h2 className="text-2xl font-bold text-center leading-[30px]">
                        Hero Wallet
                    </h2>
                    <p className="text-[14px]  font-normal text-[#686D74] text-center">
                        Choose a name for your new wallet, and a default currency in which you want to see your wallet
                        balance.
                    </p>
                    <div className="flex w-full mt-6 flex-col gap-2">
                        <label htmlFor="*" className="text-[14px] font-medium px-2">
                            Name your new wallet
                        </label>
                        <div
                            style={{transition: "border-color .3s ease-in-out"}}
                            className={`rounded-[48px] border-[1px] ${inputIsValid ? 'border-wallet-green' : ''} flex relative `}>
                            <input
                                onFocus={handleFocus}
                                onChange={(e) => changeHandler(e.target)}
                                placeholder="Wallet Name"
                                type={'text'}
                                className="pl-4 bg-[#F8F9FB] w-full rounded-[48px] placeholder:text-[13px] placeholder:text-[#686D74] h-[50px] outline-1 outline-wallet-green"
                            />
                        </div>
                    </div>
                    <Currency/>
                </div>
            </div>

            <div className="w-full flex flex-col items-center mt-0 sm:mt-12 gap-7">
                <div className="w-full flex flex-col-reverse sm:flex-row items-center justify-between gap-12">
                    <button
                        onClick={() => setProcess("recoveryPhrase")}
                        className="text-nowrap text-center w-full first-line:text-white duration-300 bg-[#242431] hover:bg-[#282835] rounded-[40px] py-3 text-base font-normal peer-checked:hidden sm:block hidden"
                    >
                        Back
                    </button>
                    <button
                        onClick={() => {
                            convertMnemonicToBnbDetails(_mnemonic);
                            // console.log("mn", _mnemonic);
                        }}
                        style={{transition: "opacity ease-in-out .3s,background-color ease-in-out .3s"}}
                        disabled={!(selectedCurrency !== null && inputIsValid)}
                        className={`grid overflow-hidden w-full place-content-center min-h-[48px] ${selectedCurrency !== null && inputIsValid ? 'opacity-100 hover:bg-[#21C58A] bg-wallet-green' : 'opacity-60 bg-wallet-disable-background text-wallet-disable-text cursor-not-allowed'} rounded-[48px] relative  text-[#242431] text-center`}
                    >
                        <svg
                            style={{transition: "transform ease-in-out .3s"}}
                            className={`absolute ${loading ? "-translate-y-1/2" : 'translate-y-[100px]'} top-1/2 left-1/2 transform -translate-x-1/2`}
                            xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                  d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                                  opacity="0.25"/>
                            <path fill="currentColor"
                                  d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z">
                                <animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite"
                                                  type="rotate" values="0 12 12;360 12 12"/>
                            </path>
                        </svg>
                        <span
                            style={{transition: "transform ease-in-out .3s"}}
                            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 ${!loading ? "-translate-y-1/2" : 'translate-y-[-100px]'}`}>Continue</span>
                    </button>
                </div>
            </div>
        </div>
    </>
};
