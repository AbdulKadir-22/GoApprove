

const ExpenseCard = ({ request}) => {
  return (
    <div className="flex items-center justify-between bg-white shadow-md rounded-2xl p-6 w-full  transition-shadow hover:shadow-lg">
      
      {/* Left side: Expense Details */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-black">{request.description}</h2>
        <p className="text-sm text-gray-500">
          {new Date(request.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
        <p className="text-sm text-gray-500">{request.employeeName}</p>

        <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-xs font-medium px-3 py-1 rounded-full w-fit shadow-sm border border-amber-200">
          <span className="h-2 w-2 rounded-full bg-amber-400"></span>
          {request.category}
        </span>
      </div>

      {/* Right side: Amount and Actions */}
      <div className="flex items-center gap-4">
        <div className="flex items-center space-x-2 bg-green-100 px-5 py-2 rounded-full">
          <span className="h-5 w-5 bg-green-400 rounded-full"></span>
          <span className="text-lg font-bold text-black">${request.amount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCard;