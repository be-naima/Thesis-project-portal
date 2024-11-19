import { FaBars } from "react-icons/fa6";
import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content flex flex-col items-center justify-center p-6 bg-gray-100">
                <div className="bg-white shadow rounded-lg p-4 md:p-6 lg:p-8 w-full max-w-3xl">
                    <label htmlFor="my-drawer-2" className="btn btn-primary bg-purple-400 mt-10 drawer-button lg:hidden mb-4">
                        <FaBars />
                    </label>
                    <Outlet />
                </div>
            </div>

            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-purple-500 text-white min-h-full w-80 p-4 space-y-4 pt-20 font-bold text-lg">
                    <li>
                        <Link to="/admin-dashboard" className="w-full text-left">
                            Admin Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin-dashboard/student-profile" className="w-full text-left">
                            Student Profile
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin-dashboard/instructor-profile" className="w-full text-left">
                            Instructor Profile
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin-dashboard/all-thesis" className="w-full text-left">
                            All Thesis
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin-dashboard/manage-board" className="w-full text-left">
                        Manage Board
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default AdminDashboard;
