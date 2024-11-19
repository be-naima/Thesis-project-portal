import { useEffect, useState } from "react";
import { MdGroups2 } from "react-icons/md";
import Swal from "sweetalert2";

import withReactContent from "sweetalert2-react-content";
const ManageBoard = () => {
    const [allInstructors, setAllInstructors] = useState([])
    const MySwal = withReactContent(Swal);
    const [selectedChairman, setSelectedChairman] = useState(null);
    const [selectedMembers, setSelectedMembers] = useState([null, null]);

    useEffect(() => {
        fetch(`http://localhost:5000/instructor_details`)
            .then(response => response.json())
            .then(data => {
                setAllInstructors(data);

            })
            .catch(error => {
                console.error('Error fetching data:', error);
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
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Select Chairman
                            </option>
                            {allInstructors.map((instructor) => (
                                <option key={instructor._id} value={instructor._id}>
                                    {instructor.name}
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
                            <option value="" disabled>
                                Select Member
                            </option>
                            {allInstructors.map((instructor) => (
                                <option key={instructor._id} value={instructor._id}>
                                    {instructor.name}
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
                            <option value="" disabled>
                                Select Member
                            </option>
                            {allInstructors.map((instructor) => (
                                <option key={instructor._id} value={instructor._id}>
                                    {instructor.name}
                                </option>
                            ))}
                        </select>
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

                // Validation check
                if (!boardName || !department || !batch || !chairman || !member1 || !member2) {
                    Swal.showValidationMessage("Please fill in all fields");
                    return false;
                }

                return { boardName, department, batch, chairman, member1, member2 };
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const { boardName, department, batch, chairman, member1, member2 } = result.value;

                // Prepare the data to send to the backend
                const boardData = {
                    boardName,
                    department,
                    batch: parseInt(batch), // Convert to integer if necessary
                    chairman,
                    members: [member1, member2],
                };

                console.log("Board Data:", boardData);

                // Now you can send the data to the backend (you can replace the console.log with your API call)
                fetch("http://localhost:5000/board_details", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(boardData),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        Swal.fire("Saved!", "Your board has been added.", "success");
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                        Swal.fire("Error!", "There was an issue saving the board.", "error");
                    });
            }
        });
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
                        <th className="border border-gray-300 p-2 px-6">Board</th>
                        <th className="border border-gray-300 p-2">Members</th>
                        <th className="border border-gray-300 p-2 px-4">Department</th>
                        <th className="border border-gray-300 p-2 px-4">Batch</th>
                        <th className="border border-gray-300 p-2">Thesis/Project</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="hover:bg-gray-100">
                        <td className="border border-gray-300 p-2 text-center">Board 1</td>
                        <td className="border border-gray-300 px-6 py-2 ">
                            <ul className="">
                                <li><strong>Chairman: </strong>Sabrina Akter</li>
                                <li><strong>Member  : </strong>Farjana Tasnim</li>
                                <li><strong>Member  : </strong>Shefayatuj Johara Chowdhury</li>
                            </ul>
                        </td>
                        <td className="border border-gray-300 p-2 text-center">CSE</td>
                        <td className="border border-gray-300 p-2 text-center">50</td>
                        <td className="border border-gray-300 p-2 text-center">
                            <button className="btn btn-primary btn-sm bg-purple-600 hover:bg-purple-700 text-white font-bold py-1 px-4 rounded">
                                Select
                            </button>
                        </td>
                    </tr>
                    <tr className="hover:bg-gray-100">
                        <td className="border border-gray-300 p-2 text-center">Board 2</td>
                        <td className="border border-gray-300 px-6 py-2 ">
                            <ul className="">
                                <li><strong>Chairman: </strong>Sabrina Akter</li>
                                <li><strong>Member  : </strong>Farjana Tasnim</li>
                                <li><strong>Member  : </strong>Shefayatuj Johara Chowdhury</li>
                            </ul>
                        </td>
                        <td className="border border-gray-300 p-2 text-center">CSE</td>
                        <td className="border border-gray-300 p-2  text-center">50</td>
                        <td className="border border-gray-300 p-2 text-center">
                            <button className="btn btn-primary btn-sm bg-purple-600 hover:bg-purple-700 text-white font-bold py-1 px-4 rounded">
                                Select
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    );
};

export default ManageBoard;