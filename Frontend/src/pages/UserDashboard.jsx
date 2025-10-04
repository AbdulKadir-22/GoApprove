import React, { useState } from 'react';
import UserNavbar from '../components/UserNavigation'; // Import the new UserNavbar
import { Upload, Plus, ChevronRight, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

// --- Static Data ---
const userExpenses = [
    { id: 1, description: 'Client Lunch Meeting at Taj', date: '2025-10-04', category: 'Meals', paidBy: 'John Doe', amount: 3200, status: 'Approved' },
    { id: 2, description: 'Office Stationery Purchase', date: '2025-10-02', category: 'Office Supplies', paidBy: 'John Doe', amount: 1500, status: 'Waiting For Approval' },
    { id: 3, description: 'Cab fare for airport travel', date: '2025-09-28', category: 'Travel', paidBy: 'John Doe', amount: 700, status: 'Waiting For Approval' },
    { id: 4, description: 'Printer Ink Cartridges', date: '2025-09-25', category: 'Office Supplies', paidBy: 'John Doe', amount: 2100, status: 'To Submit' },
    { id: 5, description: 'Team Dinner at Barbeque Nation', date: '2025-09-20', category: 'Team Event', paidBy: 'John Doe', amount: 5400, status: 'Approved' },
];

// --- Sub-component for Status Badge ---
const StatusBadge = ({ status }) => {
    const statusStyles = {
        'Approved': { icon: <CheckCircle size={14} />, color: 'text-green-600', bgColor: 'bg-green-100' },
        'Waiting For Approval': { icon: <Clock size={14} />, color: 'text-orange-600', bgColor: 'bg-orange-100' },
        'To Submit': { icon: <AlertTriangle size={14} />, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    };
    const style = statusStyles[status] || {};
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${style.bgColor} ${style.color}`}>
            {style.icon}
            {status}
        </span>
    );
};

const UserDashboard = () => {
    // Calculate stats from the data array
    const toSubmitAmount = userExpenses.filter(e => e.status === 'To Submit').reduce((sum, e) => sum + e.amount, 0);
    const waitingAmount = userExpenses.filter(e => e.status === 'Waiting For Approval').reduce((sum, e) => sum + e.amount, 0);
    const approvedAmount = userExpenses.filter(e => e.status === 'Approved').reduce((sum, e) => sum + e.amount, 0);

    return (
        <>
            <UserNavbar />
            <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    {/* --- Header with Buttons --- */}
                    <div className="flex flex-col sm:flex-row justify-end items-center gap-3 mb-6">
                        <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                            <Upload size={18} />
                            Upload
                        </button>
                        <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors">
                            <Plus size={18} />
                            New Request
                        </button>
                    </div>

                    {/* --- Stats Section --- */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <StatCard amount={toSubmitAmount} label="To Submit" color="blue" />
                        <StatCard amount={waitingAmount} label="Waiting For Approval" color="orange" />
                        <StatCard amount={approvedAmount} label="Approved" color="green" />
                    </div>

                    {/* --- Responsive Expense Table --- */}
                    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                        {/* Table Header (Visible on md screens and up) */}
                        <div className="hidden md:grid grid-cols-6 gap-4 px-4 py-3 text-left text-sm font-semibold text-gray-500 border-b">
                            <span>Description</span>
                            <span>Date</span>
                            <span>Category</span>
                            <span>Paid By</span>
                            <span className="text-right">Amount</span>
                            <span className="text-center">Status</span>
                        </div>

                        {/* Table Body */}
                        <div className="space-y-4 md:space-y-0">
                            {userExpenses.map(expense => (
                                <div key={expense.id} className="md:grid md:grid-cols-6 md:gap-4 md:items-center p-4 rounded-lg md:p-0 md:rounded-none md:border-0 border md:border-b hover:bg-gray-50 transition-colors">
                                    {/* Mobile Labels (hidden on md screens and up) */}
                                    <div className="md:hidden grid grid-cols-2 gap-2 text-sm mb-4">
                                        <div><strong className="block text-gray-500">Date:</strong> {expense.date}</div>
                                        <div><strong className="block text-gray-500">Category:</strong> {expense.category}</div>
                                        <div><strong className="block text-gray-500">Paid By:</strong> {expense.paidBy}</div>
                                        <div className="text-right"><strong className="block text-gray-500">Amount:</strong> ₹{expense.amount.toLocaleString('en-IN')}</div>
                                    </div>
                                    
                                    {/* Common Data Cells */}
                                    <div className="font-semibold text-gray-800 md:font-normal md:text-gray-600 md:p-4">{expense.description}</div>
                                    <div className="hidden md:block md:p-4 text-gray-600">{expense.date}</div>
                                    <div className="hidden md:block md:p-4 text-gray-600">{expense.category}</div>
                                    <div className="hidden md:block md:p-4 text-gray-600">{expense.paidBy}</div>
                                    <div className="hidden md:block md:p-4 text-right font-semibold text-gray-700">₹{expense.amount.toLocaleString('en-IN')}</div>
                                    
                                    {/* Status (always visible) */}
                                    <div className="md:p-4 flex justify-end md:justify-center mt-2 md:mt-0">
                                        <StatusBadge status={expense.status} />
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

// Stat Card Component
const StatCard = ({ amount, label, color }) => {
    const colorClasses = {
        blue: 'text-blue-600',
        orange: 'text-orange-500',
        green: 'text-green-600',
    };

    return (
        <div className="bg-white p-5 rounded-xl shadow-sm flex justify-between items-center">
            <div>
                <div className={`text-2xl font-bold ${colorClasses[color]}`}>₹ {amount.toLocaleString('en-IN')}</div>
                <div className="text-sm text-gray-500 mt-1">{label}</div>
            </div>
            <ChevronRight className="text-gray-400" />
        </div>
    );
};

export default UserDashboard;
