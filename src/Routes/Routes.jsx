import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import PreviousThesis from "../Pages/AllResearch/AllResearch";
import StudentProfile from "../Pages/Student Profile/StudentProfile";
import InstructorProfile from "../Pages/Instructor Profile/InstructorProjile";

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
          path:`/studentprofile/:student_id`,
          element: <StudentProfile></StudentProfile>
        },
        {
          path:`/instructorprofile/:_id`,
          element: <InstructorProfile></InstructorProfile>
        }
      ]
    },
  ]);

  export default router;