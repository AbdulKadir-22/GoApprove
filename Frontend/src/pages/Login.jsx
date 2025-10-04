import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import { useAuth } from "../contexts/AuthContext";


const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); 
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await axiosInstance.post("/user/login", formData);
            const { token } = response.data;

            if (token) {
                login(token); 
                navigate("/form");
            }
        } catch (err) {
            const errorMessage = err.response?.data?.error || "Login failed. Please try again.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden">
                
                {/* Form Section */}
                <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
                    <p className="text-gray-600 mb-8">
                        Don't have an account? 
                        <NavLink to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors duration-300 ml-1">
                            Sign up
                        </NavLink>
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            {/* ✨ UI ENHANCEMENT: Input with icon */}
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                                </span>
                                <input id="email" type="email" name="email" placeholder="you@example.com" className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-100 border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300" value={formData.email} onChange={handleChange} required />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-baseline">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <a href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">Forgot Password?</a>
                            </div>
                            {/* ✨ UI ENHANCEMENT: Password input with icon and visibility toggle */}
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                </span>
                                <input id="password" type={showPassword ? 'text' : 'password'} name="password" placeholder="Enter your password" className="w-full pl-10 pr-10 py-3 rounded-lg bg-gray-100 border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300" value={formData.password} onChange={handleChange} required />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-indigo-600">
                                    {showPassword ? ( <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a9.97 9.97 0 01-1.563 3.029m-2.122-2.122A3 3 0 0012 15a3 3 0 00-1.022-.212" /></svg> ) : ( <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg> )}
                                </button>
                            </div>
                        </div>
                        
                        {error && ( <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert"><p>{error}</p></div> )}

                        <div>
                            {/* ✨ UI ENHANCEMENT: Button with hover micro-interaction */}
                            <button type="submit" className="w-full group flex justify-center items-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading}>
                                {loading ? ( <> <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> <span>Logging In...</span> </> ) : ( <> <span>Sign In</span> <svg className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg> </> )}
                            </button>
                        </div>
                    </form>

                </div>

                {/* Image Section */}
                <div className="hidden md:block md:w-1/2">
                    <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?q=80&w=2070&auto=format&fit=crop" alt="A modern building with interesting architecture"/>
                </div>
            </div>
        </div>
    );
};

export default Login;