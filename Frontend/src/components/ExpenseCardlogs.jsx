import React from 'react';

const ExpenseCardLogs = ({ expense }) => {
  
  // --- Dynamic Styling Logic for the Status Badge ---
  const statusConfig = {
    Approved: {
      badgeColor: 'bg-green-500',
      dotColor: 'bg-white',
      textColor: 'text-white'
    },
    Pending: {
      badgeColor: 'bg-amber-500',
      dotColor: 'bg-white',
      textColor: 'text-white'
    },
    Rejected: {
      badgeColor: 'bg-red-500',
      dotColor: 'bg-white',
      textColor: 'text-white'
    },
    default: {
      badgeColor: 'bg-gray-500',
      dotColor: 'bg-white',
      textColor: 'text-white'
    }
  };

  const config = statusConfig[expense.status] || statusConfig.default;

  return (
    <div className="flex items-center justify-between bg-white shadow-md rounded-2xl p-6 w-full transition-shadow hover:shadow-lg">
      {/* Left Section */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-black">{expense.description}</h2>
        <p className="text-sm text-gray-500">
          {new Date(expense.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
        <p className="text-sm text-gray-500">{expense.employeeName}</p>

        {/* Category Badge */}
        <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-xs font-medium px-3 py-1 rounded-full w-fit shadow-sm border border-amber-200">
          <span className="h-2 w-2 rounded-full bg-amber-400"></span>
          {expense.category}
        </span>
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-end gap-3">
        <p className="text-xs text-gray-500">Expense Amount</p>

        {/* Amount */}
        <div className="flex items-center space-x-2 bg-gray-200 px-5 py-2 rounded-full">
          <span className="h-4 w-4 bg-gray-400 rounded-full"></span>
          <span className="text-base font-semibold text-gray-800">₹ {expense.amount.toLocaleString('en-IN')}</span>
        </div>

        {/* Status (Now Dynamic) */}
        <div className={`flex items-center space-x-2 ${config.badgeColor} px-4 py-1.5 rounded-full ${config.textColor} text-sm font-medium`}>
          <span className={`h-2.5 w-2.5 ${config.dotColor} rounded-full`}></span>
          <span>{expense.status}</span>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCardLogs;