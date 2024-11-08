import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const SignUp = () => {
    const navigate = useNavigate();
    const { createUser, signInWithGoogle } = useContext(AuthContext);

    const [signuperror, setSignUpError] = useState('');
    const [success, setSuccess] = useState('');
    const [role, setRole] = useState(""); // Track selected role

    const handleSignUpbtn = e => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const studentId = e.target.student_id?.value;
        const cgpa = e.target.cg?.value;

        console.log(name,email,password,studentId,cgpa);

        // Check if role is "Student", validate email format
        if (role === "Student" && !/^[A-Za-z0-9]+@ugrad\.iiuc\.ac\.bd$/.test(email)) {
            setSignUpError("Invalid email format for Student. Please use Student ID@urad.iiuc.ac.bd.");
            return;
        }

        if (password.length < 6) {
            setSignUpError('Password should be at least 6 characters or longer');
            return;
        }

        setSignUpError('');
        setSuccess('');

        createUser(email, password)
            .then(result => {
                console.log(result.user);
                // toast.success("Account created successfully!", { position: "top-center" });
                navigate('/');
            })
            .catch(error => {
                console.log(error);
                setSignUpError(error.message);
                // toast.error("Failed to create account", { position: "top-center" });
            });
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user);
                navigate('/login')
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div className="background-image">
            <div className="flex justify-center items-center min-h-screen ">
                <div className="w-full max-w-xl p-6 bg-gray rounded-lg pt-44 mb-26">
                    <h2 className="text-3xl font-bold text-center mb-2 text-white">Welcome to Thesis/Project Portal</h2>
                    <h2 className="text-2xl font-bold text-center mb-2 text-white">REGISTRATION FORM</h2>

                    <form onSubmit={handleSignUpbtn} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium">Name</label>
                            <input
                                type="text"
                                required name="name"
                                placeholder="Full Name"
                                className="mt-1 block w-full px-4 py-2 border rounded-lg bg-gray-50"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Role</label>
                            <select
                               required name="role"
                               onChange={(e) => setRole(e.target.value)} // Update role on change
                               className="mt-1 block w-full px-4 py-2 border rounded-lg bg-gray-50"
                            >
                                <option value="">Select Role</option>
                                <option value="Student">Student</option>
                                <option value="Instructor">Instructor</option>
                            </select>
                        </div>

                        {/* Conditionally render the Student fields if role is "Student" */}
                        {role === "Student" && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium">Student ID</label>
                                    <input
                                        type="text"
                                        required name="student_id"
                                        placeholder="e.g., C201208"
                                        className="mt-1 block w-full px-4 py-2 border rounded-lg bg-gray-50"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium">Student CGPA</label>
                                    <input
                                        type="text"
                                        required name="cg"
                                        placeholder="Cgpa"
                                        className="mt-1 block w-full px-4 py-2 border rounded-lg bg-gray-50"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium">Batch</label>
                                    <input
                                        type="text"
                                        required name="batch"
                                        placeholder="Batch"
                                        className="mt-1 block w-full px-4 py-2 border rounded-lg bg-gray-50"
                                    />
                                </div>
                            </>
                        )}

                        <div>
                            <label className="block text-sm font-medium">Department</label>
                            <select
                               required name="department"
                               className="mt-1 block w-full px-4 py-2 border rounded-lg bg-gray-50"
                            >
                                <option value="">Select Department</option>
                                <option value="CSE">CSE</option>
                                <option value="EEE">EEE</option>
                                <option value="CCE">CCE</option>
                                <option value="ETE">ETE</option>
                                <option value="PHARMACY">PHARMACY</option>
                                <option value="CE">CE</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Email address</label>
                            <input
                                type="email"
                                required name="email"
                                placeholder="Enter email/gsuit"
                                className="mt-1 block w-full px-4 py-2 border rounded-lg bg-gray-50"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Password</label>
                            <input
                                type="password"
                                required name="password"
                                placeholder="Enter password"
                                className="mt-1 block w-full px-4 py-2 border rounded-lg bg-gray-50"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Confirm Password</label>
                            <input
                                type="password"
                                required name="confirmPassword"
                                placeholder="Confirm your password"
                                className="mt-1 block w-full px-4 py-2 border rounded-lg bg-gray-50"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full font-bold py-2 px-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                        >
                            Sign Up
                        </button>

                        <div className="text-center">
                            <p className="text-sm text-white">
                                Already have an account?{" "}
                                <a onClick={handleLogin} href="#" className="text-purple-600 hover:underline">
                                    Login
                                </a>
                            </p>
                        </div>
                    </form>

                    <div className="relative flex py-4 items-center">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="flex-shrink mx-4 text-gray-500">OR</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    <div className="space-y-3">
                        <button
                            onClick={handleGoogleSignIn}
                            type="button"
                            className="w-full py-2 px-4 border rounded-lg flex items-center justify-center space-x-3 bg-gray-50 hover:bg-purple-200"
                        >
                            <img
                                src="/images/googlelogo.png"
                                alt="Google"
                                className="w-8 h-8"
                            />
                            <span>Continue with Google</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
