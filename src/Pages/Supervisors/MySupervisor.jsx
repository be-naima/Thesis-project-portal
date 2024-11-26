import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Authentication/AuthProvider/AuthProvider";

const MySupervisor = () => {
    const { user } = useContext(AuthContext);  // Get user from context
    const [supervisor, setSupervisor] = useState([]);  // To store supervisor data
    const [loading, setLoading] = useState(true);  // To handle loading state
    const [error, setError] = useState(null);  // To handle errors

    useEffect(() => {
        // Only fetch data if user and user.student_id are available
        if (user && user.student_id) {
            setLoading(true);
            setError(null);  // Reset any previous errors

            // Fetch student details to get the assigned supervisor ID
            fetch(`http://localhost:5000/student_details/${user.student_id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch student details');
                    }
                    return response.json();
                })
                .then(studentData => {
                    if (studentData.assignedSupervisor) {
                        // Fetch supervisor details using the assignedSupervisor ID
                        return fetch(`http://localhost:5000/instructor_details/${studentData.assignedSupervisor}`);
                    } else {
                        throw new Error('No supervisor assigned');
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch supervisor details');
                    }
                    return response.json();
                })
                .then(supervisorData => {
                    setSupervisor(supervisorData);  // Set supervisor data
                    setLoading(false);  // Stop loading
                })
                .catch(error => {
                    setError(error.message);  // Set error message
                    setLoading(false);  // Stop loading
                });
        } else {
            setLoading(false);  // If user or student_id is not available, stop loading
        }
    }, [user]);

    // Render the loading state, error state, or supervisor data
    return (
        <div className="pt-44 flex justify-center bg-gray-100 py-24">
            <div className="w-full max-w-lg bg-white border border-gray-200 rounded-lg shadow-md p-8 m-4">
                <h2 className="text-2xl text-center font-bold text-purple-800 mb-2">My Supervisor</h2>
                {loading ? (
                    <p className="text-center text-gray-600">Loading...</p>
                ) : error ? (
                    <p className="text-center text-red-600">{error}</p>
                ) : supervisor ? (
                    <>
                        <p className="mb-1">
                            <span className="text-purple-800 font-bold">Name:</span>
                            <span className="text-gray-600 font-medium"> {supervisor.name}</span>
                        </p>
                        <p className="mb-1">
                            <span className="text-purple-800 font-bold">Designation:</span>
                            <span className="text-gray-600 font-medium"> {supervisor.designation}</span>
                        </p>
                        <p className="mb-1">
                            <span className="text-purple-800 font-bold">Qualification:</span>
                            <span className="text-gray-600 font-medium"> {supervisor.qualification}</span>
                        </p>
                        <p className="mb-1">
                            <span className="text-purple-800 font-bold">Department:</span>
                            <span className="text-gray-600 font-medium"> {supervisor.department}</span>
                        </p>
                        <p className="mb-1">
                            <span className="text-purple-800 font-bold">Phone:</span>
                            <span className="text-gray-600 font-medium"> {supervisor.phone}</span>
                        </p>
                        <p className="mb-1">
                            <span className="text-purple-800 font-bold">Email:</span>
                            <span className="text-gray-600 font-medium"> {supervisor.email}</span>
                        </p>
                    </>
                ) : (
                    <p className="text-center text-gray-600">No supervisor assigned yet.</p>
                )}
            </div>
        </div>
    );
};

export default MySupervisor;
