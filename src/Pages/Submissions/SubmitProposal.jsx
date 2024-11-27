import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

const SubmitProposal = () => {
    const { student_id } = useParams();

    const [teamName, setTeamName] = useState('');
    const [dept, setdept] = useState('');
    const [type, setType] = useState('');
    const [title, setTitle] = useState('');
    const [abstract, setAbstract] = useState('');
    const [areaOfResearch, setAreaOfResearch] = useState('');
    const [pdfFile, setPdfFile] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [existingProposal, setExistingProposal] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!teamName || !dept || !type || !title || !abstract || !areaOfResearch || !pdfFile) {
            setError('Please fill out all fields and upload a PDF file.');
            return;
        }



        const formData = new FormData();
        formData.set('teamName', teamName);
        formData.set('dept', dept)
        formData.set('type', type);
        formData.set('title', title);
        formData.set('abstract', abstract);
        formData.set('areaOfResearch', areaOfResearch);
        formData.set('pdfFile', pdfFile);



        try {
            const response = await fetch('http://localhost:5000/submit_proposal', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Proposal submitted successfully!');
                setError('');

                Swal.fire({
                    icon: 'success',
                    title: 'Proposal Submitted!',
                    text: 'Your proposal has been submitted successfully.',
                });
                window.location.reload();
            } else {
                setSuccess('');
                setError(data.error || 'Something went wrong.');


                Swal.fire({
                    icon: 'error',
                    title: 'Submission Failed',
                    text: data.error || 'Something went wrong.',
                });
            }
        } catch (error) {
            setSuccess('');
            setError('Failed to submit the proposal. Please try again.');


            Swal.fire({
                icon: 'error',
                title: 'Network Error',
                text: 'Failed to submit the proposal. Please try again later.',
            });
        }
    };
    const handleFileChange = (e) => {
        setPdfFile(e.target.files[0]);
    };


    useEffect(() => {
        const fetchProposal = async () => {
            try {
                const response = await fetch(`http://localhost:5000/thesis_details/${student_id}`);
                const data = await response.json();
                console.log(data[0])

                setExistingProposal(data[0]);


            } catch (error) {
                console.error('Error fetching proposal:', error);
                setExistingProposal(null);
            }
        };

        fetchProposal();
    }, [student_id]);



    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md pt-10 mt-24 mb-24">
            <h2 className="text-2xl font-extrabold mb-8 text-center text-purple-600">Project/Thesis Proposal</h2>

            {error && <div className="bg-red-200 text-red-700 p-4 rounded-md mb-4">{error}</div>}
            {success && <div className="bg-green-200 text-green-700 p-4 rounded-md mb-4">{success}</div>}


            {existingProposal && existingProposal.title && existingProposal.proposal_status !== "Rejected"? (
                    <div className="space-y-4">
                        {existingProposal.proposal_status === "Pending" ?
                            (
                                <p className='mb-6 rounded-md text-orange-400 font-bold bg-orangr-100 border-2 border-orange-300 py-2 text-center'>Pending</p>
                            ) : existingProposal.proposal_status === "Accepted" ?
                                (
                                    <p className='mb-6 rounded-md text-green-700 font-bold bg-green-100 border-2 border-green-700 py-2 text-center'>Accepted</p>

                                ) : (<p></p>)
                        }
                        <div className="bg-gray-100 p-4 rounded-md">
                            <p className='mb-2'><strong>Team :</strong> {existingProposal.team}</p>
                            <p className='mb-2'><strong>Type:</strong> {existingProposal.type}</p>
                            <p className='mb-2'><strong>Title:</strong> {existingProposal.title}</p>
                            <p className='mb-2'><strong>Abstract:</strong> {existingProposal.abstract}</p>
                            <p className='mb-2'><strong>Area of Research:</strong> {existingProposal.area_of_research}</p>
                            <p className='mb-2'><strong>Supervisor:</strong> {existingProposal.supervisor}</p>
                            <p className='mb-2'><strong>Proposal :</strong>
                                {existingProposal.proposal ? (
                                    <a
                                        href={`http://localhost:5000/${existingProposal.proposal}`}
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
                        </div>
                    </div>
                ) : existingProposal && existingProposal.proposal_status === "Rejected" ?
                    (

                        <form onSubmit={handleSubmit}>

                            <p className='mb-6 rounded-md text-red-500 bg-pink-100 border-2 border-red-300 py-2 text-center'>Your previous proposal has been rejected . Please submit again. </p>

                            <div className="mb-4">
                                <label htmlFor="teamName" className="block text-gray-700 font-bold">Team Name</label>
                                <input
                                    type="text"
                                    id="teamName"
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                    value={teamName}
                                    onChange={(e) => setTeamName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="dept" className="block text-gray-700 font-bold">Department</label>
                                <input
                                    type="text"
                                    id="dept"
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                    value={dept}
                                    onChange={(e) => setdept(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="type" className="block text-gray-700 font-bold">Type</label>
                                <select
                                    id="type"
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    required
                                >
                                    <option value="">Select Type</option>
                                    <option value="Thesis">Thesis</option>
                                    <option value="Project">Project</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="title" className="block text-gray-700 font-bold">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="abstract" className="block text-gray-700 font-bold">Abstract</label>
                                <textarea
                                    id="abstract"
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                    rows="4"
                                    value={abstract}
                                    onChange={(e) => setAbstract(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="areaOfResearch" className="block text-gray-700 font-bold">Area of Research</label>
                                <input
                                    type="text"
                                    id="areaOfResearch"
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                    value={areaOfResearch}
                                    onChange={(e) => setAreaOfResearch(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="pdfFile" className="block text-gray-700 font-bold">Upload Proposal Report(pdf)</label>
                                <input
                                    type="file"
                                    id="pdfFile"
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                    accept=".pdf"
                                    onChange={handleFileChange}
                                    required
                                />
                            </div>

                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                                >
                                    Submit Proposal
                                </button>
                            </div>
                        </form>
                    ) :
                    (

                        <form onSubmit={handleSubmit}>

                            <div className="mb-4">
                                <label htmlFor="teamName" className="block text-gray-700 font-bold">Team Name</label>
                                <input
                                    type="text"
                                    id="teamName"
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                    value={teamName}
                                    onChange={(e) => setTeamName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="dept" className="block text-gray-700 font-bold">Department</label>
                                <input
                                    type="text"
                                    id="dept"
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                    value={dept}
                                    onChange={(e) => setdept(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="type" className="block text-gray-700 font-bold">Type</label>
                                <select
                                    id="type"
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    required
                                >
                                    <option value="">Select Type</option>
                                    <option value="Thesis">Thesis</option>
                                    <option value="Project">Project</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="title" className="block text-gray-700 font-bold">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="abstract" className="block text-gray-700 font-bold">Abstract</label>
                                <textarea
                                    id="abstract"
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                    rows="4"
                                    value={abstract}
                                    onChange={(e) => setAbstract(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="areaOfResearch" className="block text-gray-700 font-bold">Area of Research</label>
                                <input
                                    type="text"
                                    id="areaOfResearch"
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                    value={areaOfResearch}
                                    onChange={(e) => setAreaOfResearch(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="pdfFile" className="block text-gray-700 font-bold">Upload Proposal Report(pdf)</label>
                                <input
                                    type="file"
                                    id="pdfFile"
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                    accept=".pdf"
                                    onChange={handleFileChange}
                                    required
                                />
                            </div>

                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                                >
                                    Submit Proposal
                                </button>
                            </div>
                        </form>
                    )}
        </div>
    );
};

export default SubmitProposal; 