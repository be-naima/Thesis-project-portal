import { useContext, useRef, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { sendPasswordResetEmail } from "firebase/auth";

import { useNavigate } from "react-router-dom";
import auth from "../../Firebase/firebase.config";


const Login = () => {

    const { loginUser, signInWithGoogle } = useContext(AuthContext)
    const emailRef = useRef(null);


    const handleLoginbtn = e => {

        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
        //check if admin
        fetch('http://localhost:5000/admin_details', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.isAdmin) {
                    
                    navigate('/admin-dashboard');
                } else {
                    
                    loginUser(email, password)
                        .then(result => {
                            console.log(result.user);
                            navigate('/');
                        })
                        .catch(error => {
                            console.error('Firebase Login Error:', error);
                            alert('Incorrect email or password');
                        });
                }
            })
            .catch(error => {
                console.error('Error during admin login:', error);
            });

    }

    //sign in with google
    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user);
                navigate('/');
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleForgetPass = () => {
        const email = emailRef.current.value;
        if (!email) {
            alert("Please enter your email address first.");
            return;
        }
        console.log('send reset email', emailRef.current.value)
        sendPasswordResetEmail(auth, email)
            .then(alert("Please check your email."))
            .catch(error => {
                console.log(error);
            })
    }

    const navigate = useNavigate();
    const handleSignup = () => {
        navigate('/signup');
    }
    return (
        <div className="flex justify-center items-center min-h-screen background-image">
            <div className="w-full max-w-md p-6 bg-gray rounded-lg ">
                <h2 className="text-3xl font-bold text-center mb-2 text-white">Thesis/Project Portal</h2>
                <h2 className="text-2xl font-bold text-center mb-2 text-white">LOGIN FORM</h2>
                <form onSubmit={handleLoginbtn} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium">
                            Email address
                        </label>
                        <input
                            type="email"
                            required name="email"
                            placeholder="username@site.com"
                            className="mt-1 block w-full px-4 py-2 border rounded-lg bg-gray-50"
                        />
                    </div>
                    <div >
                        <label className="block text-sm font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            required name="password"
                            placeholder="Enter password"
                            className="mt-1 block w-full px-4 py-2 border rounded-lg bg-gray-50"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full font-bold py-2 px-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                    >
                        Login
                    </button>
                    <a onClick={handleForgetPass} href="#!" className="block mt-6 text-sm text-white hover:underline text-center">
                        Forgot password?
                    </a>
                    <div className="text-center">
                        <p className="text-sm text-white">
                            Don't have an account?{" "}
                            <a onClick={handleSignup} href="#" className="text-purple-600 hover:underline" >
                                SignUp
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
    );
};

export default Login;