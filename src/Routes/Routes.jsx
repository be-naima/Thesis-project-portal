import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import PreviousThesis from "../Pages/AllResearch/AllResearch";
import StudentProfile from "../Pages/Student Profile/StudentProfile";

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
        },
        {
          path:`/studentprofile/:student_id`,//route will be dynamic change 
          element: <StudentProfile></StudentProfile>
        }
      ]
    },
  ]);

  export default router;