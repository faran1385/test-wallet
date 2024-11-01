import {createBrowserRouter} from "react-router-dom";
import {MainLayout} from "../layouts/MainLayout/MainLayout.tsx";
import {WalletProcess} from "../components/ui/WalletProcess/WalletProcess.tsx";
<<<<<<< HEAD
import {Wallet} from "../components/ui/Wallet/Wallet.tsx";
=======
import TestPage from "../testPage.tsx";
>>>>>>> b266a54 (add balances api)


const routes = createBrowserRouter([
    {
        element: <MainLayout/>,
        children: [
            {
                path: "/",
                element: <WalletProcess/>,
            },
            {
<<<<<<< HEAD
                path: "/wallet",
                element: <Wallet/>,
=======
                path: "/test",
                element: <TestPage/>,
>>>>>>> b266a54 (add balances api)
            },
        ],
    },
]);

export default routes;
