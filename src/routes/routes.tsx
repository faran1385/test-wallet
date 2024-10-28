import {createBrowserRouter} from "react-router-dom";
import {MainLayout} from "../layouts/MainLayout/MainLayout.tsx";
import {WalletProcess} from "../components/ui/WalletProcess/WalletProcess.tsx";


const routes = createBrowserRouter([
    {
        element: <MainLayout/>,
        children: [
            {
                path: "/",
                element: <WalletProcess/>,
            },
        ],
    },
]);

export default routes;
