import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";

const PersonalDetails = () => {
    const [instructorProfile, setInstructorProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { _id } = useParams();
    useEffect(() => {

        fetch(`http://localhost:5000/instructor_details/${_id}`)
            .then(response => response.json())
            .then(data => {
                setInstructorProfile(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            });
    }, [_id]);

    if (isLoading) {
        return <Loading></Loading>
    }

    if (!instructorProfile) {
        return <div>Error loading student profile.</div>;
    }

    return (
        <div>
            <div className="flex flex-col items-center">
                <div className="rounded-full bg-gray-200 w-24 h-24 mb-4 flex items-center justify-center text-2xl mt-20">
                    {instructorProfile.img ? (
                        <img
                            src={`data:image/jpeg;base64,${instructorProfile.img}`}
                            alt="Student Profile"
                            className="rounded-full w-full h-full object-cover"
                        />
                    ) : (
                        <span role="img" aria-label="profile">👤</span>
                    )}
                </div>
                <h2 className="text-xl font-bold mb-4 text-center text-purple-800">Instructor Profile</h2>
            </div>
            <div className="space-y-4 mt-4 border-t pt-4">
                <p className="py-2 border-b border-gray-300"><strong>Name:</strong> {instructorProfile.name}</p>
                <p className="py-2 border-b border-gray-300"><strong>Designation:</strong> {instructorProfile.designation}</p>
                <p className="py-2 border-b border-gray-300"><strong>Qualification:</strong> {instructorProfile.qualification.join(", ")}</p>
                <p className="py-2 border-b border-gray-300"><strong>Department:</strong> {instructorProfile.dept}</p>
                <p className="py-2 border-b border-gray-300"><strong>Email:</strong> {instructorProfile.email}</p>
                <p className="py-2 border-b border-gray-300"><strong>Phone Number:</strong> {instructorProfile.phone}</p>
            </div>
        </div>
    );
};

export default PersonalDetails;
