import { useEffect, useRef, useState } from 'react';
import { FaCheck, FaX } from 'react-icons/fa6';


const Board = () => {
    const [thesisDetails, setThesisDetails] = useState([]);
    const [detailedTheses, setDetailedTheses] = useState([]);
    const [statuses, setStatuses] = useState({});
    

    // Fetch thesis titles from 'board_details'
    useEffect(() => {
        fetch('http://localhost:5000/board_details')
            .then((response) => response.json())
            .then((data) => {
                setThesisDetails(data);

                // Initialize statuses for Board approval
                const initialStatuses = {};
                data.forEach((thesisData) => {
                    thesisData.thesis.forEach((title) => {
                        initialStatuses[title] = {
                            proposal_boardstatus: thesisData.statuses?.[title]?.proposal_boardstatus ,
                            preDefense_boardstatus: thesisData.statuses?.[title]?.preDefense_boardstatus ,
                            defense_boardstatus: thesisData.statuses?.[title]?.defense_boardstatus ,
                        };
                    });
                });
                setStatuses(initialStatuses);
            })
            .catch((error) => console.error('Error fetching thesis details:', error));
    }, []);

    // Fetch detailed thesis data when `thesisDetails` is populated
    useEffect(() => {
        if (thesisDetails.length > 0) {
            const fetchThesisDetails = thesisDetails.flatMap((thesisData) =>
                thesisData.thesis.map((title) =>
                    fetch(`http://localhost:5000/all_thesis/${title}`)
                        .then((response) => response.json())
                        .catch((error) => console.error('Error fetching thesis details:', error))
                )
            );

            Promise.all(fetchThesisDetails).then((results) => {
                //console.log(results);
                setDetailedTheses(results);
                //console.log(detailedTheses);
            });
        }
    }, [thesisDetails]);

   
    const updateStatus = (title, type, status) => {
        
        const updatedStatuses = { ...statuses, [title]: { ...statuses[title], [type]: status } };
        setStatuses(updatedStatuses);  
        console.log(updatedStatuses);

       
        

        fetch('http://localhost:5000/update_status', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title,
                type,
                status,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Status updated successfully:', data);
                

            })
            .catch((error) => console.error('Error updating status:', error));


    };

    return (
        <div className='overflow-x-auto bg-gray-100 pt-40 mb-26 p-4'>
            <table className="min-w-full bg-white border border-gray-200 ">
                <thead>
                    <tr className="bg-purple-500 text-white">
                        <th rowSpan="2" className="border px-6 py-2">SL</th>
                        <th rowSpan="2" className="border px-6 py-2">Thesis/Project Title</th>
                        <th colSpan="3" className="border px-6 py-2">Approved by Supervisor</th>
                        <th colSpan="3" className="border px-6 py-2">Approved by Board</th>
                        <th colSpan="3" className="border px-6 py-2">Action by Board</th>
                    </tr>
                    <tr className="bg-purple-500 text-white">
                        <th className="border px-6 py-2">Proposal</th>
                        <th className="border px-6 py-2">Pre-Defense</th>
                        <th className="border px-6 py-2">Defense</th>
                        <th className="border px-6 py-2">Proposal</th>
                        
                        <th className="border px-6 py-2">Pre-Defense</th>
                        
                        <th className="border px-6 py-2">Defense</th>
                        
                        <th className="border px-6 py-2">Proposal</th>
                        <th className="border px-6 py-2">Pre-Defense</th>
                        <th className="border px-6 py-2">Defense</th>
                    </tr>
                </thead>
                <tbody>
                {thesisDetails.map((thesisData) =>
                        thesisData.thesis.map((title, index) => {
                            const thesisDetail = detailedTheses.find((detail) => detail?.title === title);
                            //console.log(thesisDetail);
                            return (
                                <tr key={index}>
                                    <td className="border px-6 py-2">{index + 1}</td>
                                    <td className="border px-6 py-2">{title}</td>
                                    <td className="border px-6 py-2">
                                        {thesisDetail ? thesisDetail.proposal_status : 'Loading...'}
                                    </td>
                                    <td className="border px-6 py-2">
                                        {thesisDetail ? thesisDetail.pre_defense_status : 'Loading...'}
                                    </td>
                                    <td className="border px-6 py-2">
                                        {thesisDetail ? thesisDetail.defense_status : 'Loading...'}
                                    </td>
                                    
                                    <td className="border px-6 py-2">
                                        {statuses[title]?.proposal_boardstatus || 'Pending'}
                                    </td>
                                    
                                    
                                    <td className="border px-6 py-2">
                                        {statuses[title]?.preDefense_boardstatus || 'Pending'}
                                    </td>
                                    
                                    
                                    <td className="border px-6 py-2">
                                        {statuses[title]?.defense_boardstatus || 'Pending'}
                                    </td>
                                    
                                    <td className="border px-8 py-2">
                                        <div className="flex items-center justify-center">
                                            <button
                                                className="btn btn-outline btn-success btn-xs me-3"
                                                onClick={() => updateStatus(title, 'proposal_boardstatus', 'Accepted')}
                                            >
                                                Accept
                                            </button>
                                            <button
                                                className="btn btn-outline btn-error btn-xs"
                                                onClick={() => updateStatus(title, 'proposal_boardstatus', 'Rejected')}
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    </td>
                                    <td className="border px-8 py-2">
                                        <div className="flex items-center justify-center">
                                            <button
                                                className="btn btn-outline btn-success btn-xs me-3"
                                                onClick={() => updateStatus(title, 'preDefense_boardstatus', 'Accepted')}
                                            >
                                                Accept
                                            </button>
                                            <button
                                                className="btn btn-outline btn-error btn-xs"
                                                onClick={() => updateStatus(title, 'preDefense_boardstatus', 'Rejected')}
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    </td>
                                    <td className="border px-8 py-2">
                                        <div className="flex items-center justify-center">
                                            <button
                                                className="btn btn-outline btn-success btn-xs me-3"
                                                onClick={() => updateStatus(title, 'defense_boardstatus', 'Accepted')}
                                            >
                                                Accept
                                            </button>
                                            <button
                                                className="btn btn-outline btn-error btn-xs"
                                                onClick={() => updateStatus(title, 'defense_boardstatus', 'Rejected')}
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Board;

