import {SettingItem} from "./SettingItem/SettingItem.tsx";
import React, {SetStateAction, useEffect} from "react";
import {stagger, useAnimate} from "framer-motion";

interface SettingDrawerProps {
    isOpen: boolean,
    setIsOpen: React.Dispatch<SetStateAction<boolean>>
}

export const SettingDrawer: React.FC<SettingDrawerProps> = (T) => {
    const {isOpen} = T
    const isPopup = true
    const [scope, animate] = useAnimate();

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("overflow-y-hidden")
            // opening
            animate(
                ".settings-container",
                {
                    backdropFilter: 'blur(12px)',
                    visibility: "visible",
                    backgroundColor: 'rgba(0,0,0,.5)'
                },
                {
                    duration: .3,
                    ease: 'easeInOut'
                }
            )
            animate(
                ".setting-item",
                {
                    opacity: 1,
                    x: 0
                },
                {
                    delay: stagger(.1),
                    ease: 'easeInOut'
                }
            )
        } else {
            document.body.classList.remove("overflow-y-hidden")
            // closing
            animate(".settings-container", {
                backdropFilter: 'blur(0px)',
                visibility: 'hidden'
            }, {
                duration: .3,
                ease: 'easeInOut'
            })

            animate(
                ".setting-item",
                {
                    opacity: 0,
                    x: -30
                },
                {
                    delay: stagger(.2),
                    ease: 'easeInOut'
                }
            )
        }
    }, [isOpen]);

    return <div ref={scope}>
        <div
            className={`fixed ${isPopup && 'grid place-content-center'} top-0 settings-container w-full h-full z-20`}>
            <div
                className={`flex flex-col ${T.isOpen ? isPopup ? "scale-100" : '' : isPopup ? 'scale-0' : 'translate-x-full'} p-4 ${isPopup ? 'rounded-xl py-6  min-w-[640px]' : 'sm:max-w-[375px] px-4'}  transition-transform ease-in-out duration-300  h-full ml-auto  bg-[#EBEEF1]`}>
                <div
                    className={`hidden sm:flex w-full items-center justify-between`}
                >
                    <button
                        className="text-nowrap min-w-[120px] duration-300 bg-[#24D998] hover:bg-[#21C58A] rounded-[40px] py-3 text-base font-normal">

                        Lock Wallet
                    </button>
                    <button
                        onClick={() => T.setIsOpen(false)}
                    >
                        <svg
                            style={{transition: "opacity .3s ease-in-out"}}
                            className={"opacity-60 hover:opacity-100"} width="24" height="24" viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM14.59 8L12 10.59L9.41 8L8 9.41L10.59 12L8 14.59L9.41 16L12 13.41L14.59 16L16 14.59L13.41 12L16 9.41L14.59 8Z"
                                fill="#686D74"/>
                        </svg>
                    </button>
                </div>

                <div className="w-full flex sm:hidden items-center">
                    <div className="items-center">
                        <img
                            onClick={() => T.setIsOpen(false)}
                            src="/svg/setting/leftArrow.svg"
                            className="mx-auto cursor-pointer"
                            alt="left arrow "
                        />
                    </div>
                    <h3 className="sm:hidden text-center text-[16px] font-medium mx-auto">
                        Settings
                    </h3>
                </div>

                <div className="flex flex-col sm:my-0 my-auto w-full pt-6 gap-2">
                    <SettingItem
                        route={''}
                        description={"Back up your secret recovery phrase."}
                        title={"Wallet Keys"}
                    >
                        <img src="/svg/setting/keys.svg" alt="keys icone"/>
                    </SettingItem>
                    <SettingItem
                        route={''}
                        description={"Manage your accounts."}
                        title={'Wallet List'}
                    >
                        <img src="/svg/setting/wallet.svg" alt="keys icone"/>
                    </SettingItem>
                    <SettingItem
                        route={''}
                        description={"Change default currency of wallet."}
                        title={'Default Currency'}
                    >
                        <img src="/svg/setting/currency.svg" alt="keys icone"/>
                    </SettingItem>
                    <SettingItem
                        route={''}
                        description={"Manage recent and saved addresses."}
                        title={'Auto Payment'}
                    >
                        <img src="/svg/setting/paymeny.svg" alt="keys icone"/>
                    </SettingItem>
                    <SettingItem
                        route={''}
                        description={"Manage recent and saved addresses."}
                        title={'Address Book'}
                    >
                        <img src="/svg/setting/address.svg" alt="keys icone"/>
                    </SettingItem>
                    <SettingItem
                        route={''}
                        description={"Manage recent and saved addresses."}
                        title={'Help Center'}
                    >
                        <img src="/svg/setting/question.svg" alt="help"/>
                    </SettingItem>
                </div>

                <div className="pt-[64px] items-center gap-6 sm:hidden flex flex-col">
                    <button
                        className="text-nowrap text-center w-full duration-300 bg-[#24D998] hover:bg-[#21C58A] rounded-[40px] py-3 text-base font-normal peer-checked:hidden">
                        Lock Wallet
                    </button>
                </div>
            </div>
        </div>
    </div>
}