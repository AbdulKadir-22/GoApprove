import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext'; // Adjust this import path
import { FileText, Banknote, Users, CalendarCheck2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import ExpenseCard from '../components/Card'; // <-- Import the new ExpenseCard

// Mock data remains as a fallback
const staticStats = {
    pendingRequests: 12,
    approvedThisMonth: 6,
    expenseCategories: 8,
    users: 50,
};

const staticRequests = [
    { _id: 'exp1', description: 'Client Dinner Meeting', date: '2025-10-04T10:00:00.000Z', employeeName: 'Priya Sharma', category: 'Meals', amount: 450.00 },
    { _id: 'exp2', description: 'Office Supplies Purchase', date: '2025-10-03T14:30:00.000Z', employeeName: 'Rohan Verma', category: 'Office Supplies', amount: 120.50 },
    { _id: 'exp3', description: 'Taxi Fare for Airport', date: '2025-10-02T08:00:00.000Z', employeeName: 'Anjali Singh', category: 'Travel', amount: 75.00 },
];

// --- API Simulation Functions (Backend Ready) ---
// This function will contain your actual API call to update status
const updateExpenseStatusAPI = async (expenseId, status) => {
    console.log(`Simulating API call to update expense ${expenseId} to ${status}`);
    // ** UNCOMMENT THIS WHEN BACKEND IS READY **
    // try {
    //   await axios.patch(`/api/v1/expenses/${expenseId}/status`, { status });
    //   return { success: true };
    // } catch (error) {
    //   console.error("Failed to update expense status:", error);
    //   return { success: false, error };
    // }
    
    // For now, we simulate a successful API call
    return { success: true };
};


const AdminDashboard = () => {
    const { user } = useContext(AuthContext);

    const [stats, setStats] = useState(staticStats);
    const [recentRequests, setRecentRequests] = useState([]); // Start with empty array

    // useEffect to handle data fetching (ready for API call)
    useEffect(() => {
        const fetchRecentRequests = async () => {
            console.log("Fetching recent requests...");
            // ** UNCOMMENT THIS WHEN BACKEND IS READY **
            // try {
            //   const response = await axios.get('/api/v1/expenses/recent-pending');
            //   setRecentRequests(response.data);
            // } catch (error) {
            //   console.error("Failed to fetch recent requests:", error);
            //   setRecentRequests(staticRequests); // Fallback to mock data on error
            // }

            // For now, we use the mock data directly
            setRecentRequests(staticRequests);
        };

        fetchRecentRequests();
    }, []); // Empty dependency array means this runs once on mount


    const handleApproval = async (expenseId, status) => {
        const result = await updateExpenseStatusAPI(expenseId, status);

        if (result.success) {
            // If the API call was successful, update the UI
            setRecentRequests(prevRequests =>
                prevRequests.filter(req => req._id !== expenseId)
            );

            setStats(prevStats => ({
                ...prevStats,
                pendingRequests: prevStats.pendingRequests - 1,
            }));
        } else {
            // Optionally, show an error message to the user
            alert(`Failed to ${status} the expense. Please try again.`);
        }
    };

    return (
        <>
            <Navbar />
            <div className="p-8 bg-gray-50 min-h-screen font-sans">
                <header className="mb-10 text-center">
                    <h1 className="text-4xl font-bold text-gray-800">Hello, <span className="text-indigo-600">{user?.companyName || 'Company Name'}</span></h1>
                    <p className="text-gray-500 mt-1">Here's what's happening today.</p>
                </header>

                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <StatCard icon={<FileText className="text-blue-500" />} title="Pending Requests" value={stats.pendingRequests} />
                    <StatCard icon={<CalendarCheck2 className="text-green-500" />} title="Approved This Month" value={stats.approvedThisMonth} />
                    <StatCard icon={<Banknote className="text-yellow-500" />} title="Expense Categories" value={stats.expenseCategories} />
                    <StatCard icon={<Users className="text-purple-500" />} title="Users" value={stats.users} />
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">Recent Pending Requests</h2>
                    <div className="space-y-4">
                        {recentRequests.length > 0 ? (
                            recentRequests.map(request => (
                                <ExpenseCard
                                    key={request._id}
                                    request={request}
                                    onApprove={() => handleApproval(request._id, 'approved')}
                                    onReject={() => handleApproval(request._id, 'rejected')}
                                />
                            ))
                        ) : (
                            <p className="text-center text-gray-500 py-10 bg-white rounded-lg shadow-sm">No pending requests at the moment. ✨</p>
                        )}
                    </div>
                </section>
            </div>
        </>
    );
};

const StatCard = ({ icon, title, value }) => (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between transition-transform transform hover:scale-105">
        <div className="flex items-center space-x-4">
            <div className="bg-gray-100 p-3 rounded-full">{icon}</div>
            <div>
                <p className="text-gray-500 text-sm">{title}</p>
                <p className="text-2xl font-bold text-gray-800">{value}</p>
            </div>
        </div>
        <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
    </div>
);

export default AdminDashboard;