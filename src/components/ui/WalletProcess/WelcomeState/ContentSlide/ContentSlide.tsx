import React from "react";

interface ContentSlideProps {
    image: string,
    children: React.ReactNode,
    title: string,
}

export const ContentSlide: React.FC<ContentSlideProps> = (T) => {
    return <div className={"flex w-full flex-col items-center justify-center gap-3"}>
        <img
            src={T.image}
            alt="Hero fly"
            className=""
        />
        <h2 className="text-2xl font-bold text-center">{T.title}</h2>
        {T.children}
    </div>
}