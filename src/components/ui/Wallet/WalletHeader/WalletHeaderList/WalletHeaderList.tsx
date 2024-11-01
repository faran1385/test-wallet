import {WalletHeaderListItem} from "./WalletHeaderListItem/WalletHeaderListItem.tsx";

export const WalletHeaderList = () => {
    return <>
        <ul className={"px-2 sm:flex hidden space-x-[35px] lg:space-x-[50px]"}>
            <WalletHeaderListItem active text={"Home"}>
                <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                          fill={'currentColor'}
                          d="M4.5 0.5H16.5V3.5H4.5V0.5ZM2.25 5H17.25C17.664 5 18 5.336 18 5.75V17.75C18 18.164 17.664 18.5 17.25 18.5H3C1.34325 18.5 0 17.1567 0 15.5V4.25C0 3.00725 1.00725 2 2.25 2H3V3.5H2.25C1.83675 3.5 1.5 3.83675 1.5 4.25C1.5 4.66325 1.83675 5 2.25 5ZM12 11.75C12 12.5787 12.6713 13.25 13.5 13.25C14.3287 13.25 15 12.5787 15 11.75C15 10.9213 14.3287 10.25 13.5 10.25C12.6713 10.25 12 10.9213 12 11.75Z"
                    />
                </svg>
            </WalletHeaderListItem>
            <WalletHeaderListItem text={"Payments"}>
                <svg width="10" height="19" viewBox="0 0 10 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0 12.5H2C2 13.58 3.37 14.5 5 14.5C6.63 14.5 8 13.58 8 12.5C8 11.4 6.96 11 4.76 10.47C2.64 9.94 0 9.28 0 6.5C0 4.71 1.47 3.19 3.5 2.68V0.5H6.5V2.68C8.53 3.19 10 4.71 10 6.5H8C8 5.42 6.63 4.5 5 4.5C3.37 4.5 2 5.42 2 6.5C2 7.6 3.04 8 5.24 8.53C7.36 9.06 10 9.72 10 12.5C10 14.29 8.53 15.81 6.5 16.32V18.5H3.5V16.32C1.47 15.81 0 14.29 0 12.5Z"
                        fill="currentColor"/>
                </svg>
            </WalletHeaderListItem>
            <WalletHeaderListItem text={"Marketplace"}>
                <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M16 5.5H14C14 2.7 11.8 0.5 9 0.5C6.2 0.5 4 2.7 4 5.5H2C0.9 5.5 0 6.4 0 7.5V19.5C0 20.6 0.9 21.5 2 21.5H16C17.1 21.5 18 20.6 18 19.5V7.5C18 6.4 17.1 5.5 16 5.5ZM9 2.5C10.7 2.5 12 3.8 12 5.5H6C6 3.8 7.3 2.5 9 2.5ZM16 19.5H2V7.5H16V19.5ZM9 11.5C7.3 11.5 6 10.2 6 8.5H4C4 11.3 6.2 13.5 9 13.5C11.8 13.5 14 11.3 14 8.5H12C12 10.2 10.7 11.5 9 11.5Z"
                        fill="currentColor"/>
                </svg>
            </WalletHeaderListItem>
        </ul>
    </>
}