import React, { useState, useMemo } from "react";
// import { NavLink, useNavigate } from "react-router-dom"; 
// import axiosInstance from "../api/axios";
import sidepanel from "../assets/SidePanel.png";
import logo1 from "../assets/logo2.png"

const countries = [
    "United States", "Canada", "Mexico", "United Kingdom", "Germany", "France", "Japan", "Australia", "India", "Brazil"
];


const Signup = () => {
    // --- State Management ---
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        country: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        setLoading(true);

        try {
            const { confirmPassword, ...postData } = formData;

            await axiosInstance.post("/user/signup", postData);
            setSuccess("Account created successfully! Redirecting to login...");

            setTimeout(() => {
                // In a real app: navigate("/login");
                window.location.href = "/login";
            }, 2000);

        } catch (err) {
            setError(err.response?.data?.error || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

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

                <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">

                    <div className="flex items-left mb-12">                      
                        <img
                            src={logo1}
                            alt="Expense Management Illustration"
                            className="w-64 h-auto"
                        />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Register</h2>
                    <p className="text-gray-600 mb-8">Welcome to GoApprove.</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Form Fields */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input id="name" type="text" name="name" placeholder="John Doe" className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:outline-none focus:ring-2 transition-all duration-300" style={{ '--tw-ring-color': '#5e17eb' }} value={formData.name} onChange={handleChange} required />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input id="email" type="email" name="email" placeholder="you@example.com" className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:outline-none focus:ring-2 transition-all duration-300" style={{ '--tw-ring-color': '#5e17eb' }} value={formData.email} onChange={handleChange} required />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Set Password</label>
                            <div className="relative">
                                <input id="password" type={showPassword ? 'text' : 'password'} name="password" placeholder="Enter your password" className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:outline-none focus:ring-2 transition-all duration-300" style={{ '--tw-ring-color': '#5e17eb' }} value={formData.password} onChange={handleChange} required />
                                <PasswordToggleIcon show={showPassword} onClick={() => setShowPassword(!showPassword)} />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                            <div className="relative">
                                <input id="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" placeholder="Confirm your password" className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:outline-none focus:ring-2 transition-all duration-300" style={{ '--tw-ring-color': '#5e17eb' }} value={formData.confirmPassword} onChange={handleChange} required />
                                <PasswordToggleIcon show={showConfirmPassword} onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Select Country</label>
                            <select id="country" name="country" className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:outline-none focus:ring-2 transition-all duration-300" style={{ '--tw-ring-color': '#5e17eb' }} value={formData.country} onChange={handleChange} required>
                                <option value="" disabled>Please select</option>
                                {countries.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        {/* Error and Success Messages */}
                        {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md text-sm" role="alert"><p>{error}</p></div>}
                        {success && <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md text-sm" role="alert"><p>{success}</p></div>}

                        {/* Submit Button */}
                        <div>
                            <button type="submit" className="w-full group flex justify-center items-center text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed" style={{ backgroundColor: '#5e17eb' }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#5014c2'} onMouseOut={e => e.currentTarget.style.backgroundColor = '#5e17eb'} disabled={loading}>
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        <span>Registering...</span>
                                    </>
                                ) : (
                                    <span>Register</span>
                                )}
                            </button>
                        </div>
                    </form>

                    <p className="text-center text-gray-600 mt-8 text-sm">
                        Already have an account?
                        <a href="/login" className="font-semibold ml-1" style={{ color: '#5e17eb' }}>
                            Login
                        </a>
                    </p>
                </div>

                <div className="hidden md:flex md:w-1/2 items-center justify-center p-12">
                    <img
                        src={sidepanel}
                        alt="Expense Management Illustration"
                        className="w-full h-auto object-contain "
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x400/5e17eb/ffffff?text=Illustration'; }}
                    />

                </div>
            </div>
    );
};

export default Signup;
