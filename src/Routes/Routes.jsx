import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import SelectSupervisor from "../Pages/Supervisors/SelectSupervisor";
import MySupervisor from "../Pages/Supervisors/MySupervisor";
import PreviousThesis from "../Pages/AllResearch/AllResearch";
import StudentProfile from "../Pages/Student Profile/StudentProfile";
import Login from "../Authentication/Login/Login";
import SignUp from "../Authentication/SignUp/SignUp";
import InstructorProfile from "../Pages/Instructor Profile/InstructorProjile";


import AdminDashboard from "../Pages/AdminDashboard/AdminHome/AdminDashboard";
import SubmitProposal from "../Pages/Submissions/SubmitProposal";
import SubmitPreDefence from "../Pages/Submissions/SubmitPreDefence";
import SubmitDefence from "../Pages/Submissions/SubmitDefence";

import SupervisorAssign from "../Pages/AdminDashboard/SupervisorAssign";
import ManageBoard from "../Pages/AdminDashboard/ManageBoard";
import Board from "../Pages/Board/Board";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/research",
        element: <PreviousThesis></PreviousThesis>,
      },
      {
        path: `/studentprofile/:student_id`, 
        element: <StudentProfile></StudentProfile>,
      },
      {
        path: `/instructorprofile/:_id`,
        element: <InstructorProfile></InstructorProfile>,
      },
      {
        path: `/submitproposal/:student_id`,
        element: <SubmitProposal></SubmitProposal>,
      },
      {
        path: `/submitpre_defence/:student_id`,
        element: <SubmitPreDefence></SubmitPreDefence>,
      },
      {
        path: `/submit_defence/:student_id`,
        element: <SubmitDefence></SubmitDefence>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/supervisors",
        children: [
          {
            path: `select-supervisor/:student_id`,
            element: <SelectSupervisor></SelectSupervisor>,
          },
          {
            path: "/supervisors/my-supervisor/:student_id",
            element: <MySupervisor></MySupervisor>,
          },
        ],
      },
    ],
  },
  {
    path: "admin-dashboard",
    element: <AdminDashboard></AdminDashboard>,
    children: [
      {
        path: "assign-supervisor",
        element: <SupervisorAssign></SupervisorAssign> 
      },
      {
        path: "manage-board",
        element: <ManageBoard></ManageBoard>, 
      },
      {
        path: "board",
        element: <Board></Board>,
      }
    ],
  },

]);

export default router;
