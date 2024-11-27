import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ViewBoard = () => {

    const [boardDetails, setBoardDetails] = useState([]);
    const [instructorName, setInstructorName] = useState()
    const { _id } = useParams()


    fetch(`http://localhost:5000/board_details`)
        .then(response => response.json())
        .then(data => {
            const boards = data.map(item => item);
            console.log(boards)
            setBoardDetails(boards);
            console.log(boardDetails)

        })
        .catch(error => {
            console.error("Error fetching ", error);
        });
    //console.log(data2)

    useEffect(() => {

        fetch(`http://localhost:5000/instructor_details/${_id}`)
            .then(response => response.json())
            .then(data => {
                setInstructorName(data.name);

            })
            .catch(error => {
                console.error('Error fetching data:', error);

            });
    }, [_id]);
    const matchingLinks = boardDetails
        .filter(
            (board) =>
                board.chairman === instructorName || board.members.includes(instructorName)
        )
        .map((board) => board.link);

    const matchingChairman = boardDetails
        .filter(
            (board) =>
                board.chairman === instructorName || board.members.includes(instructorName)
        )
        .map((board) => board.chairman);
    const matchingMembers = boardDetails
        .filter(
            (board) =>
                board.chairman === instructorName || board.members.includes(instructorName)
        )
        .map((board) => board.members);
    const matchingBoardName = boardDetails
        .filter(
            (board) =>
                board.chairman === instructorName || board.members.includes(instructorName)
        )
        .map((board) => board.boardName);


    return (
        <div>
            <h2 className="text-xl font-bold text-purple-800 text-center">Selected Board</h2>

            <h1 className='text-center mt-4'>You are selected for <strong className='text-green-600'>{matchingBoardName}</strong></h1>
            <ul className="mt-4">
                <li><strong>Chairman: </strong>{matchingChairman}</li>
                <li><strong>Member  : </strong>{matchingMembers[0][0]}</li>
                <li><strong>Member  : </strong>{matchingMembers[0][1]}</li>

            </ul>
            <div className="text-center">
                <div className="text-center">
                    <a
                        href={matchingLinks[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-sm bg-purple-600 hover:bg-purple-700 text-white font-bold py-1 px-4 rounded"
                    >
                        View
                    </a>
                </div>

            </div>

        </div>
    );
};

export default ViewBoard;