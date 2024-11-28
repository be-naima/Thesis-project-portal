import { useEffect, useState } from "react";
import { MdGroups2 } from "react-icons/md";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ManageBoard = () => {
    const [allInstructors, setAllInstructors] = useState([]);
    const [boards, setBoards] = useState([]); 
    const [allThesis, setAllThesis] = useState([])
    const MySwal = withReactContent(Swal);

    useEffect(() => {
        
        fetch(`http://localhost:5000/instructor_details`)
            .then(response => response.json())
            .then(data => {
                const instructorNames = data.map(item => item.name);
                setAllInstructors(instructorNames);
            })
            .catch(error => {
                console.error("Error fetching instructors:", error);
            });
    }, []);

    useEffect(() => {
       
        fetch(`http://localhost:5000/board_details`)
            .then(response => response.json())
            .then(data => {

                setBoards(data); // Initialize boards state with fetched data
            })
            .catch(error => {
                console.error("Error fetching boards:", error);
            });
    }, []);

    useEffect(() => {
        
        fetch(`http://localhost:5000/all_thesis`)
            .then(response => response.json())
            .then(data => {
                const allThesisTitles = data.map(item => item);
                setAllThesis(allThesisTitles); 
            })
            .catch(error => {
                console.error("Error fetching boards:", error);
            });
    }, []);


    const handleAddBoard = () => {
        MySwal.fire({
            title: "Add Board",
            html: (
                <div className="space-y-6">
                   
                    <div className="flex items-center space-x-3">
                        <label htmlFor="boardName" className="text-sm font-bold w-32">
                            Board Name:
                        </label>
                        <input
                            type="text"
                            id="boardName"
                            className="border rounded px-2 py-1 text-sm w-full max-w-xs"
                            placeholder="Enter Board Name"
                        />
                    </div>
                    <div className="flex items-center space-x-3">
                        <label htmlFor="department" className="text-sm font-bold w-32">
                            Department:
                        </label>
                        <input
                            type="text"
                            id="department"
                            className="border rounded px-2 py-1 text-sm w-full max-w-xs"
                            placeholder="Enter Department"
                        />
                    </div>
                    <div className="flex items-center space-x-3">
                        <label htmlFor="batch" className="text-sm font-bold w-32">
                            Batch:
                        </label>
                        <input
                            type="number"
                            id="batch"
                            className="border rounded px-2 py-1 text-sm w-32"
                            placeholder="Enter Batch"
                        />
                    </div>
                    <div className="flex items-center space-x-3">
                        <label htmlFor="chairman" className="text-sm font-bold w-32">
                            Chairman:
                        </label>
                        <select
                            id="chairman"
                            className="border rounded px-2 py-1 text-sm w-full max-w-xs"
                        >
                            <option value="" >
                                Select Chairman
                            </option>
                            {allInstructors.map((instructor, index) => (
                                <option key={index} value={instructor}>
                                    {instructor}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center space-x-3">
                        <label htmlFor="member1" className="text-sm font-bold w-32">
                            Member 1:
                        </label>
                        <select
                            id="member1"
                            className="border rounded px-2 py-1 text-sm w-full max-w-xs"
                        >
                            <option value="" >
                                Select Member
                            </option>
                            {allInstructors.map((instructor, index) => (
                                <option key={index} value={instructor}>
                                    {instructor}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center space-x-3">
                        <label htmlFor="member2" className="text-sm font-bold w-32">
                            Member 2:
                        </label>
                        <select
                            id="member2"
                            className="border rounded px-2 py-1 text-sm w-full max-w-xs"
                        >
                            <option value="" >
                                Select Member
                            </option>
                            {allInstructors.map((instructor, index) => (
                                <option key={index} value={instructor}>
                                    {instructor}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center space-x-3">
                        <label htmlFor="boardType" className="text-sm font-bold w-32">
                            Board Type:
                        </label>
                        <select
                            id="boardType"
                            className="border rounded px-2 py-1 text-sm w-full max-w-xs"
                        >
                            <option value="" disabled>
                                Select Board Type
                            </option>
                            <option value="Proposal">Proposal</option>
                            <option value="Pre-Defense">Pre-Defense</option>
                            <option value="Defense">Defense</option>
                        </select>
                    </div>
                    <div className="flex items-center space-x-3">
                        <label htmlFor="boardDate" className="text-sm font-bold w-32">
                            Date:
                        </label>
                        <input
                            type="date"
                            id="boardDate"
                            className="border rounded px-2 py-1 text-sm w-full max-w-xs"
                        />
                    </div>
                </div>
            ),
            showCancelButton: true,
            confirmButtonText: "Save",
            cancelButtonText: "Cancel",
            focusConfirm: false,
            preConfirm: () => {
                const boardName = document.getElementById("boardName").value;
                const department = document.getElementById("department").value;
                const batch = document.getElementById("batch").value;
                const chairman = document.getElementById("chairman").value;
                const member1 = document.getElementById("member1").value;
                const member2 = document.getElementById("member2").value;
                const boardType = document.getElementById("boardType").value;
                const boardDate = document.getElementById("boardDate").value;

                if (!boardName || !department || !batch || !chairman || !member1 || !member2 || !boardType || !boardDate) {
                    Swal.showValidationMessage("Please fill in all fields");
                    return false;
                }

                
                const boardLink = `/board/${boardName.toLowerCase().replace(/\s+/g, '-')}`;

                return { boardName, department, batch, chairman, member1, member2, boardType, boardDate, boardLink };
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const { boardName, department, batch, chairman, member1, member2, boardType, boardDate, boardLink } = result.value;

                const newBoard = {
                    boardName,
                    department,
                    batch: parseInt(batch),
                    chairman,
                    members: [member1, member2],
                    type: boardType, 
                    date: boardDate, 
                    link: boardLink, 
                };

                fetch("http://localhost:5000/board_details", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newBoard),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        setBoards((prevBoards) => [...prevBoards, newBoard]); 
                        Swal.fire("Saved!", "Your board has been added.", "success");
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                        Swal.fire("Error!", "There was an issue saving the board.", "error");
                    });
            }
        });
    };



    const handleSelectThesis = (boardId) => {
        const board = boards.find((board) => board._id === boardId);

        if (board.thesis && board.thesis.length > 0) {
           
            MySwal.fire({
                title: "Selected Thesis",
                html: (
                    <div className="space-y-3">
                        {board.thesis.map((title, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <span>{title}</span>
                            </div>
                        ))}
                    </div>
                ),
                confirmButtonText: "Close",
            });
        } else {
            
            MySwal.fire({
                title: "Select Thesis",
                html: (
                    <div className="space-y-3">
                        {allThesis.map((thesis, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id={`thesis-${index}`}
                                    value={thesis.title}
                                    className="checkbox"
                                />
                                <label htmlFor={`thesis-${index}`}>{thesis.title}</label>
                            </div>
                        ))}
                    </div>
                ),
                showCancelButton: true,
                confirmButtonText: "Save",
                cancelButtonText: "Cancel",
                preConfirm: () => {
                    const selectedThesis = [];
                    allThesis.forEach((thesis, index) => {
                        const checkbox = document.getElementById(`thesis-${index}`);
                        if (checkbox && checkbox.checked) {
                            selectedThesis.push(thesis.title);
                        }
                    });
                    if (selectedThesis.length === 0) {
                        Swal.showValidationMessage("Please select at least one thesis");
                        return false;
                    }
                    return selectedThesis;
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    const updatedBoards = boards.map((board) =>
                        board._id === boardId
                            ? { ...board, thesis: result.value } 
                            : board
                    );

                    const updatedBoard = updatedBoards.find((board) => board._id === boardId);

                    fetch(`http://localhost:5000/board_details/${boardId}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(updatedBoard),
                    })
                        .then((response) => response.json())
                        .then(() => {
                            setBoards(updatedBoards); 
                            Swal.fire("Saved!", "Theses have been added to the board.", "success");
                        })
                        .catch((error) => {
                            console.error("Error updating board:", error);
                            Swal.fire("Error!", "Failed to save theses selection.", "error");
                        });
                }
            });
        }
    };




    return (
        <div className="overflow-x-auto">
            <h2 className="text-xl font-bold text-purple-800 text-center">Manage Board</h2>
            <div className="text-right">
                <button
                    onClick={handleAddBoard}
                    className="btn btn-sm bg-purple-600 hover:bg-pink-300 bg-pink-600 text-white font-bold py-2 my-5 px-4 rounded"
                >
                    <MdGroups2 className="text-lg" />
                    <span>Add Board</span>
                </button>
            </div>
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead className="bg-purple-500 text-white">
                    <tr>
                        <th className="border border-gray-300 p-2 px-6">Board Name</th>
                        <th className="border border-gray-300 p-2 ">Board </th>
                        <th className="border border-gray-300 p-2 px-24">Members</th>
                        <th className="border border-gray-300 p-2 px-4">Department</th>
                        <th className="border border-gray-300 p-2 px-4">Batch</th>
                        <th className="border border-gray-300 p-2">Thesis/Project</th>
                    </tr>
                </thead>
                <tbody>
                    {boards.map((board) => (
                        <tr key={board._id} className="hover:bg-gray-100">
                            <td className="border border-gray-300 p-2 text-center">{board.boardName}</td>
                            <td className="border border-gray-300 p-2 text-center">{board.type}</td>

                            <td className="border border-gray-300 px-6 py-2">
                                <ul>
                                    <li>
                                        <strong>Chairman: </strong>
                                        {board.chairman}
                                    </li>
                                    {board.members.map((member, idx) => (
                                        <li key={idx}>
                                            <strong>Member {idx + 1}: </strong>
                                            {member}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td className="border border-gray-300 p-2 text-center">{board.department}</td>
                            <td className="border border-gray-300 p-2 text-center">{board.batch}</td>
                            <td className="border border-gray-300 p-2 text-center">
                                <button
                                    onClick={() => handleSelectThesis(board._id)}
                                    className="btn btn-primary btn-sm bg-purple-600 hover:bg-purple-700 text-white font-bold py-1 px-4 rounded"
                                >
                                    {board.thesis && board.thesis.length > 0 ? "View" : "Select"}
                                </button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageBoard;
