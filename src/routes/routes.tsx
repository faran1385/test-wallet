import {createBrowserRouter} from "react-router-dom";
import {MainLayout} from "../layouts/MainLayout/MainLayout.tsx";
import {WalletProcess} from "../components/ui/WalletProcess/WalletProcess.tsx";
import {Wallet} from "../components/ui/Wallet/Wallet.tsx";
import TestPage from "../testPage.tsx";
import {WalletLayout} from "../layouts/WalletLayout/WalletLayout.tsx";
import {ManageAssets} from "../components/ui/ManageAssets/ManageAssets.tsx";

const routes = createBrowserRouter([
    {
        element: <MainLayout/>,
        children: [
            {
                path: "/",
                element: <WalletProcess/>,
            },
            {
                path: "/test",
                element: <TestPage/>,
            },
        ],
    },
    {
        element: <WalletLayout/>,
        children: [
            {
                path: "wallet",
                element: <Wallet/>,
            },
            {
                path: "wallet/manage-assets",
                element: <ManageAssets/>,
            }
        ]
    }
]);

export default routes;
