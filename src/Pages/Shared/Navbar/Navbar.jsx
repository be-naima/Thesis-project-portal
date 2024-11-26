import { useContext, useEffect, useState } from 'react';
import '../../../assets/custom css/custom.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../Authentication/AuthProvider/AuthProvider';

const Navbar = () => {
    const { student_id } = useParams();
    const { user, logOut } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false); 
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut();
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        setProfileMenuOpen(false); 
    };

    const toggleProfileMenu = () => {
        setProfileMenuOpen(!profileMenuOpen);
        setMenuOpen(false); 
    };

    const handleProfileClick = () => {
        if (user && user.student_id) {
            navigate(`/studentprofile/${user.student_id}`);
        }
        console.log("Student ID:", user?.student_id);
    };

    const handleMenuClick = () => {
        setMenuOpen(false); 
    };

    useEffect(() => {
        console.log("User data:", user);
    }, [user]);

    return (
        <div className="w-full themeColor fixed top-0 left-0 z-50">
            <div className="navbar max-w-7xl mx-auto">
                <div className="navbar-start flex justify-between w-full">
                    <div className="flex items-center">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden"
                            onClick={toggleMenu}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        <a className="flex flex-col items-center text-xl">
                            <img src='/iiuc_logo.png' alt="logo" className="w-14 h-14 mr-2" />
                        </a>
                    </div>

                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            <Link to="/" onClick={handleMenuClick}>
                                <li className="font-bold text-blue-900 iiuc text-sm"><a>Home</a></li>
                            </Link>
                            <li>
                                <details>
                                    <summary className="font-bold text-blue-900 iiuc text-sm">Supervisors</summary>
                                    <ul className="p-2 ">
                                        <Link to={`/supervisors/select-supervisor/${user?.student_id}`} onClick={handleMenuClick}>
                                            <li><a>Select Supervisor</a></li>
                                        </Link>
                                        <Link to={`/supervisors/my-supervisor/${user?.student_id}`} onClick={handleMenuClick}>
                                            <li><a> My Supervisor</a></li>
                                        </Link>
                                    </ul>
                                </details>
                            </li>
                            <li>
                                <details>
                                    <summary className="font-bold text-blue-900 iiuc text-sm">Submissions</summary>
                                    <ul className="p-2 ">
                                        <Link to={`/submitproposal/${student_id}`} onClick={handleMenuClick}>
                                            <li><a>Submit Proposal</a></li>
                                        </Link>
                                        <Link to={`/submitpre_defence/${student_id}`} onClick={handleMenuClick}>
                                            <li><a>Pre Defence</a></li>
                                        </Link>
                                        <Link to={`/submit_defence/${student_id}`} onClick={handleMenuClick}>
                                            <li><a>Defence</a></li>
                                        </Link>
                                    </ul>
                                </details>
                            </li>
                            <Link to="/research" onClick={handleMenuClick}>
                                <li className="font-bold text-blue-900 iiuc text-sm"><a>Research</a></li>
                            </Link>
                        </ul>
                    </div>
                    
                    {user ? (
                        <div className="flex items-center justify-center">
                            <img
                                src={ "/images/default-avatar.png"}
                                alt="User Profile"
                                onClick={toggleProfileMenu} 
                                className="w-10 h-10 rounded-full cursor-pointer"
                            />
                            {profileMenuOpen && (
                                <div className="absolute top-full mt-2 right-30 w-48 themeColor shadow-lg rounded-lg bg-white">
                                    <ul>
                                        <li className="px-4 py-2 text-gray-700 font-bold bg-white">{user.displayName}</li>
                                        <li
                                            className="px-4 py-2 text-gray-700 hover:bg-purple-300 cursor-pointer bg-white"
                                            onClick={handleProfileClick}
                                        >
                                            My Profile
                                        </li>
                                        <li
                                            className="px-4 py-2 text-gray-700 hover:bg-purple-300 cursor-pointer bg-white"
                                            onClick={handleLogOut}
                                        >
                                            Logout
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ):(<div className="">
                        <Link to="/login" className="btn login-btn btn-sm me-2">Login</Link>
                        <Link to="/signup" className="btn login-btn btn-sm">SignUp</Link>
                    </div>)}
                </div>
            </div>

            <div
                tabIndex={0}
                className={`menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow ${menuOpen ? 'block' : 'hidden'}`}
            >
                <Link to="/" onClick={handleMenuClick}>
                    <li className="font-bold text-blue-900 iiuc text-sm"><a>Home</a></li>
                </Link>
                <li className="font-bold text-blue-900 iiuc text-sm">
                    <a>Supervisors</a>
                    <ul className="p-2">
                        <Link to={`/supervisors/select-supervisor/${user?.student_id}`} onClick={handleMenuClick}>
                            <li><a>Select Supervisor</a></li>
                        </Link>
                        <Link to={`/supervisors/my-supervisor/${user?.student_id}`} onClick={handleMenuClick}>
                            <li><a> My Supervisor</a></li>
                        </Link>
                    </ul>
                </li>
                <li className="font-bold text-blue-900 iiuc text-sm">
                    <a>Submissions</a>
                    <ul className="p-2">
                        <Link to={`/submitproposal/${student_id}`} onClick={handleMenuClick}>
                            <li><a>Submit Proposal</a></li>
                        </Link>
                        <Link to={`/submitpre_defence/${student_id}`} onClick={handleMenuClick}>
                            <li><a>Pre Defence</a></li>
                        </Link>
                        <Link to={`/submit_defence/${student_id}`} onClick={handleMenuClick}>
                            <li><a>Defence</a></li>
                        </Link>
                    </ul>
                </li>
                <Link to="/research" onClick={handleMenuClick}>
                    <li className="font-bold text-blue-900 iiuc text-sm"><a>Research</a></li>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
