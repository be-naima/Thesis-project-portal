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
import AllThesis from "../Pages/AdminDashboard/AllThesis";
import StudentDetails from "../Pages/AdminDashboard/StudentDetails";
import PrivateRoute from "./PrivateRoute";

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
        path: "board/:id",
        element: <PrivateRoute>
          <Board></Board>
        </PrivateRoute>,
      },

      {
        path: `/submitproposal/:student_id`,
        element: <PrivateRoute>
          <SubmitProposal></SubmitProposal>
        </PrivateRoute>,
      },
      {
        path: `/submitpre_defence/:student_id`,
        element: <PrivateRoute>
          <SubmitPreDefence></SubmitPreDefence>
        </PrivateRoute>,
      },
      {
        path: `/submit_defence/:student_id`,
        element: <PrivateRoute>
          <SubmitDefence></SubmitDefence>
        </PrivateRoute>,
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
            element: <PrivateRoute>
              <SelectSupervisor></SelectSupervisor>
            </PrivateRoute>,
          },
          {
            path: "/supervisors/my-supervisor/:student_id",
            element: <PrivateRoute>
              <MySupervisor></MySupervisor>
            </PrivateRoute>,
          },
        ],
      },
    ],
  },
  {
    path: "admin-dashboard",
    element: <PrivateRoute>
      <AdminDashboard></AdminDashboard>
    </PrivateRoute>,
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
        path: "all_thesis",
        element: <AllThesis></AllThesis>,
      },
      {
        path: "student_details",
        element: <StudentDetails></StudentDetails>,
      }
    ],
  },

]);

export default router;
