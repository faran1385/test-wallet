import {Link} from "react-router-dom";

export const ManageAssetsFooter = () => {
    return <>
        <div className={"mt-4 flex items-center justify-center sm:justify-between"}>
            <Link to={"/wallet"}
                  style={{transition: "background-color ease-in-out .3s"}}
                  className="hidden hover:bg-[#282835] sm:grid bg-[#242431]  rounded-[48px] min-w-[200px] py-3 text-white  text-center"
            >
                Back
            </Link>
            <div className={"flex space-x-4"}>
                <button
                    style={{transition: "ease-in-out .3s background-color,ease-in-out .3s color"}}
                    className={"border flex justify-center items-center hover:text-white text-wallet-green border-wallet-green  hover:bg-wallet-green w-8 h-8 rounded"}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20"
                         fill="currentColor">
                        <path fillRule="evenodd"
                              fill={"currentColor"}
                              stroke={"currentColor"}
                              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                              clipRule="evenodd"></path>
                    </svg>
                </button>
                <span
                    className={"border text-[18px] flex justify-center items-center text-white  bg-wallet-green min-w-8 px-1 h-8 rounded "}>
                        125
                    </span>
                <button
                    style={{transition: "ease-in-out .3s background-color,ease-in-out .3s color"}}
                    className={"border flex justify-center items-center hover:text-white text-wallet-green border-wallet-green  hover:bg-wallet-green w-8 h-8 rounded "}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 rotate-180 w-3" viewBox="0 0 20 20"
                         fill="currentColor">
                        <path fillRule="evenodd"
                              fill={"currentColor"}
                              stroke={"currentColor"}
                              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                              clipRule="evenodd"></path>
                    </svg>
                </button>
            </div>
        </div>
    </>
}