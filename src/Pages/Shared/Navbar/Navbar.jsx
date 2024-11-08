
import { useContext, useEffect, useState } from 'react';
import '../../../assets/custom css/custom.css';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Authentication/AuthProvider/AuthProvider';



const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const handleLogOut = () => {
        logOut();
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleProfileClick = () => {
        if (user && user.student_id) {
            navigate(`/studentprofile/${user.student_id}`);
        }
        console.log("Student ID:", user?.student_id);
    };

     useEffect(() => {
        console.log("User data:", user);
    }, [user]);

    return (
        <div className="w-full themeColor fixed top-0 left-0 z-50">
            <div className="navbar max-w-7xl mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content themeColor rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <Link to="/"> <li className='font-bold text-blue-900 iiuc text-sm'><a>Home</a></li></Link>
                            <li className='font-bold text-blue-900 iiuc text-sm'>
                                <a>Supervisors</a>
                                <ul className="p-2">
                                    <Link to="/supervisors/select-supervisor">Select Supervisor</Link>
                                    <Link to="/supervisors/my-supervisor">My Supervisor</Link>
                                </ul>
                            </li>
                            <li className='font-bold text-blue-900 iiuc text-sm'>
                                <a>Submissions</a>
                                <ul className="p-2">
                                    <li><a>Submit Proposal</a></li>
                                    <li><a>Pre-Defense</a></li>
                                    <li><a>Defense</a></li>
                                </ul>
                            </li>
                            <Link to="/research"> <li className='font-bold text-blue-900 iiuc text-sm'><a>Research</a></li></Link>
                        </ul>
                    </div>
                    <a className="flex flex-col items-center text-xl">
                        <img src='/iiuc_logo.png' alt="logo" className="w-14 h-14 mr-2" />
                        {/*<h6 className="text-center font-extrabold text-blue-900 iiuc text-sm">International Islamic University <br /> Chittagong</h6>*/}
                    </a>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <Link to="/"> <li className='font-bold text-blue-900 iiuc text-sm'><a>Home</a></li></Link>
                        <li>
                            <details>
                                <summary className='font-bold text-blue-900 iiuc text-sm'>Supervisors</summary>
                                <ul className="p-2 ">
                                <Link to={`/supervisors/select-supervisor/${user?.student_id}`}>Select Supervisor</Link>
                                <Link to="/supervisors/my-supervisor">My Supervisor</Link>
                                </ul>
                            </details>
                        </li>
                        <li>
                            <details>
                                <summary className='font-bold text-blue-900 iiuc text-sm'>Submissions</summary>
                                <ul className="p-2 ">
                                    <li><a>Submit Proposal</a></li>
                                    <li><a>Pre-Defense</a></li>
                                    <li><a>Defense</a></li>
                                </ul>
                            </details>
                        </li>
                        <Link to="/research"> <li className='font-bold text-blue-900 iiuc text-sm'><a>Research</a></li></Link>
                    </ul>
                </div>

                {
                    user ? (
                        <div className='flex items-center justify-center'>
                            <img
                                src={user.photoURL || "/images/default-avatar.png"}
                                alt="User Profile"
                                onClick={toggleMenu}
                                className="w-10 h-10 rounded-full cursor-pointer"
                            />

                            {menuOpen && (
                                <div className="absolute top-full mt-2 right-30 w-48 themeColor shadow-lg rounded-lg">
                                    <ul>
                                        <li className='px-4 py-2 text-gray-700 font-bold'>{user.displayName}</li>
                                        <li
                                            className="px-4 py-2 text-gray-700 hover:bg-purple-300 cursor-pointer"
                                            onClick={handleProfileClick}
                                        >
                                            My Profile
                                        </li>
                                        <li
                                            className="px-4 py-2 text-gray-700 hover:bg-purple-300 cursor-pointer"
                                            onClick={handleLogOut}
                                        >
                                            Logout
                                        </li>
                                    </ul>
                                </div>
                            )}




                        </div>

                    ) :
                        (
                            <div className="navbar-end space-x-2">
                                <Link to="/login" className="btn bg-yellow-300 hover:bg-yellow-400 ">Login</Link>
                                <Link to="/signup" className="btn bg-yellow-300 hover:bg-yellow-400">SignUp</Link>
                            </div>
                        )
                }


            </div>
        </div>
    );
};

export default Navbar;
