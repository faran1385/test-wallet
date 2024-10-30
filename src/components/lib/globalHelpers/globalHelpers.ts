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