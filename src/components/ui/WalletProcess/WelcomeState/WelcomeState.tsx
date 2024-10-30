import {useState} from "react";
import {useAtom} from "jotai";
import {processAtom} from "../../../lib/Atom/walletProcess/walletProcess.ts";
import "./style.css"
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper-bundle.css';


import { Pagination } from 'swiper/modules';

export const WelcomeState = () => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_process, setProcess] = useAtom(processAtom)

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
                    <div className={"flex w-full flex-col items-center justify-center gap-3"}>
                        <img
                            src={"/imgs/Fly.png"}
                            width={248}
                            height={160}
                            alt="Hero fly"
                            className=""
                        />
                        <h2 className="text-2xl font-bold text-center">Welcome</h2>

                        <p className="text-sm font-normal text-[#686D74] text-center">
                            In the next steps, you’ll be able to create <br/>
                            your own self-custody wallet or import an existing one.
                        </p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={"flex w-full flex-col items-center justify-center gap-3"}>
                        <img
                            src={"/imgs/Fly 1.png"}
                            alt="Hero fly"
                            className=""
                        />
                        <h2 className="text-2xl font-bold text-center">Welcome</h2>

                        <p className="text-sm font-normal text-[#686D74] text-center">
                            Explore our comprehensive financial<br/> services— transfer funds, send money<br/> globally, pay
                            bills and buy crypto assets.
                        </p>
                    </div>
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
                    disabled={!isChecked}
                    className={`${isChecked ? 'opacity-100' : 'opacity-60 cursor-not-allowed'} text-center text-nowrap w-full  duration-300 bg-wallet-disable-background text-wallet-disable-text rounded-[40px] py-3 text-base font-medium peer-checked:hidden`}
                >
                    Retrieve existing account
                </button>
                <button
                    onClick={() => setProcess("password")}
                    disabled={!isChecked}
                    className={`${isChecked ? 'opacity-100  hover:bg-[#21C58A] bg-[#24D998] text-[#151523]' : 'opacity-60 bg-wallet-disable-background text-wallet-disable-text  cursor-not-allowed'} text-center text-nowrap w-full duration-300  rounded-[40px] py-3 text-base font-medium peer-checked:hidden`}
                >
                    Generate new wallet
                </button>
            </div>
        </div>
    </div>
}