import React, { useState } from 'react';
import UserNavbar from '../components/UserNavigation'; // Using the user/employee navbar
import { Check, X } from 'lucide-react';
import ManagerNavbar from '../components/ManagerNavigation'; 

// --- Static Data ---
// This array simulates the data you would fetch from your backend.
const initialApprovalRequests = [
    { id: 1, description: 'Vehicle Re-fueling on work trip', requestOwner: 'Ayaan Shaikh', category: 'Travel', date: '2025-10-04', status: 'Pending', amount: 4500 },
    { id: 2, description: 'Night Stay on work trip', requestOwner: 'Priya Sharma', category: 'Stay', date: '2025-10-03', status: 'Approved', amount: 2100 },
    { id: 3, description: 'Client Dinner Meeting', requestOwner: 'Rohan Verma', category: 'Meals', date: '2025-10-02', status: 'Rejected', amount: 1000 },
    { id: 4, description: 'Office Supplies Purchase', requestOwner: 'Anjali Singh', category: 'Office', date: '2025-10-01', status: 'Pending', amount: 8000 },
];

// --- Reusable Status Badge Component ---
const StatusBadge = ({ status }) => {
    const styles = {
        Pending: 'text-amber-600 font-semibold',
        Approved: 'text-green-600 font-semibold',
        Rejected: 'text-red-600 font-semibold',
    };
    return <span className={styles[status] || 'text-gray-600'}>{status}</span>;
};


const ApprovalPage = () => {
    const [approvalRequests, setApprovalRequests] = useState(initialApprovalRequests);

    // --- Action Handler ---
    const handleAction = (id, newStatus) => {
        // In a real app, you would make an API call here.
        console.log(`Updating request ${id} to status: ${newStatus}`);
        
        // For now, we just update the local state to give instant feedback.
        setApprovalRequests(
            approvalRequests.map(req =>
                req.id === id ? { ...req, status: newStatus } : req
            )
        );
    };

    return (
        <>
            <ManagerNavbar />
            <div className="bg-gray-50 min-h-screen p-4 sm:p-8">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">
                        Approvals To Review
                    </h1>

                    {/* --- Responsive Table/List --- */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        {/* Table Header (hidden on mobile) */}
                        <div className="hidden md:grid grid-cols-6 gap-4 text-left text-sm font-bold text-gray-500 p-5 border-b bg-gray-50">
                            <span className="col-span-2">Description</span>
                            <span>Request Owner</span>
                            <span>Status</span>
                            <span className="text-right">Amount</span>
                            <span className="text-center">Action</span>
                        </div>

                        {/* Table Body / List of Cards */}
                        <div className="flex flex-col">
                            {approvalRequests.map((request) => (
                                <div key={request.id} className="w-full p-5 border-b last:border-b-0 md:grid md:grid-cols-6 md:gap-4 md:items-center">
                                    
                                    {/* --- Mobile View (Card-like layout) --- */}
                                    <div className="md:hidden mb-4">
                                        <p className="font-bold text-lg text-gray-800">{request.description}</p>
                                        <p className="text-sm text-gray-500">by {request.requestOwner}</p>
                                    </div>
                                    <div className="md:hidden grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-gray-500 font-semibold">Status</p>
                                            <StatusBadge status={request.status} />
                                        </div>
                                        <div className="text-right">
                                            <p className="text-gray-500 font-semibold">Amount</p>
                                            <p className="font-bold text-gray-800">₹{request.amount.toLocaleString('en-IN')}</p>
                                        </div>
                                    </div>

                                    {/* --- Desktop View (Table row layout) --- */}
                                    <div className="hidden md:block col-span-2 font-semibold text-gray-800">{request.description}</div>
                                    <div className="hidden md:block text-gray-600">{request.requestOwner}</div>
                                    <div className="hidden md:block"><StatusBadge status={request.status} /></div>
                                    <div className="hidden md:block text-right font-bold text-gray-800">₹{request.amount.toLocaleString('en-IN')}</div>
                                    
                                    {/* Action Buttons (Visible on all screen sizes) */}
                                    <div className="flex justify-end items-center mt-4 md:mt-0 md:justify-center">
                                        {request.status === 'Pending' ? (
                                            <div className="flex gap-2">
                                                <button onClick={() => handleAction(request.id, 'Approved')} className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition">
                                                    <Check size={20} />
                                                </button>
                                                <button onClick={() => handleAction(request.id, 'Rejected')} className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition">
                                                    <X size={20} />
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="px-4 py-1.5 text-xs font-semibold text-gray-500 bg-gray-200 rounded-full">
                                                None
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ApprovalPage;
