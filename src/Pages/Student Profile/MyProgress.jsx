import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const MyProgress = () => {
    const { student_id } = useParams();
    console.log(student_id)
    const [existingTeam, setExistingTeam] = useState([])
    const [board, setBoard] = useState(null);
    
    useEffect(() => {
        fetch(`http://localhost:5000/thesis_details/${student_id}`)
            .then(response => response.json())
            .then(data => {
                setExistingTeam(data[0]);

            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [student_id]);
    console.log(existingTeam.title)

    useEffect(() => {
        fetch('http://localhost:5000/board_details')
            .then(response => response.json())
            .then(data => setBoard(data))
            .catch(error => console.error('Error fetching board details:', error));
    }, []);

    const title = existingTeam?.title; 
    const boardStatus = board?.[0]?.status[title]; 

   

    return (
        <div>
            <h2 className="text-xl font-bold text-purple-800 mb-5 text-center">My Progress</h2>
            <div className="p-6 bg-gray-100 rounded shadow max-w-md mx-auto md:max-w-lg lg:max-w-xl mb-10">
                <h2 className="text-xl font-bold text-purple-800 mb-5 text-center">Proposal</h2>

                <div className="mb-6 ">
                    <p className='mb-2'><strong>Proposal :</strong>
                        {existingTeam && existingTeam.proposal ? (
                            <a
                                href={`http://localhost:5000/${existingTeam.proposal}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className='btn  btn-outline btn-sm bg-purple-700 text-white ms-3 font-bold'
                            >
                                View
                            </a>
                        ) : (
                            <span>PDF not available</span>
                        )}
                    </p>
                    <p className='mb-2'>
                        <strong>Supervisor Decision: </strong>
                        <span
                            className={`font-bold ${existingTeam && existingTeam.proposal_status === "Accepted"
                                ? "text-green-600"
                                : existingTeam &&  existingTeam.proposal_status === "Rejected"
                                    ? "text-red-600"
                                    : "text-orange-600"
                                }`}
                        >
                            {existingTeam && existingTeam.proposal_status || "Pending"}
                        </span>
                    </p>
                    <p className='mb-2'><strong>Supervisor Feedback :</strong> {existingTeam && existingTeam.proposal_feedback_sup} </p>
                    <p className='mb-2 text-green-600 font-bold'><strong className='text-black font-bold'>Board Decision: </strong>{boardStatus ? boardStatus.proposal_boardstatus : 'Pending'}</p>
                    
                    
                </div>
            </div>

            <div className="p-6 bg-gray-100 rounded shadow max-w-md mx-auto md:max-w-lg lg:max-w-xl mb-10">
                <h2 className="text-xl font-bold text-purple-800 mb-5 text-center">Pre Defence</h2>

                <div className="mb-6 ">
                    <p className='mb-2'><strong>Proposal :</strong>
                        {existingTeam && existingTeam.pre_defence ? (
                            <a
                                href={`http://localhost:5000/files/${existingTeam.pre_defence}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className='btn  btn-outline btn-sm bg-purple-700 text-white ms-3 font-bold'
                            >
                                View
                            </a>
                        ) : (
                            <span>PDF not available</span>
                        )}
                    </p>
                    <p className='mb-2'>
                        <strong>Supervisor Decision: </strong>
                        <span
                            className={`font-bold ${existingTeam && existingTeam.pre_defense_status === "Accepted"
                                ? "text-green-600"
                                : existingTeam && existingTeam.pre_defense_status === "Rejected"
                                    ? "text-red-600"
                                    : "text-orange-600"
                                }`}
                        >
                            {existingTeam &&  existingTeam.pre_defense_status || "Pending"}
                        </span>
                    </p>
                    <p className='mb-2'><strong>Supervisor Feedback :</strong> {existingTeam && existingTeam.pre_defense_feedback_sup} </p>
                    <p className='mb-2 text-green-600 font-bold'><strong className='text-black font-bold'>Board Decision: </strong>{boardStatus ? boardStatus.preDefense_boardstatus : 'Pending'}</p>
                   


                </div>
            </div>

            <div className="p-6 bg-gray-100 rounded shadow max-w-md mx-auto md:max-w-lg lg:max-w-xl mb-10">
                <h2 className="text-xl font-bold text-purple-800 mb-5 text-center">Defence</h2>

                <div className="mb-6 ">
                    <p className='mb-2'><strong>Defence :</strong>
                        {existingTeam && existingTeam.defence ? (
                            <a
                                href={`http://localhost:5000/files/${existingTeam.defence}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className='btn  btn-outline btn-sm bg-purple-700 text-white ms-3 font-bold'
                            >
                                View
                            </a>
                        ) : (
                            <span>PDF not available</span>
                        )}
                    </p>
                    <p className='mb-2'>
                        <strong>Supervisor Decision: </strong>
                        <span
                            className={`font-bold ${existingTeam && existingTeam.defense_status === "Accepted"
                                ? "text-green-600"
                                : existingTeam && existingTeam.defense_status === "Rejected"
                                    ? "text-red-600"
                                    : "text-orange-600"
                                }`}
                        >
                            {existingTeam && existingTeam.defense_status || "Pending"}
                        </span>
                    </p>
                    <p className='mb-2'><strong>Supervisor Feedback :</strong> {existingTeam &&  existingTeam.defence_feedback_sup} </p>
                    <p className='mb-2 text-green-600 font-bold'><strong className='text-black font-bold'>Board Decision: </strong>{boardStatus ? boardStatus.defense_boardstatus : 'Pending'}</p>
                    


                </div>
            </div>
        </div>
    );
};

export default MyProgress;