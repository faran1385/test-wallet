import React from "react";

interface ActionProps {
    text: string,
    children: React.ReactNode,
    alignment: "start" | "center" | "end",
    classes?: string
}

export const Action: React.FC<ActionProps> = (T) => {
    return <>
        <div
            style={{
                alignItems: T.alignment
            }}
            className={`flex flex-col ${T.classes}`}>
            <button className={"flex flex-col items-center text-wallet-blue space-y-2"}>
                {T.children}
                <span className={"lg:text-base  text-[14px]"}>{T.text}</span>
            </button>
        </div>
    </>
}