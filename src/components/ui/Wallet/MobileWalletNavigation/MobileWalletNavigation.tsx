import React from "react";

interface MobileWalletNavigationProps {
    additionalClasses?: string
}

export const MobileWalletNavigation: React.FC<MobileWalletNavigationProps> = (T) => {
    return <div className={`navigation-bottom ${T.additionalClasses}`}>
        <div
            className="w-full h-20 fixed bottom-0 left-0 right-0 bg-[#EBEEF1] border-t-2 border-t-[#E5E5EA] md:hidden z-[999] flex justify-center"
        >
            <div className="flex items-center gap-16">
                <a
                    style={{transition: '.3s color ease-in-out'}}
                    href="#"
                    className="flex flex-col items-center gap-1 hover:text-wallet-blue text-wallet-blue text-[10px] font-medium  w-[60px]"
                >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M4.5 0H16.5V3H4.5V0ZM2.25 4.5H17.25C17.664 4.5 18 4.836 18 5.25V17.25C18 17.664 17.664 18 17.25 18H3C1.34325 18 0 16.6567 0 15V3.75C0 2.50725 1.00725 1.5 2.25 1.5H3V3H2.25C1.83675 3 1.5 3.33675 1.5 3.75C1.5 4.16325 1.83675 4.5 2.25 4.5ZM12 11.25C12 12.0787 12.6713 12.75 13.5 12.75C14.3287 12.75 15 12.0787 15 11.25C15 10.4213 14.3287 9.75 13.5 9.75C12.6713 9.75 12 10.4213 12 11.25Z"
                              fill="currentColor"/>
                    </svg>
                    <span>Home</span>
                </a>
                <a
                    href="../marketplace/index.html"
                    style={{transition: '.3s color ease-in-out'}}

                    className="flex flex-col items-center gap-1 hover:text-wallet-blue text-[#868D96] text-[10px] font-medium"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 33 32" fill="none">
                        <path
                            d="M9 22H6C5.72386 22 5.5 22.2239 5.5 22.5V26.5C5.5 26.7761 5.72386 27 6 27H9C9.27614 27 9.5 26.7761 9.5 26.5V22.5C9.5 22.2239 9.27614 22 9 22Z"
                            fill="currentColor"></path>
                        <path
                            d="M15 15H12C11.7239 15 11.5 15.2239 11.5 15.5V26.5C11.5 26.7761 11.7239 27 12 27H15C15.2761 27 15.5 26.7761 15.5 26.5V15.5C15.5 15.2239 15.2761 15 15 15Z"
                            fill="currentColor"></path>
                        <path
                            d="M21 22H18C17.7239 22 17.5 22.2239 17.5 22.5V26.5C17.5 26.7761 17.7239 27 18 27H21C21.2761 27 21.5 26.7761 21.5 26.5V22.5C21.5 22.2239 21.2761 22 21 22Z"
                            fill="currentColor"></path>
                        <path
                            d="M27 15H24C23.7239 15 23.5 15.2239 23.5 15.5V26.5C23.5 26.7761 23.7239 27 24 27H27C27.2761 27 27.5 26.7761 27.5 26.5V15.5C27.5 15.2239 27.2761 15 27 15Z"
                            fill="currentColor"></path>
                        <path
                            d="M25.793 5.29301L19.5 11.586L14.207 6.29301C14.0195 6.10554 13.7652 6.00022 13.5 6.00022C13.2348 6.00022 12.9805 6.10554 12.793 6.29301L5.793 13.293C5.69749 13.3853 5.62131 13.4956 5.5689 13.6176C5.51649 13.7396 5.48891 13.8708 5.48775 14.0036C5.4866 14.1364 5.5119 14.2681 5.56218 14.391C5.61246 14.5139 5.68672 14.6255 5.78061 14.7194C5.8745 14.8133 5.98615 14.8876 6.10905 14.9378C6.23195 14.9881 6.36363 15.0134 6.49641 15.0123C6.62919 15.0111 6.76041 14.9835 6.88241 14.9311C7.00441 14.8787 7.11476 14.8025 7.20701 14.707L13.5 8.41401L18.793 13.707C18.9805 13.8945 19.2348 13.9998 19.5 13.9998C19.7652 13.9998 20.0195 13.8945 20.207 13.707L27.207 6.70701C27.3892 6.51841 27.49 6.26581 27.4877 6.00361C27.4854 5.74141 27.3802 5.4906 27.1948 5.30519C27.0094 5.11978 26.7586 5.01461 26.4964 5.01234C26.2342 5.01006 25.9816 5.11085 25.793 5.29301Z"
                            fill="currentColor"></path>
                    </svg>
                    <span>Market</span>
                </a>
            </div>
        </div>
    </div>
}