import { AssetsHeader } from "./AssetsHeader/AssetsHeader.tsx";
import { AssetsContent } from "./AssetsContent/AssetsContent.tsx";

interface Props {
  data: any;
  loading: boolean;

}
export const Assets = ({ data, loading }: Props) => {
  console.log("loading,", data, loading);
  return (
    <div>
      <AssetsHeader />
      {!loading &&
        data?.accounts?.map((i: any, m: any) => (
          <AssetsContent
            key={m}
            assets={i?.assets}
            address={i?.address}
            networkType={i?.networkName}
          />
        ))}
    </div>
  );
};
