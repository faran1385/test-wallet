import {useEffect, useRef, useState} from "react";
import {createPortal} from "react-dom";
import {useAtom} from "jotai";
import {infoModalAtom} from "../../../../lib/Atom/walletProcess/walletProcess.ts";
import {handler} from "../../../../lib/globalHelpers/globalHelpers.ts";


export const InfoModal = () => {

    const [body, setBody] = useState<null | HTMLElement>(null);
    const [infoModal, setInfoModal] = useAtom(infoModalAtom)
    const modalContainerRef = useRef<null | HTMLDivElement>(null)
    useEffect(() => setBody(document.body), []);

    // adding overflow hidden
    useEffect(() => {
        if (infoModal) {
            document.body.classList.add("overflow-y-hidden")
        } else {
            document.body.classList.remove("overflow-y-hidden")
        }
        // css in js
        handler(modalContainerRef, infoModal)
    }, [infoModal, body]);

    // css in js
    useEffect(() => {
        const resize = () => handler(modalContainerRef, infoModal)
        window.addEventListener("resize", resize);

        return () => {
            window.removeEventListener("resize", resize);
        }
    }, [body, infoModal]);


    return <>
        {body && createPortal(<div
            style={{
                transition: "opacity ease-in-out .3s",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(5px)"
            }}
            className={`w-full fixed ${infoModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}  z-10 inset-0 h-screen flex  sm:grid sm:place-content-center`}>
            <div
                ref={modalContainerRef}
                style={{
                    transition: "transform ease-in-out .3s",
                }}
                className={`w-full ${infoModal ? 'sm:scale-100' : 'sm:scale-0 sm:translate-y-0'} shadow-2xl sm:h-full sm:w-[530px] mb-auto  bg-white rounded-t-[12px] sm:rounded-[12px]  p-6`}>
                <div className={"w-full flex justify-center sm:justify-end"}>
                    <button onClick={() => setInfoModal(false)}>
                        <svg className={"sm:block hidden opacity-60 hover:opacity-100"}
                             style={{
                                 transition: "ease-in-out .3s opacity",
                             }}
                             width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M13.2929 1.41L8.05645 6.64645L7.70289 7L8.05645 7.35355L13.2929 12.59L12.59 13.2929L7.35355 8.05645L7 7.70289L6.64645 8.05645L1.41 13.2929L0.707107 12.59L5.94355 7.35355L6.29711 7L5.94355 6.64645L0.707107 1.41L1.41 0.707107L6.64645 5.94355L7 6.29711L7.35355 5.94355L12.59 0.707107L13.2929 1.41Z"
                                fill="#686D74" stroke="#686D74"/>
                        </svg>
                    </button>
                    <span className={"w-6 block sm:hidden cursor-pointer h-[5px] rounded-2xl bg-wallet-dark"}
                          onClick={() => setInfoModal(false)}></span>
                </div>
                <div className={"mt-6"}>
                    <h1 className={"text-center font-bold text-2xl"}>Back up your Secret <br
                        className={"hidden sm:block"}/>Recovery Phrase</h1>
                    <div className={"mt-[30px] space-y-[20px] text-[14px]"}>
                        <div>
                            <h2 className={"font-[600]"}>How does the back up work?</h2>
                            <p className={"pt-1"}>To back up your wallet, you’ll need a private key: your <span
                                className={"font-bold"}>Secret Recovery Phrase</span>.
                                It’s a series
                                of 12 words which you can use to recover your wallet in case you ever need to. It’s an
                                essential security step.</p>
                        </div>
                        <div>
                            <h2 className={"font-[600]"}>What should I do with my Secret Recovery Phrase?</h2>
                            <p className={"pt-1"}>You should write it down in the exact order as it will appear on the
                                next step and store it somewhere safe. <span className={"font-bold"}>Remember to keep it to yourself</span>.
                            </p>
                        </div>
                        <div>
                            <h2 className={"font-[600]"}>Do not share it with anyone!</h2>
                            <p className={"pt-1"}>Anyone with the secret recovery phrase can access, control & empty
                                your entire wallet, do not disclose or share it with anyone.</p>
                        </div>
                        <div>
                            <h2 className={"font-[600]"}>For extra security</h2>
                            <p className={"pt-1"}>You can choose a longer, 15 or 24-word recovery phrase to strengthen
                                your wallet’s protection</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>, body)}
    </>
}