import {useState} from "react";
import {useAtom} from "jotai";
import {processAtom, processTypeAtom} from "../../../lib/Atom/walletProcess/walletProcess.ts";
import "./style.css"
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper-bundle.css';


import {Pagination} from 'swiper/modules';
import {ContentSlide} from "./ContentSlide/ContentSlide.tsx";

export const WelcomeState = () => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_process, setProcess] = useAtom(processAtom)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_processType, setProcessType] = useAtom(processTypeAtom)

    // agreement checkbox
    const [isChecked, setChecked] = useState(false)

    return <div
        className="w-full h-full flex sm:pb-0 pb-8 flex-col sm:justify-center gap-y-12"
    >
        <div className={"sm:mt-8 my-auto"}>
            <Swiper
                slidesPerView={1}
                pagination={{
                    clickable: true,
                    el: '.custom-pagination',
                    bulletClass: 'custom-bullet',
                    bulletActiveClass: 'custom-bullet-active',
                }}
                modules={[Pagination]}
                className={"w-full"}
            >
                <SwiperSlide>
                    <ContentSlide
                        title={'Welcome'}
                        image={"/imgs/Fly.png"}
                    >
                        <p className="text-sm font-normal text-[#686D74] text-center">
                            In the next steps, you’ll be able to create <br/>
                            your own self-custody wallet or import an existing one.
                        </p>
                    </ContentSlide>
                </SwiperSlide>
                <SwiperSlide>
                    <ContentSlide
                        title={'Welcome'}
                        image={'/imgs/Fly 1.png'}
                    >
                        <p className="text-sm font-normal text-[#686D74] text-center">
                            Explore our comprehensive financial<br/> services— transfer funds, send money<br/> globally,
                            pay
                            bills and buy crypto assets.
                        </p>
                    </ContentSlide>
                </SwiperSlide>
            </Swiper>
            <div className={"custom-pagination"}></div>
        </div>

        <div className="w-full flex flex-col items-center gap-7 sm:gap-12">
            <label
                htmlFor="checkbox"
                className="flex items-center gap-x-2 cursor-pointer"
            >
                <input
                    type="checkbox"
                    id="checkbox"
                    onClick={() => setChecked(!isChecked)}
                    className="peer text-xl h-[20px] w-[20px] checked:ring-2 accept-ra ring-[#1B65FF30] cursor-pointer"
                />

                <span className="text-sm text-[#686D74] font-normal select-none"
                >I agree to the wallet<span className="font-bold text-black ml-1">Terms of Use</span></span>
            </label>
            <div
                className="w-full flex flex-col-reverse sm:flex-row items-center justify-between gap-5"
            >
                <button
                    onClick={() => {
                        setProcessType("import")
                        setProcess("password")
                    }}
                    disabled={!isChecked}
                    className={`${isChecked ? 'opacity-100 bg-wallet-dark text-white' : 'opacity-60 cursor-not-allowed bg-wallet-disable-background text-wallet-disable-text'} text-center text-nowrap w-full  duration-300  rounded-[40px] py-3 text-base font-medium peer-checked:hidden`}
                >
                    Retrieve existing account
                </button>
                <button
                    onClick={() => {
                        setProcessType("generate")
                        setProcess("password")
                    }}
                    disabled={!isChecked}
                    className={`${isChecked ? 'opacity-100  hover:bg-[#21C58A] bg-[#24D998] text-[#151523]' : 'opacity-60 bg-wallet-disable-background text-wallet-disable-text  cursor-not-allowed'} text-center text-nowrap w-full duration-300  rounded-[40px] py-3 text-base font-medium peer-checked:hidden`}
                >
                    Generate new wallet
                </button>
            </div>
        </div>
    </div>
}