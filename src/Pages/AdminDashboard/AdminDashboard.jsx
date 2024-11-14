import { useState } from "react";
import BoardMembers from "./BoardMembers";
import { FaBars } from "react-icons/fa6";
import Navbar from "../Shared/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Shared/Footer/Footer";
// import StudentProfile from "../Student Profile/StudentProfile"; // Import pages that you want to display
// import InstructorProfile from "../Instructor Profile/InstructorProfile"; // Import the corresponding components
// import AllThesis from "../AllResearch/AllResearch"; // Same for other components

const AdminDashboard = () => {

    const [currentPage, setCurrentPage] = useState('AdminDashboard');

    const renderPage = () => {
        switch (currentPage) {
            case 'StudentProfile':
                return; // Make sure to render the correct component
            case 'InstructorProfile':
                return; // Same for this one
            case 'AllThesis':
                return; // Same for AllThesis
            case 'BoardMembers':
                return <BoardMembers />; // Render BoardMembers component
            default:
                return <div>Welcome to Admin Dashboard</div>; // You can display the admin dashboard main content here
        }
    };

    return (
        <div>
            
            
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

                <div className="drawer-content flex flex-col items-center justify-center p-6 bg-gray-100">
                    <div className="bg-white shadow rounded-lg p-4 md:p-6 lg:p-8 w-full max-w-3xl">
                        <label htmlFor="my-drawer-2" className="btn btn-primary bg-purple-400 mt-10 drawer-button lg:hidden mb-4 ">
                            <FaBars />
                        </label>
                        {renderPage()} {/* This renders the correct page based on the currentPage */}
                    </div>
                </div>

                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-purple-500 text-white min-h-full w-80 p-4 space-y-4 pt-20 font-bold text-lg">
                        <li>
                            <button onClick={() => setCurrentPage('AdminDashboard')} className="w-full text-left">
                                Admin Dashboard
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setCurrentPage('StudentProfile')} className="w-full text-left">
                                Student Profile
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setCurrentPage('InstructorProfile')} className="w-full text-left">
                                Instructor Profile
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setCurrentPage('AllThesis')} className="w-full text-left">
                                All Thesis
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setCurrentPage('BoardMembers')} className="w-full text-left">
                                Board Members
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            
            <Outlet></Outlet>
        </div>

    );
};

export default AdminDashboard;
