import {useAtom} from "jotai/index";
import {assetsAtom} from "../../../../lib/Atom/WalletSend/WalletSend.ts";
import {SendDropdownItem} from "./SendDropdownItem/SendDropdownItem.tsx";
import React, {SetStateAction, useEffect, useRef} from "react";
import {handleClickOutSide} from "../../../../lib/globalHelpers/globalHelpers.ts";
import "../../style.css"

interface SendDropdownProps {
    setDropdownOpen: React.Dispatch<SetStateAction<boolean>>,
    isDropdownOpen: boolean
}

export const SendDropdown = (T: SendDropdownProps) => {
    const [assets] = useAtom(assetsAtom)
    const container = useRef<null | HTMLDivElement>(null)

    // this is for send container that if user clicks outside of container it will close
    useEffect(() => {
        handleClickOutSide(["send-container-dont-close"], T.setDropdownOpen);
    }, []);


    return <div
        ref={container}
        style={{transition: "opacity .3s ease-in-out,transform .3s ease-in-out",maxHeight:'calc(100% - 100px)'}}
        className={`absolute send-asset-dropdown ${T.isDropdownOpen ? 'translate-y-0 opacity-100 ' : 'opacity-0 -translate-y-[50px] pointer-events-none'} z-[4] send-container-dont-close h-full top-[90px] overflow-y-auto cursor-default space-y-2 shadow-2xl p-3 left-[-3px] w-full bg-[#e5e7eb] rounded`}>
        {assets.map((item, i) => {
            return <SendDropdownItem {...item} key={i}/>
        })}
    </div>
}