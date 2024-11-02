export const AssetSwitcher = () => {
    return <>
        <div className="switcher-box">
            <label
                id="control-panel"
                className="relative group w-[40px] h-[23px] rounded-[13px] py-[2pz] px-[3px] flex flex-col justify-center transition-all duration-300 overflow-hidden cursor-pointer"
            >
                <input
                    id="control-panel"
                    type="checkbox"
                    className="peer absolute"
                />
                <div
                    style={{transition:"background-color ease-in-out .2s"}}
                    id="control-panel"
                    className="absolute inset-0 bg-gray-200 peer-checked:bg-[#24d998] shadow-inner"
                ></div>
                <div
                    style={{transition:"background-color ease-in-out .2s,transform ease-in-out .2s"}}
                    id="control-panel"
                    className="w-[17px] peer-checked:translate-x-[17px] shadow-sm h-[17px] bg-gray-500 peer-checked:bg-white rounded-full cursor-pointer z-10 transition-all duration-200"
                ></div>
            </label>
        </div>
    </>
}