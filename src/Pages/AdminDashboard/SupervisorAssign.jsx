import { useState, useEffect } from 'react';

const SupervisorAssign = () => {
    const [students, setStudents] = useState([]);

    // Fetch student details
    useEffect(() => {
        fetch('http://localhost:5000/student_details')
            .then(response => response.json())
            .then(data => setStudents(data))
            .catch(error => console.error('Error fetching students:', error));
    }, []);

    const handleAssignClick = async (student) => {
        console.log(`Assigning supervisor for student ID: ${student.student_id}`);

        // Check if there are at least two supervisors selected
        if (!student.selected_supervisors || student.selected_supervisors.length < 2) {
            console.error('Not enough supervisors selected.');
            return;
        }

        try {
            const [firstSupervisorId, secondSupervisorId] = student.selected_supervisors;

            // Fetch supervisor details
            const firstSupervisor = await fetch(`http://localhost:5000/instructor_details/${firstSupervisorId}`).then(res => res.json());
            const secondSupervisor = await fetch(`http://localhost:5000/instructor_details/${secondSupervisorId}`).then(res => res.json());

            // Determine which supervisor to assign
            const selectedSupervisor = (firstSupervisor.availability <= secondSupervisor.availability)
                ? firstSupervisor
                : secondSupervisor;

            // Assign supervisor to the student and teammates
            const studentResponse = await fetch(`http://localhost:5000/student_details/${student.student_id}/assign-supervisor`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ assignedSupervisor: selectedSupervisor._id }),
            });

            if (!studentResponse.ok) {
                throw new Error('Failed to assign supervisor.');
            }

            console.log(`Assigned supervisor ${selectedSupervisor._id} to student ${student.student_id}`);

            // Deduct supervisor availability
            const availabilityResponse = await fetch(`http://localhost:5000/instructor_details/${selectedSupervisor._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ availability: Number(selectedSupervisor.availability) - 1 }),
            });

            if (!availabilityResponse.ok) {
                throw new Error('Failed to update supervisor availability.');
            }

            alert('Supervisor assigned successfully!');
        } catch (error) {
            console.error('Error assigning supervisor:', error);
        }
    };

    return (
        <div>
            <h2 className="text-2xl text-center text-purple-800 font-semibold mb-6">Supervisor Assignment</h2>
            <table className="table-auto w-full border bg-white">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Student ID</th>
                        <th className="border px-4 py-2">Selected Supervisors</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student._id}>
                            <td className="border px-4 py-2">{student.student_id}</td>
                            <td className="border px-4 py-2">
                                {student.selected_supervisors?.join(', ') || 'No supervisors selected'}
                            </td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => handleAssignClick(student)}
                                    className="btn bg-purple-500 hover:bg-purple-600 text-white"
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

