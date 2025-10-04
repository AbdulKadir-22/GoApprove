import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ExpenseSubmission from './pages/ExpenseSubmission';
import ReceiptScanner from './components/ReceiptScanner'


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/submit" element={<ExpenseSubmission/>}/>
      <Route path="/scanner" element={<ReceiptScanner/>}/>
      <Route path="/" element={<ExpenseSubmission/>}/>
    </Routes>
  );
};

export default AppRoutes;