import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from './Loading';

const ViewBoard = () => {

    const [instructorName, setInstructorName] = useState()
    const { _id } = useParams()
    const BoardDetailRef = useRef([]);

    const [boardDetails, setBoardDetails] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchInstructorDetails = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/instructor_details/${_id}`
                );
                if (!response.ok) throw new Error(`Error: ${response.statusText}`);
                const data = await response.json();
                setInstructorName(data.name);
            } catch (error) {
                console.error("Error fetching instructor details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInstructorDetails();
    }, [_id]);






    useEffect(() => {
        const fetchBoardDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/board_details`);
                console.log("API Response Status:", response.status);

                if (!response.ok) {
                    throw new Error(`Error fetching data: ${response.statusText}`);
                }

                const data = await response.json();
                console.log("Fetched Data:", data);

                BoardDetailRef.current = data; // Update ref
                setBoardDetails(data); // Update state
            } catch (error) {
                console.error("Error fetching board details:", error);
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchBoardDetails();
    }, []);

    useEffect(() => {
        if (boardDetails.length === 0) {
            console.log("BoardDetails is empty or not updated yet");
        } else {
            console.log("BoardDetails updated:", boardDetails);
        }
    }, [boardDetails]);

    console.log("BoardDetails outside useEffect:", boardDetails);

    if (loading) {
        return <Loading />;
    }


    // console.log(boardDetails[0].type)
    const matchingProposalBoard = boardDetails.find(
        (board) =>
            board.chairman === instructorName || board.members.includes(instructorName) && board.type === "Proposal"
    );
    const matchingProposalLinks = matchingProposalBoard?.link;
    const matchingProposalType = matchingProposalBoard?.type;
    const matchingProposalChairman = matchingProposalBoard?.chairman;
    const matchingProposalMembers = matchingProposalBoard?.members || [];
    const matchingProposalBoardName = matchingProposalBoard?.boardName;

    const matchingPreDefenseBoard = boardDetails.find(
        (board) =>
            board.chairman === instructorName || board.members.includes(instructorName) && board.type === "Pre-Defense"
    );
    const matchingPreDefenseLinks = matchingPreDefenseBoard?.link;
    const matchingPreDefenseType = matchingPreDefenseBoard?.type;
    const matchingPreDefenseChairman = matchingPreDefenseBoard?.chairman;
    const matchingPreDefenseMembers = matchingPreDefenseBoard?.members || [];
    const matchingPreDefenseBoardName = matchingPreDefenseBoard?.boardName;

    const matchingDefenseBoard = boardDetails.find(
        (board) =>
            board.chairman === instructorName || board.members.includes(instructorName) && board.type === "Defense"
    );
    const matchingDefenseLinks = matchingDefenseBoard?.link;
    const matchingDefenseType = matchingDefenseBoard?.type;
    const matchingDefenseChairman = matchingDefenseBoard?.chairman;
    const matchingDefenseMembers = matchingDefenseBoard?.members || [];
    const matchingDefenseBoardName = matchingDefenseBoard?.boardName;

    const getStatusTextColor = (status) => {
        switch (status) {
            case "Accepted":
                return "text-green-500 font-bold";
            case "Pending":
                return "text-orange-500 font-bold";
            case "Rejected":
                return "text-red-500 font-bold";
            default:
                return "text-gray-500 font-bold";
        }
    }; return (
        <div>
            <h2 className="text-xl font-bold text-purple-800 text-center">Selected Board</h2>


            {/* Table to display board details */}
            <div className="mt-6 overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-purple-600 text-white">
                            <th className="px-4 py-2 text-center">Type</th>
                            <th className="px-4 py-2 text-center">Members</th>
                            <th className="px-4 py-2 text-center">Board</th>
                            <th className="px-4 py-2 text-center">Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t">
                            <td className="px-4 py-2">
                                {matchingProposalBoard ? (
                                    <span className="font-bold text-green-600">{matchingProposalType}</span>
                                ) : (
                                    <span className={getStatusTextColor("Unknown")}>
                                        {"Pending"}
                                    </span>
                                )}
                            </td>
                            <td className="px-4 py-2">
                                {
                                    matchingProposalBoard ? (
                                        <ul className="mt-4">
                                            <li><strong>Chairman: </strong>{matchingProposalChairman}</li>
                                            <li><strong>Member  : </strong>{matchingProposalMembers[0]}</li>
                                            <li><strong>Member  : </strong>{matchingProposalMembers[1]}</li>

                                        </ul>
                                    ) : (<span className={getStatusTextColor("Unknown")}>
                                        {"Pending"}
                                    </span>)
                                }
                            </td>
                            <td className="px-4 py-2">{
                                matchingProposalBoard ? (
                                    <p>{matchingProposalBoardName}</p>
                                ) : (<span className={getStatusTextColor("Unknown")}>
                                    {"Pending"}
                                </span>)

                            }</td>
                            <td>
                                {
                                    matchingProposalBoard ? (
                                        <div className="text-center">
                                            <div className="text-center">
                                                <a
                                                    href={matchingProposalLinks}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-primary btn-sm bg-purple-600 hover:bg-purple-700 text-white font-bold py-1 px-4 rounded"
                                                >
                                                    View
                                                </a>
                                            </div>

                                        </div>
                                    ) : (
                                        (<span className={getStatusTextColor("Unknown")}>
                                            {"Pending"}
                                        </span>)
                                    )
                                }


                            </td>
                        </tr>
                        <tr className="border-t">
                            <td className="px-4 py-2">
                                {matchingPreDefenseBoard ? (
                                    <span className="font-bold text-green-600">{matchingPreDefenseType}</span>
                                ) : (
                                    <span className={getStatusTextColor("Unknown")}>
                                        {"Pending"}
                                    </span>
                                )}
                            </td>
                            <td className="px-4 py-2">
                                {
                                    matchingPreDefenseBoard ? (
                                        <ul className="mt-4">
                                            <li><strong>Chairman: </strong>{matchingPreDefenseChairman}</li>
                                            <li><strong>Member  : </strong>{matchingPreDefenseMembers[0]}</li>
                                            <li><strong>Member  : </strong>{matchingPreDefenseMembers[1]}</li>

                                        </ul>
                                    ) : (<span className={getStatusTextColor("Unknown")}>
                                        {"Pending"}
                                    </span>)
                                }
                            </td>
                            <td className="px-4 py-2">{
                                matchingPreDefenseBoard ? (
                                    <p>{matchingPreDefenseBoardName}</p>
                                ) : (<span className={getStatusTextColor("Unknown")}>
                                    {"Pending"}
                                </span>)

                            }</td>

                            <td>
                                {
                                    matchingPreDefenseBoard ? (
                                        <div className="text-center">
                                            <div className="text-center">
                                                <a
                                                    href={matchingPreDefenseLinks}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-primary btn-sm bg-purple-600 hover:bg-purple-700 text-white font-bold py-1 px-4 rounded"
                                                >
                                                    View
                                                </a>
                                            </div>

                                        </div>
                                    ) : (
                                        (<span className={getStatusTextColor("Unknown")}>
                                            {"Pending"}
                                        </span>)
                                    )
                                }

                            </td>
                        </tr>
                        <tr className="border-t">
                            <td className="px-4 py-2">
                                {matchingDefenseBoard ? (
                                    <span className="font-bold text-green-600">{matchingDefenseType}</span>
                                ) : (
                                    <span className={getStatusTextColor("Unknown")}>
                                        {"Pending"}
                                    </span>
                                )}
                            </td>
                            <td className="px-4 py-2">
                                {
                                    matchingDefenseBoard ? (
                                        <ul className="mt-4">
                                            <li><strong>Chairman: </strong>{matchingDefenseChairman}</li>
                                            <li><strong>Member  : </strong>{matchingDefenseMembers[0]}</li>
                                            <li><strong>Member  : </strong>{matchingDefenseMembers[1]}</li>

                                        </ul>
                                    ) : (<span className={getStatusTextColor("Unknown")}>
                                        {"Pending"}
                                    </span>)
                                }
                            </td>
                            <td className="px-4 py-2">{
                                matchingDefenseBoard ? (
                                    <p>{matchingDefenseBoardName}</p>
                                ) : (<span className={getStatusTextColor("Unknown")}>
                                    {"Pending"}
                                </span>)

                            }</td>

                            <td>
                                {
                                    matchingDefenseBoard ? (
                                        <div className="text-center">
                                            <div className="text-center">
                                                <a
                                                    href={matchingDefenseLinks}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-primary btn-sm bg-purple-600 hover:bg-purple-700 text-white font-bold py-1 px-4 rounded"
                                                >
                                                    View
                                                </a>
                                            </div>

                                        </div>
                                    ) : (
                                        (<span className={getStatusTextColor("Unknown")}>
                                            {"Pending"}
                                        </span>)
                                    )
                                }

                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>


        </div >
    );
};

export default ViewBoard;