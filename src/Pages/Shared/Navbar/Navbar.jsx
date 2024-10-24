<<<<<<< HEAD

import logo from '../../../assets/pictures/iiuc_logo.png';
=======
import React from 'react';
>>>>>>> c47f0ca9ab6949fc3e215204ca3893b96d736877
import '../../../assets/custom css/custom.css';

const Navbar = () => {
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
                            <li className='font-bold text-blue-900 iiuc text-sm'><a>Home</a></li>
                            <li className='font-bold text-blue-900 iiuc text-sm'>
                                <a>Supervisors</a>
                                <ul className="p-2">
                                    <li><a>Select Supervisor</a></li>
                                    <li><a>My Supervisor</a></li>
                                </ul>
                            </li>
                            <li className='font-bold text-blue-900 iiuc text-sm'>
                                <a>Submissions</a>
                                <ul className="p-2">
                                    <li><a>Submit Proposal</a></li>
                                    <li><a>Pre-Defence</a></li>
                                    <li><a>Defence</a></li>
                                </ul>
                            </li>
                            <li className='font-bold text-blue-900 iiuc text-sm'><a>Previous Thesis</a></li>
                        </ul>
                    </div>
                    <a className="flex flex-col items-center text-xl">
                        <img src='iiuc_logo.png' alt="logo" className="w-14 h-14 mr-2" />
                        {/*<h6 className="text-center font-extrabold text-blue-900 iiuc text-sm">International Islamic University <br /> Chittagong</h6>*/}
                    </a>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li className='font-bold text-blue-900 iiuc text-sm'><a>Home</a></li>
                        <li>
                            <details>
                                <summary className='font-bold text-blue-900 iiuc text-sm'>Supervisors</summary>
                                <ul className="p-2 ">
                                    <li><a>Select Supervisor</a></li>
                                    <li><a>My Supervisor</a></li>
                                </ul>
                            </details>
                        </li>
                        <li>
                            <details>
                                <summary className='font-bold text-blue-900 iiuc text-sm'>Submissions</summary>
                                <ul className="p-2 ">
                                    <li><a>Submit Proposal</a></li>
                                    <li><a>Pre-Defence</a></li>
                                    <li><a>Defence</a></li>
                                </ul>
                            </details>
                        </li>
                        <li className='font-bold text-blue-900 iiuc text-sm'><a>Previous Thesis</a></li>
                    </ul>
                </div>

                <div className="navbar-end">
                    <a className="btn login-btn btn-sm">Login</a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
