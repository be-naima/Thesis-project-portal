import React from 'react';
import { FaBookOpen, FaBullhorn, FaPerson, FaPersonDress } from 'react-icons/fa6';

const AdminCards = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <div className="bg-red-200 shadow-xl rounded-lg p-4 h-56 w-96">
                <div className="flex items-center mr-2 mb-2 mt-16">
                    <FaPersonDress className="h-14 w-14 text-blue-500" />
                    <div>
                        <h2 className="text-2xl text-purple-800 font-semibold mb-2">Total Students</h2>
                        <p className="text-green-700 text-3xl font-semibold">200</p>
                    </div>
                    

                </div>
               

            </div>
            <div className="bg-purple-200 shadow-xl rounded-lg p-4 h-56 w-96">
                <div className="flex items-center mb-2 mt-16">
                    <FaPerson className="h-14 w-14 text-green-500 " />
                    <div>
                        <h2 className="text-2xl text-purple-800 font-semibold mb-2">Total Instructors</h2>
                        <p className="text-blue-700 text-3xl font-semibold">350</p>
                    </div>


                </div>

            </div>
            <div className="bg-purple-200 shadow-xl rounded-lg p-4 h-56 w-96">
                <div className="flex items-center mb-2 mt-16">
                    <FaBookOpen className="h-14 w-14 mr-4 text-purple-500" />
                    <div>
                        <h2 className="text-2xl text-purple-800 font-semibold mb-2">All Thesis</h2>
                        <p className="text-red-700 text-3xl font-semibold">200</p>
                    </div>


                </div>

            </div>
            <div className="bg-red-200 shadow-xl rounded-lg p-4 h-56 w-96">
                <div className="flex items-center mb-2 mt-16">
                    <FaBullhorn className="h-14 w-14 mr-4 text-red-500" />
                    <div>
                        <h2 className="text-2xl text-purple-800 font-semibold mb-2">Announcement</h2>
                        <p className="text-purple-800 text-xl"> <span className='font-semibold'>Pre-Defense:</span> 30.11.2024</p>
                    </div>


                </div>

            </div>
        </div>
    );
};

export default AdminCards;
