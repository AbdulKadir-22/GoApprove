import React, { useState, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import Navbar from '../components/Navbar';

const allExpenses = [
    { id: 1, description: 'Vehicle Re-fueling on work trip', date: '2025-10-04', employeeName: 'Priya Sharma', category: 'Fuel', amount: 2050, status: 'Approved' },
    { id: 2, description: 'Night Stay on work trip', date: '2025-10-03', employeeName: 'Rohan Verma', category: 'Stay', amount: 6000, status: 'Approved' },
    { id: 3, description: 'Lunch with Client', date: '2025-10-01', employeeName: 'Anjali Singh', category: 'Meals', amount: 4500, status: 'Approved' },
    { id: 4, description: 'Office Internet Bill', date: '2025-09-28', employeeName: 'Priya Sharma', category: 'Utilities', amount: 3000, status: 'Pending' },
];

const categories = ['All', ...new Set(allExpenses.map(exp => exp.category))];
const months = ['All', 'October', 'September', 'August'];

const ClaimRequestsPage = () => {

    const [expenses, setExpenses] = useState(allExpenses);
    const [filteredExpenses, setFilteredExpenses] = useState(allExpenses);

    const [filters, setFilters] = useState({
        searchTerm: '',
        category: 'All',
        month: 'All',
        sortBy: 'newest'
    });

    // --- Filtering and Sorting Logic ---
    useEffect(() => {
        let result = [...expenses];

        // 1. Filter by Search Term (employee name)
        if (filters.searchTerm) {
            result = result.filter(exp =>
                exp.employeeName.toLowerCase().includes(filters.searchTerm.toLowerCase())
            );
        }

        // 2. Filter by Category
        if (filters.category !== 'All') {
            result = result.filter(exp => exp.category === filters.category);
        }

        // 3. Filter by Month (simple implementation)
        if (filters.month !== 'All') {
            const monthIndex = new Date(`${filters.month} 1, 2025`).getMonth();
            result = result.filter(exp => new Date(exp.date).getMonth() === monthIndex);
        }

        // 4. Sort by Date
        result.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return filters.sortBy === 'newest' ? dateB - dateA : dateA - dateB;
        });

        setFilteredExpenses(result);

    }, [filters, expenses]);

    // --- Event Handlers ---
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

                        {/* Category Dropdown */}
                        <Select name="category" value={filters.category} onChange={handleFilterChange} options={categories} />

                        {/* Month Dropdown */}
                        <Select name="month" value={filters.month} onChange={handleFilterChange} options={months} />

                        {/* Sort By Radio */}
                        <div className="flex items-center gap-4 ml-auto">
                            <span className="text-sm font-medium text-gray-600">Sort By</span>
                            <RadioGroup name="sortBy" value={filters.sortBy} onChange={handleFilterChange} />
                        </div>
                    </div>

                    {/* Search Bar */}
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
                        filteredExpenses.map(expense => <ExpenseListItem key={expense.id} expense={expense} />)
                    ) : (
                        <p className="text-center text-gray-500 py-10">No expenses match the current filters.</p>
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


const StatusIndicator = ({ status }) => {
    const statusStyles = {
        'Approved': 'bg-green-500',
        'Pending': 'bg-orange-400',
        'Rejected': 'bg-red-500',
    };
    return <div className={`w-5 h-5 rounded-full ${statusStyles[status] || 'bg-gray-400'}`}></div>;
};

const ExpenseListItem = ({ expense }) => (
    <div className="bg-white p-5 rounded-xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex-grow">
            <p className="font-bold text-lg text-gray-800">{expense.description}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                <span>{new Date(expense.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                <span>•</span>
                <span>{expense.employeeName}</span>
            </div>
            <div className="mt-2">
                <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">{expense.category}</span>
            </div>
        </div>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0 w-full sm:w-auto justify-end">
            <div className="text-right">
                <p className="text-xs text-gray-500">Expense Amount</p>
                <p className="text-xl font-bold text-gray-800">₹ {expense.amount.toLocaleString('en-IN')}</p>
            </div>
            <StatusIndicator status={expense.status} />
        </div>
    </div>
);

export default ClaimRequestsPage;