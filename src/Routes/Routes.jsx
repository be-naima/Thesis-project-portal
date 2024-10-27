import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import PreviousThesis from "../Pages/AllResearch/AllResearch";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:'/',
            element: <Home></Home>
        },
        {
          path:'/research',
          element: <PreviousThesis></PreviousThesis>
        }
      ]
    },
  ]);

  export default router;