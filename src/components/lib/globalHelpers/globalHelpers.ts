import React from "react";

export function getUnitDigit(number: number) {
    return number % 10;
}

export const getThNumber = (number: number) => {
    const unit = getUnitDigit(number)

    if (unit === 1) {
        return `${number}st`
    } else if (unit === 2) {
        return `${number}nd`
    } else if (unit === 3) {
        return `${number}rd`
    } else {
        return `${number}th`
    }
}

export const getRandomNumberArray = (length: number, range: number) => {
    const randomIndexArray = [
        Math.floor(Math.random() * range),
    ]

    while (randomIndexArray.length <= length - 1) {
        const randomNumber = Math.floor(Math.random() * range)
        if (!randomIndexArray.includes(randomNumber)) {
            randomIndexArray.push(randomNumber)
        }
    }

    return randomIndexArray
}

export function shuffleArray(array: any[]): any[] {

    if (array.length === 0) {
        return [];
    }

    const clonedArray = [...array];

    for (let i = clonedArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [clonedArray[i], clonedArray[j]] = [clonedArray[j], clonedArray[i]];
    }

    return clonedArray;
}

export function replaceAllItems(array: any[], oldItem: any, newItem: any) {
    return array.map(item => item === oldItem ? newItem : item);
}

export const randomNumber = (array: number[], range: number) => {
    let selectedRandomNumber = array[0];

    while (array.includes(selectedRandomNumber)) {
        selectedRandomNumber = Math.floor(Math.random() * range)
    }

    return selectedRandomNumber
}


export const handleClickOutSide = (includeClasses: string[], setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    window.addEventListener("click", (e) => {
        if (e.srcElement && "classList" in e.srcElement) {
            const doesInclude = includeClasses.map((classItem) => {
                return (e.srcElement as any).classList.contains(classItem)
            }).some((item) => item)

            if (!doesInclude) {
                setter(false)
            }
        } else {
            setter(false)
        }
    })
}

export const handleFocus = () => {
    const processContainer = document.querySelector("#process-container")
    setTimeout(() => {
        if (processContainer) {
            processContainer.scrollIntoView({
                behavior: "smooth",
                block: "end"
            });
        }
    }, 300);
};

// css in js
export const handler = (modalContainer: React.MutableRefObject<HTMLDivElement | null>, state: boolean) => {
    if (modalContainer.current && window.innerWidth <= 640) {
        const documentHeight = document.documentElement.clientHeight;
        const containerHeight = modalContainer.current.clientHeight;
        modalContainer.current.style.transform = `translateY(calc(${documentHeight - containerHeight}px + ${state ? '0px' : '100%'}))`
    } else if (modalContainer.current) {
        modalContainer.current.style.transform = `translateY(0) scale(${state ? '1' : '0'})`
    }
}

export function formatNumberWithCommas(number:number | null) {
    const fixedNumber = Number(number).toFixed(5);
    const parts = fixedNumber.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

