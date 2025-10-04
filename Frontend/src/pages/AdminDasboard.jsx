import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { FileText, Banknote, Users, CalendarCheck2, CheckCircle, XCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Modal from '../components/Modal'; // <-- Import the Modal
import RequestCard from '../components/Requestcard'; // <-- Import the detailed card

// --- UPDATED Mock Data to include details for the modal view ---
const staticRequests = [
    { 
        _id: 'exp1', 
        description: 'Client Dinner Meeting', 
        date: '2025-10-04T10:00:00.000Z', 
        employeeName: 'Priya Sharma', 
        category: 'Meals', 
        amount: 450.00,
        // Detailed fields for RequestCard
        title: 'Client Dinner Meeting',
        employee: 'Priya Sharma',
        currency: '₹',
        progress: { currentStep: 2, totalSteps: 3, statusText: 'Awaiting Director Approval' },
        managers: ['Rohan Verma (Manager)', 'Vikram Rathod (Finance)', 'Anjali Singh (Director)'],
        attachmentUrl: '#'
    },
    { 
        _id: 'exp2', 
        description: 'Office Supplies Purchase', 
        date: '2025-10-03T14:30:00.000Z', 
        employeeName: 'Rohan Verma', 
        category: 'Office Supplies', 
        amount: 120.50,
        // Detailed fields for RequestCard
        title: 'Office Supplies Purchase',
        employee: 'Rohan Verma',
        currency: '₹',
        progress: { currentStep: 1, totalSteps: 2, statusText: 'Awaiting Manager Approval' },
        managers: ['Priya Sharma (Manager)', 'Vikram Rathod (Finance)'],
        attachmentUrl: '#'
    },
];

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({ /* ...stats */ });
    const [recentRequests, setRecentRequests] = useState([]);
    
    // --- STATE FOR MODAL ---
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    useEffect(() => {
        setRecentRequests(staticRequests);
        setStats({ pendingRequests: 12, approvedThisMonth: 6, expenseCategories: 8, users: 50 });
    }, []);

    // --- MODAL HANDLERS ---
    const handleOpenModal = (request) => {
        setSelectedRequest(request);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedRequest(null);
    };

    const handleApproval = (expenseId, status) => {
        console.log(`Expense ${expenseId} has been ${status}.`);
        setRecentRequests(prev => prev.filter(req => req._id !== expenseId));
        setStats(prev => ({ ...prev, pendingRequests: prev.pendingRequests - 1 }));
    };

    return (
        <>
            <Navbar />
            <div className="p-8 bg-gray-50 min-h-screen font-sans">
                {/* ... Header and StatCards sections are unchanged ... */}
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
                        {recentRequests.map(request => (
                            // --- WRAPPED ExpenseCard to make it clickable ---
                            <div key={request._id} onClick={() => handleOpenModal(request)} className="cursor-pointer">
                                <ExpenseCard
                                    request={request}
                                    onApprove={(e) => { e.stopPropagation(); handleApproval(request._id, 'approved'); }}
                                    onReject={(e) => { e.stopPropagation(); handleApproval(request._id, 'rejected'); }}
                                />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            
            {/* --- RENDER THE MODAL --- */}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                {selectedRequest && (
                    <RequestCard 
                        request={selectedRequest}
                        onRemove={() => handleApproval(selectedRequest._id, 'removed')}
                        onClose={handleCloseModal}
                    />
                )}
            </Modal>
        </>
    );
};

// --- The simple ExpenseCard for the dashboard ---
const ExpenseCard = ({ request, onApprove, onReject }) => (
    <div className="bg-white p-5 rounded-xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-shadow hover:shadow-lg">
        <div className="flex-grow">
            <p className="font-bold text-lg text-gray-800">{request.description}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                <span>{new Date(request.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                <span>•</span>
                <span>{request.employeeName}</span>
            </div>
            <div className="mt-2">
                <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">{request.category}</span>
            </div>
        </div>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0 w-full sm:w-auto">
            <p className="text-xl font-bold text-gray-800 flex-grow sm:flex-grow-0">
                ₹{request.amount.toFixed(2)}
            </p>
            <button onClick={onReject} className="p-3 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors" aria-label="Reject Expense"><XCircle size={24} /></button>
            <button onClick={onApprove} className="p-3 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors" aria-label="Approve Expense"><CheckCircle size={24} /></button>
        </div>
    </div>
);

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
