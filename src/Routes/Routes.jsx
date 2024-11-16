import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import PreviousThesis from "../Pages/AllResearch/AllResearch";
import StudentProfile from "../Pages/Student Profile/StudentProfile";
import InstructorProfile from "../Pages/Instructor Profile/InstructorProjile";
import SubmitProposal from "../Pages/Submissions/SubmitProposal";
import SubmitPreDefence from "../Pages/Submissions/SubmitPreDefence";
import SubmitDefence from "../Pages/Submissions/SubmitDefence";

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
        },
        {
          path:`/submitproposal/:student_id`,
          element: <SubmitProposal></SubmitProposal>
        },
        {
          path:`/submitpre_defence/:student_id`,
          element: <SubmitPreDefence></SubmitPreDefence>
        },
        {
          path:`/submit_defence/:student_id`,
          element: <SubmitDefence></SubmitDefence>
        },
      ]
    },
  ]);

  export default router;