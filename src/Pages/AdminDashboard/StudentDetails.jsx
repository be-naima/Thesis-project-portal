import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { FaSearch, FaFilter } from 'react-icons/fa';

const StudentDetails = () => {
    const [thesisData, setThesisData] = useState([]);
    const [thesisInfo, setThesisInfo] = useState([]);
    const [boardDetails, setBoardDetails] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDept, setSelectedDept] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [showDeptDropdown, setShowDeptDropdown] = useState(false);
    const [showTypeDropdown, setShowTypeDropdown] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [studentDetails, setStudentDetails] = useState([])
    const itemsPerPage = 7;

    useEffect(() => {
        fetch('http://localhost:5000/all_thesis')
            .then(response => response.json())
            .then(data => setThesisData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    useEffect(() => {
        fetch('http://localhost:5000/student_details')
            .then(response => response.json())
            .then(data => setStudentDetails(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    useEffect(() => {
    fetch('http://localhost:5000/board_details')
            .then(response => response.json())
            .then(data => setBoardDetails(data)) // Set board details here
            .catch(error => console.error('Error fetching board data:', error));
        }, []);
        
        console.log(boardDetails);
   
        const handleViewDetails = (item) => {
        const matchingBoard = boardDetails.find(board =>
            board.thesis.includes(thesisInfo[0].title)
        );

        // Extract the proposal board status for the specific title
        const proposalboardStatus = matchingBoard?.status?.[thesisInfo[0].title]?.proposal_boardstatus || 'Not Available';
        const predefboardStatus = matchingBoard?.status?.[thesisInfo[0].title]?.preDefense_boardstatus || 'Not Available';
        const defboardStatus = matchingBoard?.status?.[thesisInfo[0].title]?.defense_boardstatus || 'Not Available';

        console.log(item)
       
            fetch(`http://localhost:5000/thesis_details/${item}`)
                .then(response => response.json())
                .then(data => setThesisInfo(data))
                .catch(error => console.error('Error fetching data:', error));
        
        Swal.fire({
            title: thesisInfo[0].title,
            html: ` <div style="text-align: left;">
      <p><strong>Abstract:</strong> ${thesisInfo[0].abstract}</p>
      <p><strong>Student ID:</strong> ${thesisInfo[0].student_ids}</p>
      <p><strong>Name:</strong> ${thesisInfo[0].student_name}</p>
      <p><strong>Supervisor:</strong> ${thesisInfo[0].supervisor}</p>
      <p><strong>Proposal:</strong> ${thesisInfo[0].proposal
                    ? `<a href="http://localhost:5000/${thesisInfo[0].proposal}" 
               target="_blank" 
               rel="noopener noreferrer" 
               style="color: white; background-color: #6b21a8; padding: 3px 7px; border-radius: 3px; font-size: 12px; font-weight: bold; text-decoration: none;">
               View Proposal
             </a>`
                    : `<span style="color: red;">Not Submitted</span>`
                }</p>
      <p><strong>Proposal Supervisor Status:</strong> ${thesisInfo[0].proposal_status}</p>
      <p><strong>Proposal Board Status:</strong> ${proposalboardStatus}</p>

      <p><strong>Pre-defence:</strong> ${thesisInfo[0].pre_defence
                    ? `<a href="http://localhost:5000/files/${thesisInfo[0].pre_defence}" 
               target="_blank" 
               rel="noopener noreferrer" 
               style="color: white; background-color: #6b21a8; padding: 3px 7px; border-radius: 3px; font-size: 12px; font-weight: bold; text-decoration: none;">
               Report
             </a>`
                    : `<span style="color: red;">Not Submitted</span>`
                }</p>
      <p><strong>Pre-defence Supervisor Status:</strong> ${thesisInfo[0].pre_defense_status}</p>
      <p><strong>Pre-defence Board Status:</strong> ${predefboardStatus}</p>


      <p><strong>Defence:</strong> ${thesisInfo[0].defence
                    ? `<a href="http://localhost:5000/files/${thesisInfo[0].defence}" 
               target="_bthesisInfo[0]lank" 
               rel="noopener noreferrer" 
               style="color: white; background-color: #6b21a8; padding: 3px 7px; border-radius: 3px; font-size: 12px; font-weight: bold; text-decoration: none;">
               Report
             </a>`
                    : `<span style="color: red;">Not Submitted</span>`
                }</p>
      <p><strong>Defence Supervisor Status:</strong> ${thesisInfo[0].defense_status}</p>
      <p><strong>Defence Board Status:</strong> ${defboardStatus}</p>


    </div>`,
            confirmButtonText: 'Close',
            width: '80%',
            padding: '1rem',
        });
    };

   

    return (
        <div className="mx-auto bg-gray-100 h-[800px] overflow-auto">
            <div className="container bg-gray-100 pt-44 mb-26 p-4">
               

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border">SL</th>
                                <th className="px-4 py-2 border">Student ID</th>
                                <th className="px-4 py-2 border">Name</th>
                                <th className="px-4 py-2 border">Batch</th>
                                <th className="px-4 py-2 border">Department</th>
                                <th className="px-4 py-2 border">Work Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentDetails.map((item, index) => (
                                <tr key={item.id}>
                                    <td className="px-4 py-2 border text-center">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                    <td className="px-4 py-2 border">{item.student_id}</td>
                                    <td className="px-4 py-2 border">{item.name}</td>
                                    <td className="px-4 py-2 border">{item.batch}</td>
                                    <td className="px-4 py-2 border">{item.department}</td>
                                    <td className="px-4 py-2 border text-center">
                                        <button
                                            onClick={() => handleViewDetails(item.student_id)}
                                            className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        >
                                            View
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                
            </div>
        </div>
    );
};

export default StudentDetails;
