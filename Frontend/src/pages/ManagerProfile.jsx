import React from 'react';
import ManagerNavbar from '../components/ManagerNavigation'; // Using the main admin navbar for this page

// --- Static Data for an Employee ---
// This would typically be fetched based on a user ID from the URL
const employeeProfileData = {
  userName: 'Priya Sharma',
  companyEmail: 'priya.sharma@goapprove.com',
  role: 'Manager',
  avatarUrl: 'https://placehold.co/100x100/6366f1/FFFFFF?text=PS' // A placeholder avatar
};


const EmployeeProfilePage = () => {
  const handleEditProfile = () => {
    // Logic for editing the employee's profile
    console.log("Editing employee profile...");
    alert("This would open a form to edit the employee's details.");
  };

  return (
    <>
      <ManagerNavbar/>
      <div className="flex justify-center items-start pt-16 md:pt-24 bg-gray-50 min-h-screen px-4">
        <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8 sm:p-10 flex flex-col items-center text-center">
          
          {/* Header Section with Avatar and Name */}
          <div className="mb-8">
            <img 
              src={employeeProfileData.avatarUrl} 
              alt="Employee Avatar" 
              className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-white shadow-md"
            />
            <h1 className="text-3xl font-bold text-indigo-600">{employeeProfileData.userName}</h1>
          </div>
          
          {/* Details Section */}
          <div className="w-full max-w-sm space-y-5 text-left mb-10">
            <ProfileDetailRow label="User Name" value={employeeProfileData.userName} />
            <ProfileDetailRow label="Company Email" value={employeeProfileData.companyEmail} />
            <ProfileDetailRow label="Role" value={employeeProfileData.role} />
          </div>

          {/* Action Button */}
          <button
            onClick={handleEditProfile}
            className="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 transition-transform transform hover:scale-105"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </>
  );
};


// --- Reusable Sub-component for a single row of profile info ---
const ProfileDetailRow = ({ label, value }) => (
  <div className="flex justify-between items-center border-b border-gray-200 pb-3">
    <p className="text-md font-medium text-gray-500">{label}</p>
    <p className="text-md text-gray-800 font-semibold">{value}</p>
  </div>
);

export default EmployeeProfilePage;
