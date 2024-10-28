import React, {useEffect, useState} from "react";
import {createPortal} from "react-dom";

interface CopyToClipboardModalProps {
    clipboardModal: boolean,
    setClipboardModal: React.Dispatch<React.SetStateAction<boolean>>,
    phrases: string[]
}

export const CopyToClipboardModal: React.FC<CopyToClipboardModalProps> = (T) => {
    const [body, setBody] = useState<null | HTMLElement>(null);

    useEffect(() => setBody(document.body), []);

    const copyHandler = () => {
        T.setClipboardModal(false)

        // creating the text to be copied
        let text = ''
        T.phrases.forEach((phrase, i) => {
            text += (i + 1) + '-' + phrase + ' '
        })

        navigator.clipboard.writeText(text)
    }

    // adding overflow hidden to body
    useEffect(() => {
        if (T.clipboardModal) {
            document.body.classList.add("overflow-y-hidden")
        } else {
            document.body.classList.remove("overflow-y-hidden")
        }
    }, [T.clipboardModal]);

    return <>
        {body && createPortal(<div
            style={{
                transition: "opacity ease-in-out .3s",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(5px)"
            }}
            className={`w-full  fixed ${T.clipboardModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}  z-10 inset-0 h-screen sm:px-0 px-4 grid place-content-center`}>
            <div
                style={{
                    transition: "transform ease-in-out .3s",
                }}
                className={`w-full ${T.clipboardModal ? 'scale-100' : 'scale-0'} shadow-2xl h-full sm:min-w-[530px] md:h-fit container-board bg-white rounded-[12px]  p-6`}>
                <div className={"w-full flex justify-end"}>
                    <button onClick={() => T.setClipboardModal(false)}>
                        <svg className={"opacity-60 hover:opacity-100"}
                             style={{
                                 transition: "ease-in-out .3s opacity",
                             }}
                             width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M13.2929 1.41L8.05645 6.64645L7.70289 7L8.05645 7.35355L13.2929 12.59L12.59 13.2929L7.35355 8.05645L7 7.70289L6.64645 8.05645L1.41 13.2929L0.707107 12.59L5.94355 7.35355L6.29711 7L5.94355 6.64645L0.707107 1.41L1.41 0.707107L6.64645 5.94355L7 6.29711L7.35355 5.94355L12.59 0.707107L13.2929 1.41Z"
                                fill="#686D74" stroke="#686D74"/>
                        </svg>
                    </button>
                </div>
                <div className={"mt-6"}>
                    <h1 className={"text-center font-bold text-2xl"}>Do you want to copy<br
                        className={"hidden sm:block"}/> your recovery phrase? </h1>
                    <p className={"text-[14px] text-center mt-[20px] text-[#686D74]"}>
                        It is very important that you store it safely. If you<br className={"hidden sm:block"}/> lost it
                        you
                        will no longer be able to access
                        your<br className={"hidden sm:block"}/> wallet and your funds will be compromised.
                    </p>
                </div>
                <div className="w-full mt-[30px] flex flex-col-reverse sm:flex-row items-center justify-between gap-7">
                    <button
                        onClick={copyHandler}
                        className="text-nowrap text-center w-full first-line:text-white duration-300 bg-[#242431] hover:bg-[#282835] rounded-[40px] py-3 text-base font-normal block">
                        Yes, copy to clipboard
                    </button>
                    <button
                        onClick={() => T.setClipboardModal(false)}
                        className={"text-nowrap text-center w-full duration-300 bg-[#24D998] hover:bg-[#21C58A] rounded-[40px] py-3 text-base font-normal"}>
                        No, I’ll write it down
                    </button>
                </div>
            </div>
        </div>, body)}
    </>
}