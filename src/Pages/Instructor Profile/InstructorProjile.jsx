import React, { useState } from 'react';

import { FaBars } from 'react-icons/fa6';
import PersonalDetails from './PersonalDetails';
import StudentWorks from './StudentWorks';
import ViewBoard from './ViewBoard';
import StudentRequests from './StudentRequests';
import EditProfile from './EditProfile';

const InstructorProfile = () => {
    const [currentPage, setCurrentPage] = useState('PersonalDetails');

    const renderPage = () => {
        switch (currentPage) {
            case 'EditProfile':
                return <EditProfile />;
            case 'StudentRequests':
                return <StudentRequests />;
            case 'ViewBoard':
                return <ViewBoard />;
            case 'StudentWorks':
                return <StudentWorks />;
            default:
                return <PersonalDetails />;
        }
    };

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle " />


            <div className="drawer-content flex flex-col items-center justify-center p-6 bg-gray-100">
                <div className="bg-white shadow rounded-lg p-4 md:p-6 lg:p-8 w-full max-w-3xl">
                    <label htmlFor="my-drawer-2" className="btn btn-primary bg-purple-400 mt-10 drawer-button lg:hidden mb-4 ">
                        <FaBars />

                    </label>
                    {renderPage()}
                </div>
            </div>


            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-purple-500 text-white min-h-full w-80 p-4 space-y-4 pt-20 font-bold text-lg">
                    <li>
                        <button onClick={() => setCurrentPage('PersonalDetails')} className="w-full text-left">
                            Personal Details
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setCurrentPage('EditProfile')} className="w-full text-left">
                            Edit Profile
                        </button>
                    </li>
                   
                    <li>
                        <button onClick={() => setCurrentPage('ViewBoard')} className="w-full text-left">
                        View Board
                        </button>
                    </li>

                    <li>
                        <button onClick={() => setCurrentPage('StudentWorks')} className="w-full text-left">
                        Student Works
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default InstructorProfile;
