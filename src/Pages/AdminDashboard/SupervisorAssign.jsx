import React, { useState, useEffect } from 'react';

const SupervisorAssign = () => {
    const [students, setStudents] = useState([]);

    // Fetch student details
    useEffect(() => {
        fetch('http://localhost:5000/student_details')
            .then(response => response.json())
            .then(data => setStudents(data))
            .catch(error => console.error('Error fetching students:', error));
    }, []);

    const handleAssignClick = (student) => {
        console.log(`Assigning supervisor for student ID: ${student.student_id}`);

        // Check if there are at least two supervisors selected
        if (!student.selected_supervisors || student.selected_supervisors.length < 2) {
            console.error('Not enough supervisors selected.');
            return;
        }

        const [firstSupervisorId, secondSupervisorId] = student.selected_supervisors;
        let firstSupervisor, secondSupervisor;

        // Fetch details of the first selected supervisor
        fetch(`http://localhost:5000/instructor_details/${firstSupervisorId}`)
            .then(response => response.json())
            .then(data => {
                firstSupervisor = data;

                // Fetch details of the second selected supervisor
                return fetch(`http://localhost:5000/instructor_details/${secondSupervisorId}`);
            })
            .then(response => response.json())
            .then(data => {
                secondSupervisor = data;

                let selectedSupervisor;

                // Compare availability and select the supervisor
                if (firstSupervisor.availability === secondSupervisor.availability) {
                    selectedSupervisor = firstSupervisor; // Choose the first one in case of a tie
                } else {
                    selectedSupervisor = firstSupervisor.availability < secondSupervisor.availability ? firstSupervisor : secondSupervisor;
                }

                // Update the student's assigned supervisor in the database
                fetch(`http://localhost:5000/student_details/${student.student_id}/assign-supervisor`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ assignedSupervisor: selectedSupervisor._id })
                })
                .then(studentUpdateResponse => {
                    if (studentUpdateResponse.ok) {
                        console.log(`Assigned supervisor with ID: ${selectedSupervisor._id} to student ID: ${student.student_id}`);

                        // Deduct one from the selected supervisor's availability
                        return fetch(`http://localhost:5000/instructor_details/${selectedSupervisor._id}`, {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ availability: selectedSupervisor.availability - 1 })
                        });
                    } else {
                        console.error('Error updating student supervisor.');
                        throw new Error('Error updating student supervisor.');
                    }
                })
                .then(supervisorUpdateResponse => {
                    if (supervisorUpdateResponse.ok) {
                        alert('Supervisor assigned successfully!');
                    } else {
                        console.error('Error updating supervisor availability.');
                    }
                })
                .catch(error => console.error('Error assigning supervisor:', error));
            })
            .catch(error => console.error('Error fetching supervisors:', error));
    };

    return (
        <div>
            <h2 className='text-2xl text-center text-purple-800 font-semibold mb-6'>Supervisor Assignment</h2>
            <table className="table-auto w-full border bg-white">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Student ID</th>
                        <th className="border px-4 py-2">Selected Supervisors</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student._id}>
                            <td className="border px-4 py-2">{student.student_id}</td>
                            <td className="border px-4 py-2">
                                {student.selected_supervisors && student.selected_supervisors.length > 0
                                    ? student.selected_supervisors.join(', ')
                                    : 'No supervisors selected'}
                            </td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => handleAssignClick(student)}
                                    className="btn btn-primary"
                                >
                                    Assign
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SupervisorAssign;
