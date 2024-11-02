export const ManageAssetsHeader = () => {
    return <>
        <div className="flex flex-col gap-4 sm:gap-7 mt-10 sm:mt-0">
            <div
                className="h-[70px] hidden sm:inline-flex flex-col justify-start items-center gap-3"
            >
                <div
                    className="self-stretch text-center text-black text-[32px] font-bold leading-10"
                >
                    Add Assets
                </div>
                <div
                    className="self-stretch text-center text-[#4f5459] text-sm font-normal leading-[18px] tracking-tight"
                >
                    In order to be able to send or receive a token, you must first
                    associate the Token ID.
                </div>
            </div>

            <div
                className="h-[68px] inline-flex flex-col justify-start items-start gap-1 sm:hidden"
            >
                <div className="self-stretch text-black text-xl font-bold leading-7">
                    Select asset to receive
                </div>
                <div
                    className="self-stretch text-[#686d74] text-sm font-normal leading-[18px] tracking-tight"
                >
                    In order to be able to send or receive a token,<br/>
                    you must first associate the Token ID.
                </div>
            </div>
            <div className="flex">
                <div
                    className="w-full sm:w-[60%] lg:w-[40%] bg-transparent sm:bg-[#E1E5EB] px-4 flex items-center gap-2 h-12 rounded-full border border-[#BDC7D3]"
                >
                    <label htmlFor="search">
                        <img src="/svg/global/search.svg" alt="search"/>
                    </label>
                    <input
                        type="text"
                        className="hidden sm:flex w-full h-full focus:outline-none bg-transparent placeholder:text-sm placeholder:text-[#686D74]"
                        placeholder="Search for asset name, ticker or txid"
                        id="search"
                    />
                    <input
                        type="text"
                        className="w-full sm:hidden h-full focus:outline-none bg-transparent placeholder:text-sm placeholder:text-[#686D74]"
                        placeholder="Search "
                        id="search"
                    />
                </div>
            </div>
        </div>
    </>
}