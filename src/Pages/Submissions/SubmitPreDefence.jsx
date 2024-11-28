import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const SubmitPreDefence = () => {
    const { student_id } = useParams();
    const [existingTeam, setExistingTeam] = useState({});
    const [pdfFile, setPdfFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!pdfFile) {
            Swal.fire('Error', 'Please upload a PDF file.', 'error');
            return;
        }

        const formData = new FormData();
        formData.append('pdfFile', pdfFile);
        formData.append('team', existingTeam.team);

        try {
            const response = await fetch('http://localhost:5000/submit_pre_defence', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                Swal.fire('Success', 'Report submitted successfully!', 'success');
                setPdfFile(null);
                window.location.reload();
            } else {
                Swal.fire('Error', data.error || 'Submission failed', 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'Network error. Please try again later.', 'error');
        }
    };

    const handleFileChange = (e) => {
        setPdfFile(e.target.files[0]);
    };

    useEffect(() => {
        const fetchProjectInfo = async () => {
            try {
                const response = await fetch(`http://localhost:5000/thesis_details/${student_id}`);
                const data = await response.json();
                setExistingTeam(data[0] || {});
            } catch (error) {
                console.error('Error fetching project details:', error);
                setExistingTeam({});
            }
        };

        fetchProjectInfo();
    }, [student_id]);
    console.log(existingTeam.pre_defence)
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md pt-10 mt-24 mb-24">
            <h2 className="text-2xl font-extrabold mb-8 text-center text-purple-600">Pre Defence</h2>
            {existingTeam && existingTeam.proposal_status === 'Accepted' ? (

                <div>
                    {existingTeam.pre_defense_status === "Pending" ?
                        (
                            <p className='mb-6 rounded-md text-orange-400 font-bold bg-orangr-100 border-2 border-orange-300 py-2 text-center'>Pending</p>
                        ) : existingTeam.pre_defense_status === "Accepted" ?
                            (
                                <p className='mb-6 rounded-md text-green-700 font-bold bg-green-100 border-2 border-green-700 py-2 text-center'>Accepted</p>

                            ) : existingTeam.pre_defense_status === "Rejected" ?
                                <p className='mb-6 rounded-md text-red-500 bg-pink-100 border-2 border-red-300 py-2 text-center'>Your previous work has been rejected . Please submit again. </p>
                                : (<p></p>)
                    }
                    <p className='mb-2'><strong>Team :</strong> {existingTeam.team}</p>
                    <p className='mb-2'><strong>Type:</strong> {existingTeam.type}</p>
                    <p className='mb-2'><strong>Title:</strong> {existingTeam.title}</p>
                    <p className='mb-2'><strong>Supervisor:</strong> {existingTeam.supervisor}</p>
                    <p className='mb-2'><strong>Proposal Feedback:</strong> {existingTeam.proposal_feedback_sup}</p>


                    <p className=''><strong>Pre-Defence Report : </strong>
                        {
                            existingTeam.pre_defence === null || existingTeam.pre_defense_status === "Rejected"  ? (
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="pdfFile" className="block text-gray-700 font-bold">
                                            Upload Pre-Defence Report (PDF)
                                        </label>
                                        <input
                                            type="file"
                                            id="pdfFile"
                                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                            accept=".pdf"
                                            onChange={handleFileChange}
                                            required
                                        />
                                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 mt-4 rounded-md hover:bg-blue-600">
                                            Submit Report
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <a
                                    href={`http://localhost:5000/files/${existingTeam.pre_defence}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className='btn  btn-outline btn-sm bg-purple-700 text-white ms-3 font-bold'
                                >
                                    View
                                </a>

                            )
                        }
                    </p>
                </div>
            ) : (
                <p className="text-center text-red-500 font-bold">
                    {existingTeam.proposal_status !== 'Accepted'
                        ? "Your proposal hasn't been accepted yet."
                        : 'Please submit your proposal first.'}
                </p>
            )}
        </div>
    );
};

export default SubmitPreDefence;
