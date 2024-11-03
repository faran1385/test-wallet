export const PromoCard = () => {
    return <>
        <div className="sm:hidden mt-3 relative">
            <div
                className="absolute top-[20%] right-3 bg-[#FFFFFF20] rounded-full p-1 cursor-pointer z-10"
            >
                <img
                    src="/svg/home/close.svg"
                    alt=""
                    className="w-2.5 h-2.5"
                />
            </div>
            <img
                src="/imgs/home/Promo card.png"
                alt=""
                className="w-full h-full cursor-pointer"
            />
        </div>
    </>
}