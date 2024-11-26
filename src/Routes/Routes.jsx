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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/research',
        element: <PreviousThesis></PreviousThesis>
      },
      {
        path: `/studentprofile/:student_id`,//route will be dynamic change 
        element: <StudentProfile></StudentProfile>
      },
      {
        path: `/instructorprofile/:_id`,
        element: <InstructorProfile></InstructorProfile>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/signup',
        element: <SignUp></SignUp>
      },
      {
        path: '/supervisors',
        children: [
          {
            path: `select-supervisor/:student_id`,
            element: <SelectSupervisor></SelectSupervisor>
          },
          {
            path: 'my-supervisor',
            element: <MySupervisor></MySupervisor>
          }
        ]
      },

    ]
  },
  {
    path: "admin-dashboard",
    element: <AdminDashboard></AdminDashboard>
    

  }
]);




export default router;