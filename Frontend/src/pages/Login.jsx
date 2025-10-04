import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import { useAuth } from "../contexts/AuthContext";
import sidepanel from "../assets/SidePanel1.png";
import logo1 from "../assets/logo2.png";

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

    // This is the password toggle icon component from your Signup page.
    const PasswordToggleIcon = ({ show, onClick }) => (
        <button type="button" onClick={onClick} className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-[#5e17eb]">
            {show ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path><line x1="2" x2="22" y1="2" y2="22"></line></svg>
            )}
        </button>
    );

    return (
        <div className="w-full p-0 md:pr-30 md:pl-30 pt-0 p flex flex-col md:flex-row bg-white overflow-hidden ">

            <div className="hidden md:flex md:w-1/2 items-center justify-center p-12">
                <img
                    src={sidepanel}
                    alt="Expense Management Illustration"
                    className="w-full h-auto object-contain"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x600/5e17eb/ffffff?text=Illustration'; }}
                />
            </div>
            <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">

                <div className="flex items-left mb-12">
                    <img
                        src={logo1}
                        alt="GoApprove Logo"
                        className="w-64 h-auto"
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/256x64/5e17eb/ffffff?text=GoApprove'; }}
                    />
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-2">Login</h2>
                <p className=" mb-8 text-3xl"style={{ color: '#5e17eb' }}>Login in to your expense Dashboard</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input id="email" type="email" name="email" placeholder="you@example.com" className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:outline-none focus:ring-2 transition-all duration-300" style={{ '--tw-ring-color': '#5e17eb' }} value={formData.email} onChange={handleChange} required />
                    </div>

                    <div>
                        <div className="flex justify-between items-baseline">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        </div>
                        <div className="relative">
                            <input id="password" type={showPassword ? 'text' : 'password'} name="password" placeholder="Enter your password" className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:outline-none focus:ring-2 transition-all duration-300" style={{ '--tw-ring-color': '#5e17eb' }} value={formData.password} onChange={handleChange} required />
                            <PasswordToggleIcon show={showPassword} onClick={() => setShowPassword(!showPassword)} />
                        </div>
                    </div>

                    {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md text-sm" role="alert"><p>{error}</p></div>}

                    <div>
                        <button type="submit" className="w-full group flex justify-center items-center text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed" style={{ backgroundColor: '#5e17eb' }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#5014c2'} onMouseOut={e => e.currentTarget.style.backgroundColor = '#5e17eb'} disabled={loading}>
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    <span>Logging In...</span>
                                </>
                            ) : (
                                <span>Login</span>
                            )}
                        </button>
                    </div>
                </form>

                <p className="text-center text-gray-600 mt-8 text-sm">
                    Don't have an account?
                    <NavLink to="/signup" className="font-semibold ml-1" style={{ color: '#5e17eb' }}>
                        Register
                    </NavLink>
                </p>
                <br></br>
                <a href="#" className="text-4x1 font-semibold text-center" style={{ color: '#5e17eb' }}>Forgot Password?</a>
            </div>

            {/* Image Section */}

        </div>
    );
};

export default Login;
