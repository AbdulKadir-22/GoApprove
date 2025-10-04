import React, { useState } from "react";

const RequestCard = ({
  title = "Expense Description",
  date = "04th October 2025",
  employee = "Employee Name",
  category = "Travel Expense",
  amount = 450,
  currency = "$",
  step = 2,
  totalSteps = 3,
  managers = ["Manager A", "Manager B", "Manager C"],
  attachmentUrl = "#",
  onRemove = () => alert("Request removed"),
}) => {
  const [showManagers, setShowManagers] = useState(false);

  return (
    <div className="flex flex-col md:flex-row justify-between bg-white shadow-md rounded-2xl p-8 w-[1100px] border min-h-[230px]">
      {/* Left Section */}
      <div className="flex flex-col gap-3">
        <div>
          <h2 className="text-lg font-semibold text-black">{title}</h2>
          <p className="text-sm text-gray-500">{date}</p>
          <p className="text-sm text-gray-500">{employee}</p>
        </div>

        {/* Category + Managers */}
        <div className="flex gap-2">
          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-xs font-medium px-3 py-1 rounded-full border border-amber-200">
            <span className="h-2 w-2 rounded-full bg-amber-400"></span>
            {category}
          </span>

          <div className="relative">
            <button
              onClick={() => setShowManagers(!showManagers)}
              className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-800 text-xs font-medium px-3 py-1 rounded-full border border-indigo-200"
            >
              Assigned Managers <span className="text-sm">▼</span>
            </button>
            {showManagers && (
              <ul className="absolute mt-1 w-40 bg-white border rounded-md shadow-md text-sm text-gray-700">
                {managers.map((m, i) => (
                  <li
                    key={i}
                    className="px-3 py-2 hover:bg-indigo-50 cursor-pointer"
                    onClick={() => alert(`Selected: ${m}`)}
                  >
                    {m}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center gap-2">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <span
                key={i}
                className={`h-5 w-5 rounded-full border ${
                  i < step
                    ? "bg-green-500"
                    : i === step
                    ? "bg-green-200"
                    : "bg-gray-200"
                }`}
              ></span>
            ))}
          </div>
          <p className="text-sm font-medium text-black">
            Step {step} of {totalSteps} : Awaiting Finance Manager Approval
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-end gap-3 mt-4 md:mt-0">
        <div className="flex items-center space-x-2 bg-green-100 px-5 py-2 rounded-full">
          <span className="h-5 w-5 bg-green-400 rounded-full"></span>
          <span className="text-lg font-bold text-black">
            {currency} {amount}
          </span>
        </div>
        <p className="text-xs text-gray-500">Expense Amount</p>

        <button
          onClick={() =>
            attachmentUrl !== "#"
              ? window.open(attachmentUrl, "_blank")
              : alert("No attachment found")
          }
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow"
        >
          View Attachment
        </button>
        <button
          onClick={onRemove}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow"
        >
          Remove Request
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
