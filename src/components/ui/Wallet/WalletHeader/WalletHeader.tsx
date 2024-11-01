import {WalletHeaderList} from "./WalletHeaderList/WalletHeaderList.tsx";
import {WalletHeaderProfile} from "./WalletHeaderProfile/WalletHeaderProfile.tsx";
import {WalletHeaderIcons} from "./WalletHeaderIcons/WalletHeaderIcons.tsx";

export const WalletHeader = () => {
    return <header className={"rounded-[12px] sm:bg-white sm:border-b border-b-[#BDC7D3]"}>
        <div className={"p-4 flex items-center justify-between"}>
            <WalletHeaderProfile
                image={'https://s3-alpha-sig.figma.com/img/894f/755a/99973199ef0a9424c450930ec2b456b5?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MvY6BLoV2l4keqLKGq7o6ksqpvr8J5Y9nT2IddDKaCTt~QxbUYRQZd--SD0PO9zGFjkN2sAPBjVrsA5odWvumu2xFKVwwxqPP~n9RotoCThBzwWW5ul60nICPhCe4GFfxtHEZAT~QR5LlHnNFutiIQaEDIKCJfeMQ~Uq6BOqSPWkNyaltIUanJHvESQ3skRnDg4mdgUzWWKuEGGLqKRPA5jx~pRZ04bLbriIxA2s0AwYQt9gHikFLAlAqUV-5HsEBZCusqqpyOZKne7pLov1JnaBUCAAX6UyJ7p6SCzRwvKAr9734HrdJN~YII-yxUUsXDLcACGGiYCwO~V86Msprg__'}
                name={'Main Wallet'}
            />
            <WalletHeaderList/>
            <WalletHeaderIcons/>
        </div>
    </header>
}