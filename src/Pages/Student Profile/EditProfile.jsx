import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { FaPlus } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

const EditProfile = ({ studentID }) => {
    const { student_id } = useParams(); 
    const [student, setStudent] = useState({
        name: '',
        phoneNumber: '',
        address: '',
        img: null, 
    });
    const [imgSrc, setImgSrc] = useState(''); 

    useEffect(() => {
       
        fetch(`http://localhost:5000/student_details/${student_id}`)
            .then((response) => response.json())
            .then((data) => {
                setStudent(data);
                if (data.img) {
                    setImgSrc(`data:image/jpeg;base64,${data.img}`);
                }
            })
            .catch((error) => console.error('Error fetching student data:', error));
    }, [studentID]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setStudent((prev) => ({ ...prev, img: file })); 
        setImgSrc(URL.createObjectURL(file)); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', student.name);
        formData.append('phoneNumber', student.phoneNumber);
        formData.append('address', student.address);
        if (student.img) {
            formData.append('img', student.img); 
        }

        fetch(`http://localhost:5000/student_details/${student_id}`, {
            method: 'PUT',
            body: formData, 
        })
            .then((response) => response.json())
            .then((data) => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setStudent(data);
                if (data.img) {
                    setImgSrc(`data:image/jpeg;base64,${data.img}`); 
                }
            })
            .catch((error) => console.error('Error updating profile:', error));
    };

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-4">
            {/* Profile Avatar */}
            <div className="relative mb-4">
                <div className="rounded-full bg-gray-200 w-24 h-24 flex items-center justify-center text-2xl mt-4">
                    {imgSrc ? (
                        <img src={imgSrc} alt="Student Profile" className="rounded-full w-full h-full object-cover" />
                    ) : (
                        <span role="img" aria-label="profile">👤</span>
                    )}
                </div>
                <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <label
                        htmlFor="file-upload"
                        className="bg-blue-500 text-white font-bold rounded-full p-2 mt-48 mr-4 cursor-pointer flex items-center justify-center"
                        style={{ fontSize: '0.8rem' }} 
                    >
                        <FaPlus />
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>
            </div>

            <h2 className="text-xl font-bold mb-4 text-center text-purple-800">Edit Profile</h2>
            <form onSubmit={handleSubmit} className="w-full">
                <div className="mb-4">
                    <label className="block mb-1">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={student.name}
                        onChange={handleChange}
                        className="border px-2 py-1 w-full rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Phone Number:</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={student.phoneNumber}
                        onChange={handleChange}
                        className="border px-2 py-1 w-full rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={student.address}
                        onChange={handleChange}
                        className="border px-2 py-1 w-full rounded"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditProfile;
