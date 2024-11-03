import React from "react";
import {Link} from "react-router-dom";

interface SettingItemProps {
    children: React.ReactNode;
    title: string,
    description: string,
    route: string
}

export const SettingItem: React.FC<SettingItemProps> = (T) => {
    return <Link to={T.route}>
        <div
            style={{
                transition:"box-shadow .3s ease-in-out"
            }}
            className="group setting-item hover:shadow-xl rounded-md justify-between items-center px-3 bg-[#F8F9FB] h-[68px] flex w-full"
        >
           <div className={"flex items-center"}>
               {T.children}
               <div className="flex flex-col px-3">
                   <p className="text-[14px] font-medium">{T.title}</p>
                   <p className="text-[12px] text-[#686D74]">{T.description}</p>
               </div>
           </div>
            <img
                style={{
                    transition:"transform .2s ease-in-out"
                }}
                className="group-hover:translate-x-1.5 w-[24px] h-[24px]"
                src="/svg/setting/rightArrow.svg"
                alt="rightArrow"
            />
        </div>
    </Link>
}