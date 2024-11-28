import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const StudentWorks = () => {
    const { _id } = useParams();
    const [instructor, setInstructor] = useState(null);
    const [allThesis, setAllThesis] = useState([]);
    const [instructorThesis, setInstructorThesis] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/instructor_details/${_id}`)
            .then(response => response.json())
            .then(data => {
                setInstructor(data.name);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [_id]);

    useEffect(() => {
        fetch(`http://localhost:5000/all_thesis`)
            .then(response => response.json())
            .then(data => {
                setAllThesis(data);
                const thesisForInstructor = data.filter(thesis => thesis.supervisor === instructor);
                setInstructorThesis(thesisForInstructor);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [instructor]);

    const handleFeedback = (status, index) => {
        Swal.fire({
            title: 'Provide Feedback',
            input: 'textarea',
            inputLabel: 'Your Feedback',
            inputPlaceholder: 'Type your feedback here...',
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                const feedback = result.value;

                const updatedThesis = [...instructorThesis];
                updatedThesis[index].proposal_status = status;
                updatedThesis[index].proposal_feedback_sup = feedback;
                setInstructorThesis(updatedThesis);

                fetch(`http://localhost:5000/update_proposal/${updatedThesis[index].team}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        proposal_status: status,
                        proposal_feedback_sup: feedback,
                    }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log('Update successful:', data);
                    })
                    .catch((error) => {
                        console.error('Error updating data:', error);
                    });
            }
        });
    };


    const handleFeedbackPre = (status, index) => {
        Swal.fire({
            title: 'Provide Feedback',
            input: 'textarea',
            inputLabel: 'Your Feedback',
            inputPlaceholder: 'Type your feedback here...',
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                const feedback = result.value;

                const updatedThesis = [...instructorThesis];
                updatedThesis[index].pre_defense_status = status;
                updatedThesis[index].pre_defense_feedback_sup = feedback;
                setInstructorThesis(updatedThesis);

                fetch(`http://localhost:5000/update_pre_defense/${updatedThesis[index].team}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        pre_defense_status: status,
                        pre_defense_feedback_sup: feedback,
                    }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log('Update successful:', data);
                    })
                    .catch((error) => {
                        console.error('Error updating data:', error);
                    });
            }
        });
    };

    const handleFeedbackDefence = (status, index) => {
        Swal.fire({
            title: 'Provide Feedback',
            input: 'textarea',
            inputLabel: 'Your Feedback',
            inputPlaceholder: 'Type your feedback here...',
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                const feedback = result.value;
    
                const updatedThesis = [...instructorThesis];
                updatedThesis[index].defense_status = status;
                updatedThesis[index].defence_feedback_sup = feedback;
                setInstructorThesis(updatedThesis);
    
                fetch(`http://localhost:5000/update_defense/${updatedThesis[index].team}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        defense_status: status,
                        defence_feedback_sup: feedback,
                    }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log('Update successful:', data);
                    })
                    .catch((error) => {
                        console.error('Error updating data:', error);
                    });
            }
        });
    };
    
    console.log(instructorThesis)
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4 text-center text-purple-800">Student Works</h2>

            {instructorThesis.length > 0 ? (
                <div>
                    {instructorThesis.map((thesis, index) => (
                        <div key={index} className="mb-6">
                            <p className="mb-3">
                                <strong>Team :</strong> {thesis.team}
                            </p>
                            <p className="mb-3">
                                <strong>Type :</strong> {thesis.type}
                            </p>
                            <p className="mb-3">
                                <strong>Title :</strong> {thesis.title}
                            </p>
                            <p className="mb-3">
                                <strong>Student ID :</strong> {thesis.student_ids.join(', ')}
                            </p>
                            <p className="mb-3">
                                <strong>Student Name:</strong> {thesis.student_name.join(', ')}
                            </p>

                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-300">
                                    <thead>
                                        <tr className="bg-purple-200 text-purple-800">
                                            <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-semibold">Proposal</th>
                                            <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-semibold">Proposal Status</th>
                                            <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-semibold ">Proposal Feedback</th>
                                            <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-semibold px-12">Pre Defense</th>
                                            <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-semibold">Pre Defense Status</th>
                                            <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-semibold ">Pre Defense Feedback</th>
                                            <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-semibold">Defense</th>
                                            <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-semibold">Defense Status</th>
                                            <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-semibold ">Defense Feedback</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="px-6 py-4 border-b border-gray-300 text-sm">
                                                {thesis.proposal ? (
                                                    <a
                                                        href={`http://localhost:5000/${thesis.proposal}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="btn btn-outline btn-sm bg-purple-700 text-white ms-3 font-bold"
                                                    >
                                                        Proposal
                                                    </a>
                                                ) : (
                                                    <span className="text-red-500">Not Submitted</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 border-b border-gray-300 text-sm">
                                                {thesis.proposal && (thesis.proposal_status === 'Pending' || thesis.proposal_status === null) ? (
                                                    <div className="flex items-center justify-center">
                                                        <button
                                                            className="btn btn-outline btn-success btn-xs me-3"
                                                            onClick={() => handleFeedback('Accepted', index)}
                                                        >
                                                            Accept
                                                        </button>
                                                        <button
                                                            className="btn btn-outline btn-error btn-xs"
                                                            onClick={() => handleFeedback('Rejected', index)}
                                                        >
                                                            Reject
                                                        </button>
                                                    </div>
                                                ) : thesis.proposal_status ? (
                                                    <span
                                                        className={`text-${thesis.proposal_status === 'Accepted' ? 'green' : 'red'}-500`}
                                                    >
                                                        {thesis.proposal_status}
                                                    </span>
                                                ) : (
                                                    <span className="text-red-500">Not Submitted</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 border-b border-gray-300 text-sm ">
                                                {thesis.proposal_feedback_sup ? (
                                                    <div className="font-bold">{thesis.proposal_feedback_sup}</div>
                                                ) : (
                                                    <span className="text-red-500">No Feedback</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 border-b border-gray-300 text-sm">
                                                {thesis.pre_defence ? (
                                                    <a
                                                        href={`http://localhost:5000/files/${thesis.pre_defence}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="btn btn-outline btn-sm bg-purple-700 text-white ms-3 font-bold"
                                                    >
                                                        Pre Defense
                                                    </a>
                                                ) : (
                                                    <span className="text-red-500">Not Submitted</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 border-b border-gray-300 text-sm">
                                                {instructorThesis[index].pre_defence && (instructorThesis[index].pre_defense_status === "Pending" || instructorThesis[index].pre_defense_status === null) ? (
                                                    <div className="flex items-center justify-center">
                                                        <button
                                                            className="btn btn-outline btn-success btn-xs me-3"
                                                            onClick={() => handleFeedbackPre("Accepted", index)}
                                                        >
                                                            Accept
                                                        </button>
                                                        <button
                                                            className="btn btn-outline btn-error btn-xs"
                                                            onClick={() => handleFeedbackPre("Rejected", index)}
                                                        >
                                                            Reject
                                                        </button>
                                                    </div>
                                                ) : instructorThesis[index].pre_defense_status ? (
                                                    <span className={`text-${instructorThesis[index].pre_defense_status === 'Accepted' ? 'green' : 'red'}-500`}>
                                                        {instructorThesis[index].pre_defense_status}
                                                    </span>
                                                ) : (
                                                    <span className="text-red-500">Not Submitted</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 border-b border-gray-300 text-sm ">
                                                {thesis.pre_defense_feedback_sup ? (
                                                    <div className="font-bold">{thesis.pre_defense_feedback_sup}</div>
                                                ) : (
                                                    <span className="text-red-500">No Feedback</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 border-b border-gray-300 text-sm">
                                                {thesis.defence ? (
                                                    <a
                                                        href={`http://localhost:5000/files/${thesis.defence}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="btn btn-outline btn-sm bg-purple-700 text-white ms-3 font-bold"
                                                    >
                                                        Defense
                                                    </a>
                                                ) : (
                                                    <span className="text-red-500">Not Submitted</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 border-b border-gray-300 text-sm">
                                                {instructorThesis[index].defence && (instructorThesis[index].defense_status === "Pending" || instructorThesis[index].defense_status === null) ? (
                                                    <div className="flex items-center justify-center">
                                                        <button
                                                            className="btn btn-outline btn-success btn-xs me-3"
                                                            onClick={() => handleFeedbackDefence("Accepted", index)}
                                                        >
                                                            Accept
                                                        </button>
                                                        <button
                                                            className="btn btn-outline btn-error btn-xs"
                                                            onClick={() => handleFeedbackDefence("Rejected", index)}
                                                        >
                                                            Reject
                                                        </button>
                                                    </div>
                                                ) : instructorThesis[index].defense_status ? (
                                                    <span className={`text-${instructorThesis[index].defense_status === 'Accepted' ? 'green' : 'red'}-500`}>
                                                        {instructorThesis[index].defense_status}
                                                    </span>
                                                ) : (
                                                    <span className="text-red-500">Not Submitted</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 border-b border-gray-300 text-sm ">
                                                {thesis.defence_feedback_sup ? (
                                                    <div className="font-bold">{thesis.defence_feedback_sup}</div>
                                                ) : (
                                                    <span className="text-red-500">No Feedback</span>
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No thesis data available for this instructor.</p>
            )}
        </div>
    );
};

export default StudentWorks;
