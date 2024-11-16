import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Authentication/AuthProvider/AuthProvider";

const SelectSupervisor = () => {
  const { user } = useContext(AuthContext);
  const [student, setStudent] = useState(null);
  const [supervisors, setSupervisors] = useState([]);
  const [selectedSupervisors, setSelectedSupervisors] = useState([]);

  useEffect(() => {
    if (!user?.student_id) return;

    console.log("Fetched student_id:", user.student_id);

    const fetchStudentDetails = () => {
      fetch(`http://localhost:5000/student_details/${user.student_id}`)
        .then(response => response.json())
        .then(data => {
          console.log("Student Details:", data);
          setStudent(data);
          setSelectedSupervisors(data.selected_supervisors || []);
        })
        .catch(error => {
          console.error("Error fetching student details:", error);
        });
    };

    fetchStudentDetails();
  }, [user?.student_id]);

  useEffect(() => {
    const fetchAndFilterSupervisors = () => {
      fetch(`http://localhost:5000/instructor_details`)
        .then(response => response.json())
        .then(data => {
          console.log("Fetched Supervisors Data:", data);
          const eligibleSupervisors = data.filter(supervisor =>
            supervisor.availability > 0 &&
            supervisor.department === student?.department &&
            student?.cg >= supervisor.minCGPA
          );
          setSupervisors(eligibleSupervisors);
        })
        .catch(error => {
          console.log("Error fetching supervisors:", error);
        });
    };

    if (student) {
      fetchAndFilterSupervisors();
    }
  }, [student]);



  // Handle supervisor selection
  const handleSelect = async (supervisor) => {
    if (selectedSupervisors.length < 2 && !selectedSupervisors.some(sup => sup._id === supervisor._id)) {
      try {
        const response = await fetch(`http://localhost:5000/student_details/${user.student_id}/select-supervisor`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ supervisorId: supervisor._id }),
        });

        if (response.ok) {
          setSelectedSupervisors((prev) => [...prev, supervisor]); // Add supervisor to state
          alert('Supervisor selected successfully');
        } else {
          const data = await response.json();
          alert(data.message || 'Failed to select supervisor');
        }
      } catch (error) {
        console.error('Error selecting supervisor:', error);
        alert('Error selecting supervisor');
      }
    } else {
      alert('You can only select 2 supervisors!');
    }
  };




  return (
    <div className="mx-auto bg-gray-100 h-[800px] overflow-auto">
      <div className="container bg-gray-100 pt-36 mb-26 p-4">
        <h1 className="text-center text-2xl custom-heading font-extrabold mb-8">SUPERVISORS LIST</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
            <thead>
              <tr>
                <th className="px-4 py-2 border">SL</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Department</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {supervisors.map((supervisor, index) => (
                <tr key={supervisor._id}>
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{supervisor.name}</td>
                  <td className="px-4 py-2 border">{supervisor.department}</td>
                  <td className="px-4 py-2 border">{supervisor.email}</td>
                  <td className="px-4 py-2 border">{supervisor.phone}</td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      className={`px-2 py-1 ${selectedSupervisors.some((sup) => sup._id === supervisor._id)
                        ? 'bg-green-500 text-white rounded hover:bg-green-600'
                        : 'bg-purple-500 text-white rounded hover:bg-purple-600'}`}
                      onClick={() => {handleSelect(supervisor)}}
                    >
                      {selectedSupervisors.some((sup) => sup._id === supervisor._id) ? 'Selected' : 'Select'}
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

export default SelectSupervisor;
