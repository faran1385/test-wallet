import {SendQRCodeReader} from "../SendQRCodeReader/SendQRCodeReader.tsx";
import {useState} from "react";
import {useAtom} from "jotai/index";
import {emailInputAtom} from "../../../lib/Atom/WalletSend/WalletSend.ts";

export const SendEmailInput = () => {
    const [isScannerOpen, setScannerOpen] = useState(false)
    const [emailInput, setEmailInput] = useAtom(emailInputAtom)

    return <>
        <SendQRCodeReader
            isScannerOpen={isScannerOpen}
            setScannerOpen={setScannerOpen}
        />
        <div className="w-full flex flex-col gap-2">
            <label htmlFor="s-1222" className="text-xs font-medium cursor-pointer"
            >Address or Domain Name</label
            >
            <div
                className="bg-[#F8F9FB] h-14 border border-[#D3D9E2] rounded-full flex items-center gap-3 justify-between pl-4 pr-6 focus-within:border-[#24D998]"
            >
                <input
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.currentTarget.value)}
                    type="text"
                    placeholder="Search or Enter"
                    className="peer send-email-input h-full w-full bg-transparent border-none focus:outline-none text-[#4F5459] placeholder:text-sm text-sm"
                    name="s-1222"
                />
                <button onClick={() => setScannerOpen(true)}>
                    <svg
                        className={"opacity-60 hover:opacity-100 transition-opacity duration-300 ease-in-out"}
                        width="24"
                        height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M17 22V20H20V17H22V20.5C22 20.9 21.8 21.2 21.5 21.5C21.2 21.8 20.8 22 20.5 22H17ZM7 22H3.5C3.1 22 2.8 21.8 2.5 21.5C2.2 21.2 2 20.8 2 20.5V17H4V20H7V22ZM17 2H20.5C20.9 2 21.2 2.2 21.5 2.5C21.8 2.8 22 3.1 22 3.5V7H20V4H17V2ZM7 2V4H4V7H2V3.5C2 3.1 2.2 2.8 2.5 2.5C2.8 2.2 3.1 2 3.5 2H7ZM19 11H5V13H19V11Z"
                            fill="#ACB5C0"/>
                    </svg>
                </button>
            </div>
        </div>
    </>
}