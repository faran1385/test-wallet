import {Action} from "./Action/Action.tsx";

export const WalletBalanceCardActions = () => {
    return <div className={"bg-white grid grid-cols-3 items-center rounded-2xl md:rounded-lg md:px-5 px-5 sm:px-[50px] lg:px-[50px] py-6"}>
        <Action text={"Send"} alignment={"start"}>
            <div className={"md:bg-transparent bg-[#E8F0FF] rounded-full sm:w-auto w-12 sm:h-auto h-12 justify-center items-center flex"}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M1.6665 14.9961C1.93172 14.9961 2.18607 15.1015 2.37361 15.289C2.56115 15.4765 2.6665 15.7309 2.6665 15.9961V19.0001C2.6665 19.1841 2.81584 19.3334 2.99984 19.3334H18.9998C19.0882 19.3334 19.173 19.2983 19.2355 19.2358C19.2981 19.1733 19.3332 19.0885 19.3332 19.0001V15.9961C19.3332 15.7309 19.4385 15.4765 19.6261 15.289C19.8136 15.1015 20.068 14.9961 20.3332 14.9961C20.5984 14.9961 20.8527 15.1015 21.0403 15.289C21.2278 15.4765 21.3332 15.7309 21.3332 15.9961V19.0001C21.3332 19.6189 21.0873 20.2124 20.6498 20.65C20.2122 21.0876 19.6187 21.3334 18.9998 21.3334H2.99984C2.381 21.3334 1.78751 21.0876 1.34992 20.65C0.912337 20.2124 0.666504 19.6189 0.666504 19.0001V15.9961C0.666504 15.7309 0.771861 15.4765 0.959397 15.289C1.14693 15.1015 1.40129 14.9961 1.6665 14.9961Z"
                          fill="currentColor"/>
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M11.269 2.44141C11.5343 2.44141 11.7886 2.54676 11.9762 2.7343C12.1637 2.92184 12.269 3.17619 12.269 3.44141V14.2227C12.269 14.488 12.1637 14.7423 11.9762 14.9298C11.7886 15.1174 11.5343 15.2227 11.269 15.2227C11.0038 15.2227 10.7495 15.1174 10.5619 14.9298C10.3744 14.7423 10.269 14.488 10.269 14.2227V3.44274C10.269 3.17752 10.3744 2.92317 10.5619 2.73563C10.7495 2.5481 11.0038 2.44141 11.269 2.44141Z"
                          fill="currentColor"/>
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M10.5704 0.952522C10.7572 0.770095 11.008 0.667969 11.2691 0.667969C11.5302 0.667969 11.7809 0.770095 11.9677 0.952522L16.4264 5.30719C16.6122 5.49334 16.7172 5.7452 16.7186 6.0082C16.72 6.2712 16.6178 6.52417 16.434 6.71232C16.2502 6.90047 15.9997 7.00865 15.7368 7.01343C15.4738 7.01821 15.2196 6.9192 15.0291 6.73785L11.2691 3.06585L7.50907 6.73785C7.41555 6.83157 7.30434 6.90577 7.18191 6.95617C7.05948 7.00656 6.92826 7.03215 6.79587 7.03143C6.66347 7.03071 6.53254 7.00372 6.41066 6.952C6.28878 6.90029 6.17839 6.82488 6.08588 6.73017C5.99337 6.63545 5.92059 6.52331 5.87176 6.40025C5.82293 6.27718 5.79903 6.14565 5.80143 6.01327C5.80384 5.8809 5.83251 5.75032 5.88578 5.62911C5.93904 5.5079 6.01585 5.39848 6.11174 5.30719L10.5704 0.952522Z"
                          fill="currentColor"/>
                </svg>
            </div>
        </Action>
        <Action classes={"pe-[14px]"} text={"Receive"} alignment={"center"}>
            <div className={"md:bg-transparent bg-[#E8F0FF] rounded-full sm:w-auto w-12 sm:h-auto h-12 justify-center items-center flex"}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M1.6665 14.9973C1.93172 14.9973 2.18607 15.1027 2.37361 15.2902C2.56115 15.4777 2.6665 15.7321 2.6665 15.9973V19.0013C2.6665 19.1853 2.81584 19.3346 2.99984 19.3346H18.9998C19.0882 19.3346 19.173 19.2995 19.2355 19.237C19.2981 19.1745 19.3332 19.0897 19.3332 19.0013V15.9973C19.3332 15.7321 19.4385 15.4777 19.6261 15.2902C19.8136 15.1027 20.068 14.9973 20.3332 14.9973C20.5984 14.9973 20.8527 15.1027 21.0403 15.2902C21.2278 15.4777 21.3332 15.7321 21.3332 15.9973V19.0013C21.3332 19.6201 21.0873 20.2136 20.6498 20.6512C20.2122 21.0888 19.6187 21.3346 18.9998 21.3346H2.99984C2.381 21.3346 1.78751 21.0888 1.34992 20.6512C0.912337 20.2136 0.666504 19.6201 0.666504 19.0013V15.9973C0.666504 15.7321 0.771861 15.4777 0.959397 15.2902C1.14693 15.1027 1.40129 14.9973 1.6665 14.9973ZM11.2692 0.667969C11.5344 0.667969 11.7887 0.773325 11.9763 0.960862C12.1638 1.1484 12.2692 1.40275 12.2692 1.66797V12.4493C12.2692 12.7145 12.1638 12.9689 11.9763 13.1564C11.7887 13.3439 11.5344 13.4493 11.2692 13.4493C11.004 13.4493 10.7496 13.3439 10.5621 13.1564C10.3745 12.9689 10.2692 12.7145 10.2692 12.4493V1.66797C10.2692 1.40275 10.3745 1.1484 10.5621 0.960862C10.7496 0.773325 11.004 0.667969 11.2692 0.667969Z"
                          fill="currentColor"/>
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M6.09607 9.1703C6.28126 8.98071 6.53414 8.8724 6.79915 8.86915C7.06415 8.8659 7.31961 8.96798 7.5094 9.15296L11.2694 12.8263L15.0294 9.15296C15.1229 9.05925 15.2341 8.98505 15.3566 8.93465C15.479 8.88426 15.6102 8.85867 15.7426 8.85939C15.875 8.8601 16.0059 8.8871 16.1278 8.93882C16.2497 8.99053 16.3601 9.06594 16.4526 9.16065C16.5451 9.25537 16.6179 9.36751 16.6667 9.49057C16.7155 9.61364 16.7394 9.74517 16.737 9.87755C16.7346 10.0099 16.706 10.1405 16.6527 10.2617C16.5994 10.3829 16.5226 10.4923 16.4267 10.5836L11.9681 14.9396C11.7813 15.1221 11.5305 15.2242 11.2694 15.2242C11.0083 15.2242 10.7575 15.1221 10.5707 14.9396L6.11207 10.5836C5.92266 10.3983 5.81459 10.1453 5.81159 9.88028C5.80859 9.61527 5.91091 9.35991 6.09607 9.1703Z"
                          fill="currentColor"/>
                </svg>
            </div>
        </Action>
        <Action text={"Exchange"} alignment={"end"}>
            <div className={"md:bg-transparent bg-[#E8F0FF] rounded-full sm:w-auto w-12 sm:h-auto h-12 justify-center items-center flex"}>
                <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M24 6.0013L18.6667 0.667969V4.66797H9.33333V7.33464H18.6667V11.3346M5.33333 8.66797L0 14.0013L5.33333 19.3346V15.3346H14.6667V12.668H5.33333V8.66797Z"
                        fill="#1B65FF"/>
                </svg>
            </div>
        </Action>
    </div>
}