import UserNavbar from '../components/UserNavigation'; // Make sure this path is correct

// --- Static Data ---
// In a real application, you would fetch this data from your backend
// or get it from a global state/context (like React Context or Redux).
const userProfileData = {
  userName: 'Ayaan Shaikh',
  companyEmail: 'ayaan.shaikh@goapprove.com',
  role: 'Employee',
  avatarUrl: 'https://placehold.co/100x100/6366f1/FFFFFF?text=AS' // A placeholder avatar
};


const UserProfilePage = () => {
  const handleEditProfile = () => {
    // This is where you would trigger a modal to open or navigate to an edit page.
    console.log("Edit Profile clicked!");
    alert("This would open a form to edit the user's profile.");
  };

  return (
    <>
      <UserNavbar />
      <div className="flex justify-center items-start pt-16 md:pt-24 bg-gray-50 min-h-screen px-4">
        <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8 sm:p-10 flex flex-col items-center text-center">
          
          {/* Header Section with Avatar and Name */}
          <div className="mb-8">
            <img 
              src={userProfileData.avatarUrl} 
              alt="User Avatar" 
              className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-white shadow-md"
            />
            <h1 className="text-3xl font-bold text-indigo-600">{userProfileData.userName}</h1>
          </div>
          
          {/* Details Section */}
          <div className="w-full max-w-sm space-y-5 text-left mb-10">
            <ProfileDetailRow label="User Name" value={userProfileData.userName} />
            <ProfileDetailRow label="Company Email" value={userProfileData.companyEmail} />
            <ProfileDetailRow label="Role" value={userProfileData.role} />
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

export default UserProfilePage;
