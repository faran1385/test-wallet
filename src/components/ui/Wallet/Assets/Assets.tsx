import {AssetsHeader} from "./AssetsHeader/AssetsHeader.tsx";
import {AssetsContent} from "./AssetsContent/AssetsContent.tsx";


export const Assets = () => {
    return <div className={"mt-8"}>
        <AssetsHeader/>
        <AssetsContent/>
    </div>
}