import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'; // Assuming you have a Navbar component

// --- Static Data (Simulating a backend API call) ---
const staticProfileData = {
  companyName: 'GoApprove Inc.',
  companyEmail: 'contact@goapprove.com',
  country: 'India',
  userCount: 50,
  logoUrl: 'https://placehold.co/100x100/6366f1/FFFFFF?text=GA' // Placeholder logo
};


const ProfilePage = () => {
  // State to hold the profile data
  const [profileData, setProfileData] = useState(null);

  // useEffect to simulate fetching data when the component loads
  useEffect(() => {
    // In the future, you would make an API call here.
    // For now, we just set the static data.
    setProfileData(staticProfileData);
  }, []); // The empty array ensures this runs only once

  const handleEditProfile = () => {
    // This function will handle the logic for editing the profile
    console.log("Edit Profile button clicked!");
    alert("Edit functionality would be implemented here.");
  };

  // Display a loading message until the data is "fetched"
  if (!profileData) {
    return <div>Loading profile...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center bg-gray-50 min-h-screen p-8 font-sans">
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-10 flex flex-col items-center text-center">
          
          {/* Header Section */}
          <div className="mb-8">
            <img 
              src={profileData.logoUrl} 
              alt="Company Logo" 
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h1 className="text-3xl font-bold text-gray-800">{profileData.companyName}</h1>
          </div>
          
          {/* Details Section */}
          <div className="w-full max-w-md space-y-4 text-left mb-10">
            <ProfileDetailRow label="Company Name" value={profileData.companyName} />
            <ProfileDetailRow label="Company Email" value={profileData.companyEmail} />
            <ProfileDetailRow label="Country" value={profileData.country} />
            <ProfileDetailRow label="No. of Users" value={profileData.userCount} />
          </div>

          {/* Action Button */}
          <button
            onClick={handleEditProfile}
            className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 transition-transform transform hover:scale-105"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </>
  );
};


// --- Sub-component for a single row of profile information ---
const ProfileDetailRow = ({ label, value }) => (
  <div className="flex justify-between items-center border-b pb-2">
    <p className="text-md font-medium text-gray-600">{label}</p>
    <p className="text-md text-gray-800 font-semibold">{value}</p>
  </div>
);

export default ProfilePage;