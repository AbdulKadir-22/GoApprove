import React, { useState, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import Navbar from '../components/Navbar';

const allExpenses = [
    { id: 1, description: 'Vehicle Re-fueling on work trip', date: '2025-10-04', employeeName: 'Priya Sharma', category: 'Fuel', amount: 2050, status: 'Approved' },
    { id: 2, description: 'Night Stay on work trip', date: '2025-10-03', employeeName: 'Rohan Verma', category: 'Stay', amount: 6000, status: 'Approved' },
    { id: 3, description: 'Lunch with Client', date: '2025-10-01', employeeName: 'Anjali Singh', category: 'Meals', amount: 4500, status: 'Approved' },
    { id: 4, description: 'Office Internet Bill', date: '2025-09-28', employeeName: 'Priya Sharma', category: 'Utilities', amount: 3000, status: 'Pending' },
    { id: 5, description: 'New Office Chairs', date: '2025-08-18', employeeName: 'Vikram Rathod', category: 'Office Supplies', amount: 25000, status: 'Pending' },
];

// --- 1. Filter for only "Pending" requests from the start ---
const pendingExpenses = allExpenses.filter(exp => exp.status === 'Pending');

const categories = ['All', ...new Set(pendingExpenses.map(exp => exp.category))];
const months = ['All', 'October', 'September', 'August'];

const ClaimRequestsPage = () => {

    // Initialize state with only pending expenses
    const [expenses, setExpenses] = useState(pendingExpenses);
    const [filteredExpenses, setFilteredExpenses] = useState(pendingExpenses);

    const [filters, setFilters] = useState({
        searchTerm: '',
        category: 'All',
        month: 'All',
        sortBy: 'newest'
    });

    // Filtering and Sorting Logic (no changes needed here)
    useEffect(() => {
        let result = [...expenses];
        if (filters.searchTerm) {
            result = result.filter(exp =>
                exp.employeeName.toLowerCase().includes(filters.searchTerm.toLowerCase())
            );
        }
        if (filters.category !== 'All') {
            result = result.filter(exp => exp.category === filters.category);
        }
        if (filters.month !== 'All') {
            const monthIndex = new Date(`${filters.month} 1, 2025`).getMonth();
            result = result.filter(exp => new Date(exp.date).getMonth() === monthIndex);
        }
        result.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return filters.sortBy === 'newest' ? dateB - dateA : dateA - dateB;
        });
        setFilteredExpenses(result);
    }, [filters, expenses]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return (
        <>
            <Navbar/>
            <div className="p-8 bg-gray-50 min-h-screen font-sans">

                {/* Filters Section */}
                <div className="bg-white p-4 rounded-xl shadow-sm mb-8">
                    <div className="flex flex-wrap items-center gap-4">
                        <span className="font-semibold text-gray-700">Filters</span>
                        <Select name="category" value={filters.category} onChange={handleFilterChange} options={categories} />
                        <Select name="month" value={filters.month} onChange={handleFilterChange} options={months} />
                        <div className="flex items-center gap-4 ml-auto">
                            <span className="text-sm font-medium text-gray-600">Sort By</span>
                            <RadioGroup name="sortBy" value={filters.sortBy} onChange={handleFilterChange} />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                        <div className="relative flex-grow">
                            <input
                                type="text"
                                name="searchTerm"
                                placeholder="Search by User"
                                value={filters.searchTerm}
                                onChange={handleFilterChange}
                                className="w-full pl-4 pr-12 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                        </div>
                        <button className="bg-indigo-600 text-white font-semibold px-6 py-2 rounded-full hover:bg-indigo-700 transition-colors">
                            Search
                        </button>
                    </div>
                </div>

                {/* Expenses List */}
                <div className="space-y-4">
                    {filteredExpenses.length > 0 ? (
                        filteredExpenses.map(expense => <ExpenseCard key={expense.id} expense={expense} />)
                    ) : (
                        <p className="text-center text-gray-500 py-10">No pending requests match the current filters.</p>
                    )}
                </div>
            </div>
        </>
    );
};

// --- Sub-components for UI elements ---

const Select = ({ name, value, onChange, options }) => (
    <div className="relative">
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="appearance-none bg-gray-100 border border-gray-200 text-gray-700 py-2 pl-4 pr-8 rounded-full focus:outline-none focus:bg-white focus:border-gray-500"
        >
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
    </div>
);

const RadioGroup = ({ name, value, onChange }) => (
    <div className="flex items-center bg-gray-100 rounded-full p-1 text-sm">
        <label className="relative cursor-pointer">
            <input type="radio" name={name} value="newest" checked={value === 'newest'} onChange={onChange} className="sr-only" />
            <span className={`px-4 py-1 block rounded-full transition ${value === 'newest' ? 'bg-white shadow' : ''}`}>Newest first</span>
        </label>
        <label className="relative cursor-pointer">
            <input type="radio" name={name} value="oldest" checked={value === 'oldest'} onChange={onChange} className="sr-only" />
            <span className={`px-4 py-1 block rounded-full transition ${value === 'oldest' ? 'bg-white shadow' : ''}`}>Oldest first</span>
        </label>
    </div>
);

// --- 2. Replaced ExpenseListItem with your preferred ExpenseCard component ---
// (Note: Approve/Reject buttons are removed as this page is for viewing pending requests only)
const ExpenseCard = ({ expense }) => (
    <div className="flex items-center justify-between bg-white shadow-md rounded-2xl p-6 w-full  transition-shadow hover:shadow-lg">
        <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-black">{expense.description}</h2>
            <p className="text-sm text-gray-500">
                {new Date(expense.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
            <p className="text-sm text-gray-500">{expense.employeeName}</p>
            <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-xs font-medium px-3 py-1 rounded-full w-fit shadow-sm border border-amber-200">
                <span className="h-2 w-2 rounded-full bg-amber-400"></span>
                {expense.category}
            </span>
        </div>
        <div className="flex items-center space-x-2 bg-orange-100 px-5 py-2 rounded-full">
            <span className="h-5 w-5 bg-orange-400 rounded-full"></span>
            <span className="text-lg font-bold text-black">₹ {expense.amount.toLocaleString('en-IN')}</span>
        </div>
    </div>
);

export default ClaimRequestsPage;