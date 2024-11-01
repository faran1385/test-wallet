import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout/MainLayout.tsx";
import { WalletProcess } from "../components/ui/WalletProcess/WalletProcess.tsx";
import { Wallet } from "../components/ui/Wallet/Wallet.tsx";
import TestPage from "../testPage.tsx";

const routes = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <WalletProcess />,
      },
      {
        path: "/wallet",
        element: <Wallet />,
      },
      {
        path: "/test",
        element: <TestPage />,
      },
    ],
  },
]);

export default routes;
