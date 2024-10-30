import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";

const PersonalDetails = () => {
  const [studentProfile, setStudentProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { student_id } = useParams(); 
  useEffect(() => {
    
    fetch(`http://localhost:5000/student_details/${student_id}`)
      .then(response => response.json())
      .then(data => {
        setStudentProfile(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, [student_id]);

  if (isLoading) {
    return <Loading></Loading>
  }

  if (!studentProfile) { 
    return <div>Error loading student profile.</div>;
  }

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="rounded-full bg-gray-200 w-24 h-24 mb-4 flex items-center justify-center text-2xl mt-20">
          {studentProfile.img ? (
            <img
              src={`data:image/jpeg;base64,${studentProfile.img}`} 
              alt="Student Profile"
              className="rounded-full w-full h-full object-cover"
            />
          ) : (
            <span role="img" aria-label="profile">👤</span>
          )}
        </div>
        <h2 className="text-xl font-bold mb-4 text-center text-purple-800">Student Profile</h2>
      </div>
      <div className="space-y-4 mt-4 border-t pt-4">
        <p className="py-2 border-b border-gray-300"><strong>Name:</strong> {studentProfile.name}</p>
        <p className="py-2 border-b border-gray-300"><strong>Student ID:</strong> {studentProfile.student_id}</p>
        <p className="py-2 border-b border-gray-300"><strong>Gender:</strong> {studentProfile.gender}</p>
        <p className="py-2 border-b border-gray-300"><strong>Email:</strong> {studentProfile.email}</p>
        <p className="py-2 border-b border-gray-300"><strong>Address:</strong> {studentProfile.address}</p>
        <p className="py-2 border-b border-gray-300"><strong>Department:</strong> {studentProfile.department}</p>
        <p className="py-2 border-b border-gray-300"><strong>Date of Birth:</strong> {studentProfile.dateOfBirth}</p>
        <p className="py-2 border-b border-gray-300"><strong>Phone Number:</strong> {studentProfile.phoneNumber}</p>
        <p className="py-2 border-b border-gray-300"><strong>Batch:</strong> {studentProfile.batch}</p>
      </div>
    </div>
  );
};

export default PersonalDetails;
