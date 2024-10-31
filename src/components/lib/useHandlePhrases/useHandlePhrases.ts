import {useEffect, useState} from "react";
import * as bip39 from "bip39";

export const useHandlePhrases = () => {
    // length of phrases state
    const [selectedPhraseCount, setSelectedPhraseCount] = useState<12 | 15 | 24>(12)

    // phrases array
    const [phrases, setPhrases] = useState({
        '12': [] as string[],
        '15': [] as string[],
        '24': [] as string[]
    })

    // setting phrases
    useEffect(() => {
        setPhrases({
            '12': bip39.generateMnemonic(128).split(" "),
            '15': bip39.generateMnemonic(256 * 15 / 24).split(" "),
            '24': bip39.generateMnemonic(256).split(" "),
        })
    }, []);


    return {
        selectedPhraseCount,
        phrases,
        setSelectedPhraseCount
    }
}