import React, {Dispatch, SetStateAction, useRef} from "react";
import {createPortal} from "react-dom";
import {useHandleScanner} from "../../../lib/useHandleScanner/useHandleScanner.ts";

interface SendQRCodeReaderProps {
    isScannerOpen: boolean,
    setScannerOpen: Dispatch<SetStateAction<boolean>>
}

export const SendQRCodeReader: React.FC<SendQRCodeReaderProps> = (T) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const scanArea = {
        x: 140,
        y: 55,
        width: 300,
        height: 300
    };

    useHandleScanner({
        videoRef,
        canvasRef,
        scanArea,
        state: {
            setter: T.setScannerOpen,
            value: T.isScannerOpen
        },
        inputTarget: '.send-email-input'
    })


    return (
        <>
            {createPortal(<div
                style={{
                    background: "rgba(0,0,0,.4)",
                    transition: "background-color .3s ease-in-out,backdrop-filter .3s ease-in-out"
                }}
                className={`absolute  hidden sm:grid place-content-center ${T.isScannerOpen ? 'backdrop-blur-md' : 'bg-[transparent!important] pointer-events-none'} w-full h-screen top-0`}>
                <div
                    className={`${T.isScannerOpen ? 'sm:scale-100' : 'sm:scale-0'} transition-transform duration-300 ease-in-out min-w-[600px] bg-white p-4 rounded`}>
                    <div className={"flex justify-between items-center"}>
                        <h2 className={"text-center mx-auto font-bold text-2xl"}>Scan your QR Code</h2>
                        <button onClick={() => T.setScannerOpen(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                 className="opacity-60 hover:opacity-100 transition-opacity duration-300 ease-in-out"
                                 viewBox="0 0 16 16">
                                <path
                                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                            </svg>
                        </button>
                    </div>
                    <div className={"w-full relative min-h-[400px] rounded mt-8"}>
                        <video ref={videoRef} style={{display: 'none'}}/>
                        <canvas className={"w-full rounded-md"} ref={canvasRef} width={400} height={300}/>
                        <svg
                            className={"absolute text-wallet-green"}
                            style={{
                                left: `${scanArea.x}px`,
                                top: `${scanArea.y}px`,
                                width: `${scanArea.width}px`,
                                height: `${scanArea.height}px`,
                                pointerEvents: 'none'
                            }}

                            width={scanArea.width} height={scanArea.height} viewBox="0 0 328 338" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M117.127 38.9773L44.2466 40.1419C41.5728 40.1847 39.4153 42.3842 39.3734 45.1103L38.2311 119.414"
                                stroke="currentColor" strokeWidth="3"></path>
                            <path
                                d="M288.546 119.415L287.404 45.1105C287.362 42.3845 285.204 40.1849 282.53 40.1421L209.65 38.9775"
                                stroke="currentColor" strokeWidth="3"></path>
                            <path
                                d="M209.813 298.498L282.958 297.334C285.637 297.291 287.798 295.095 287.84 292.374L288.986 218.061"
                                stroke="currentColor" strokeWidth="3"></path>
                            <path
                                d="M38.3672 218.061L39.5137 292.373C39.5556 295.095 41.7169 297.291 44.3956 297.333L117.54 298.498"
                                stroke="currentColor" strokeWidth="3"></path>
                        </svg>
                    </div>
                </div>
            </div>, document.body)}
        </>
    );
};
