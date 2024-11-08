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
        })
        .catch(error => {
          console.error("Error fetching student details:", error);
        });
    };

    fetchStudentDetails();
  }, [user?.student_id]);

  useEffect(() => {
    const fetchAndFilterSupervisors = () => {
      fetch('/supervisors_list.json')
        .then(response => response.json())
        .then(data => {
          const eligibleSupervisors = data.filter(supervisor =>
            supervisor.availability > 0 &&
            supervisor.Department === student?.department &&
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
  const handleSelect = (supervisor) => {
    if (selectedSupervisors.length < 2) {
      setSelectedSupervisors(prev => [...prev, supervisor]);
    } else {
      alert('You can only select 2 supervisors!');
    }
  };

  // Handle unselecting a supervisor
  const handleUnselect = (supervisorId) => {
    setSelectedSupervisors(prev => prev.filter(sup => sup.id !== supervisorId));
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
                <tr key={supervisor.id}>
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{supervisor.Name}</td>
                  <td className="px-4 py-2 border">{supervisor.Department}</td>
                  <td className="px-4 py-2 border">{supervisor.Email}</td>
                  <td className="px-4 py-2 border">{supervisor.Phone}</td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      className={`px-2 py-1 ${selectedSupervisors.some((sup) => sup.id === supervisor.id) ? 'bg-green-500' : 'bg-purple-500'} text-white rounded hover:bg-purple-600`}
                      onClick={() =>
                        selectedSupervisors.some((sup) => sup.id === supervisor.id)
                          ? handleUnselect(supervisor.id)
                          : handleSelect(supervisor)
                      }
                      disabled={selectedSupervisors.some((sup) => sup.id === supervisor.id)}
                    >
                      {selectedSupervisors.some((sup) => sup.id === supervisor.id)
                        ? 'Selected'
                        : 'Select'}
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
