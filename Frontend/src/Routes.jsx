import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ExpenseSubmission from './pages/ExpenseSubmission';
import ReceiptScanner from './components/ReceiptScanner'
import AdminDashboard from './pages/AdminDasboard';
import ClaimRequestsPage from './pages/ClaimRequest';
import AllLogsPage from './pages/AllLogs';
import ProfilePage from './pages/ProfilePage';
import UserDashboard from './pages/UserDashboard';
import UserProfilePage from './pages/UserProfile';
import EmployeeProfilePage from './pages/ManagerProfile';
import ApprovalPage from './pages/Approval';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/submit" element={<ExpenseSubmission/>}/>
      <Route path="/scanner" element={<ReceiptScanner/>}/>
      <Route path="/" element={<AdminDashboard/>}/> 
      <Route path="/claim-requests" element={<ClaimRequestsPage/>}/>
      <Route path="/all-logs" element={<AllLogsPage/>}/>
      <Route path="/profile" element={<ProfilePage/>}/>
      <Route path="/user" element={<UserDashboard/>}/>
      <Route path="/user-profile" element={<UserProfilePage/>}/>
      <Route path="/manager-profile" element={<EmployeeProfilePage/>}/>
      <Route path="/manager-dasboard" element={<ApprovalPage/>}/>
      <Route path="/" element={<EmployeeProfilePage/>}/>

    </Routes>
  );
};

export default AppRoutes;