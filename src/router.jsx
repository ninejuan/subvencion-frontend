import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import C404 from "./pages/404";
import GoogleSignIn from "./pages/signin";
import SubsidyDetail from "./pages/detail";
import Mypage from "./pages/mypage";
import Main from "./pages/main";
import MenuLayout from "./layouts/MenuLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <MenuLayout></MenuLayout>,
        children: [
          {
            path: "",
            element: <Main />,
          },
          {
            path: "signin",
            element: <GoogleSignIn />,
          },
          {
            path: "detail/:id",
            element: <SubsidyDetail />,
          },
          {
            path: "mypage",
            element: <Mypage />,
          },
        ],
      },
    ],
    errorElement: <C404 />,
  }
]);

export default router;
