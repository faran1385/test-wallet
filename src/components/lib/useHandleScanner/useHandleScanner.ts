import {Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState} from "react";
import jsQR from "jsqr";

interface useHandleScannerProps {
    videoRef: MutableRefObject<null | HTMLVideoElement>,
    canvasRef: MutableRefObject<null | HTMLCanvasElement>,
    scanArea: {
        x: number,
        y: number,
        width: number,
        height: number
    },
    state: {
        value: boolean,
        setter: Dispatch<SetStateAction<boolean>>
    },
    inputTarget?: string
}

export const useHandleScanner = (T: useHandleScannerProps) => {
    const [data, setData] = useState<string>('No QR code detected');
    const {canvasRef, scanArea, videoRef} = T
    const requestRef = useRef<number>(0);

    useEffect(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (T.state.value) {
            const startVideo = async () => {
                if (video) {
                    try {
                        const stream = await navigator.mediaDevices.getUserMedia({
                            video: {
                                facingMode: 'environment'
                            }
                        });
                        video.srcObject = stream;

                        video.onloadedmetadata = () => {
                            video.play();
                        };
                    } catch (error) {
                        alert(error);
                        setData("Unable to access camera");
                    }
                }
            };

            const scanQRCode = () => {
                if (canvas && context && video) {
                    context.drawImage(video, 0, 0, canvas.width, canvas.height);
                    const imageData = context.getImageData(
                        scanArea.x,
                        scanArea.y,
                        scanArea.width,
                        scanArea.height
                    );
                    const code = jsQR(imageData.data, scanArea.width, scanArea.height);
                    if (code) {
                        setData(code.data);
                        if (T.inputTarget) {
                            const target = document.querySelector(T.inputTarget) as HTMLInputElement
                            target.value = code.data
                        }
                        if (requestRef.current) {
                            cancelAnimationFrame(requestRef.current);
                        }
                        if (video && video.srcObject) {
                            const stream = video.srcObject as MediaStream;
                            stream.getTracks().forEach(track => track.stop());
                        }
                        T.state.setter(false)
                    }
                }
                requestRef.current = requestAnimationFrame(scanQRCode);
            }

            startVideo().then(() => {
                if (video) {
                    video.onplaying = () => {
                        requestRef.current = requestAnimationFrame(scanQRCode);
                    };
                }
            });
        }

        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
            if (video && video.srcObject) {
                const stream = video.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [T.state.value, data]);

    return {data}
}