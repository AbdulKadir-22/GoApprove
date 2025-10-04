import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext'; // Adjust this import path
import { CheckCircle, XCircle, FileText, Banknote, Users, CalendarCheck2 } from 'lucide-react';
import Navbar from '../components/Navbar';

const staticStats = {
    pendingRequests: 12,
    approvedThisMonth: 6,
    expenseCategories: 8,
    users: 50,
};

const staticRequests = [
    {
        _id: 'exp1',
        description: 'Client Dinner Meeting',
        date: '2025-10-04T10:00:00.000Z',
        employeeName: 'Priya Sharma',
        category: 'Meals',
        amount: 450.00,
    },
];



const AdminDashboard = () => {
    const { user } = useContext(AuthContext);

    const [stats, setStats] = useState(staticStats);
    const [recentRequests, setRecentRequests] = useState(staticRequests);

    const handleApproval = (expenseId, status) => {
        n
        console.log(`Expense ${expenseId} has been ${status}.`);

        setRecentRequests(prevRequests =>
            prevRequests.filter(req => req._id !== expenseId)
        );

        setStats(prevStats => ({
            ...prevStats,
            pendingRequests: prevStats.pendingRequests - 1,
        }));
    };


    return (
        <>
            <Navbar/>
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
            <div className="bg-gray-100 p-3 rounded-full">
                {icon}
            </div>
            <div>
                <p className="text-gray-500 text-sm">{title}</p>
                <p className="text-2xl font-bold text-gray-800">{value}</p>
            </div>
        </div>
        <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
    </div>
);


// --- Sub-component for Expense Request Cards ---
const ExpenseCard = ({ request, onApprove, onReject }) => (
    <div className="bg-white p-5 rounded-xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-shadow hover:shadow-lg">
        <div className="flex-grow">
            <p className="font-bold text-lg text-gray-800">{request.description || 'Expense Description'}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                <span>{new Date(request.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                <span>•</span>
                <span>{request.employeeName || 'Employee Name'}</span>
            </div>
            <div className="mt-2">
                <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">{request.category || 'Category'}</span>
            </div>
        </div>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0 w-full sm:w-auto">
            <p className="text-xl font-bold text-gray-800 flex-grow sm:flex-grow-0">
                ${request.amount.toFixed(2)}
            </p>
            <button
                onClick={onReject}
                className="p-3 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                aria-label="Reject Expense"
            >
                <XCircle size={24} />
            </button>
            <button
                onClick={onApprove}
                className="p-3 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors"
                aria-label="Approve Expense"
            >
                <CheckCircle size={24} />
            </button>
        </div>
    </div>
);


export default AdminDashboard;