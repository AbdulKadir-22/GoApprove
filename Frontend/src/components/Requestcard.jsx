import React, { useState } from "react";
import { ChevronDown, Paperclip, Trash2 } from 'lucide-react';

const RequestCard = ({ request, onRemove }) => {
  const [showManagers, setShowManagers] = useState(false);

  // Destructure for easier access
  const { 
    title, 
    date, 
    employee, 
    category, 
    amount, 
    currency, 
    progress, 
    managers, 
    attachmentUrl 
  } = request;

  return (
    // REMOVED fixed width w-[1100px] and made it full-width for responsiveness
    <div className="flex flex-col md:flex-row justify-between bg-white shadow-lg rounded-2xl p-6 md:p-8 w-full border min-h-[230px]">
      
      {/* Left Section */}
      <div className="flex flex-col gap-4 flex-grow">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-500">{new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          <p className="text-sm text-gray-500">Submitted by: {employee}</p>
        </div>

        {/* Category + Managers */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-xs font-medium px-3 py-1 rounded-full border border-amber-200">
            <span className="h-2 w-2 rounded-full bg-amber-500"></span>
            {category}
          </span>

          <div className="relative">
            <button
              onClick={() => setShowManagers(!showManagers)}
              className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-800 text-xs font-medium px-3 py-1 rounded-full border border-indigo-200 hover:bg-indigo-200 transition-colors"
            >
              Assigned Managers <ChevronDown size={14} className={`transition-transform ${showManagers ? 'rotate-180' : ''}`} />
            </button>
            {showManagers && (
              <ul className="absolute z-10 mt-1 w-48 bg-white border rounded-lg shadow-xl text-sm text-gray-700">
                {managers.map((manager, index) => (
                  <li key={index} className="px-3 py-2 hover:bg-indigo-50 cursor-default">
                    {manager}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="flex items-center gap-3 mt-auto pt-2">
          <div className="flex items-center gap-1.5">
            {Array.from({ length: progress.totalSteps }).map((_, i) => (
              <span
                key={i}
                className={`h-4 w-4 rounded-full border-2 ${
                  i < progress.currentStep -1
                    ? "bg-green-500 border-green-500" // Completed
                    : i === progress.currentStep -1
                    ? "bg-green-200 border-green-500" // Current
                    : "bg-gray-200 border-gray-300" // Pending
                }`}
              ></span>
            ))}
          </div>
          <p className="text-sm font-medium text-gray-700">
            <span className="font-bold">Step {progress.currentStep} of {progress.totalSteps}:</span> {progress.statusText}
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-start md:items-end justify-between gap-4 mt-6 md:mt-0 md:pl-8">
        <div className="text-left md:text-right">
            <p className="text-xs text-gray-500 mb-1">Expense Amount</p>
            <div className="flex items-center space-x-2 bg-green-100 px-5 py-2 rounded-full">
                <span className="h-5 w-5 bg-green-400 rounded-full"></span>
                <span className="text-xl font-bold text-gray-800">
                    {currency} {amount.toLocaleString()}
                </span>
            </div>
        </div>
        
        <div className="flex flex-row md:flex-col items-center gap-3 w-full md:w-auto">
            <button
                onClick={() => attachmentUrl ? window.open(attachmentUrl, "_blank") : alert("No attachment found")}
                className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md w-full transition-all"
            >
                <Paperclip size={16} /> View Attachment
            </button>
            <button
                onClick={() => onRemove(request.id)}
                className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md w-full transition-all"
            >
                <Trash2 size={16} /> Remove Request
            </button>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;