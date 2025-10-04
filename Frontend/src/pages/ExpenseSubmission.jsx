import React, { useState, useEffect } from 'react';
import { Save, X, Paperclip, FileText } from 'lucide-react';
import UserNavbar from '../components/UserNavigation' // Or UserNavbar, depending on who uses this form

const ExpenseSubmission = () => {
  // --- STATE MANAGEMENT (No changes needed) ---
  const [formData, setFormData] = useState({
    description: '',
    product: '',
    unitPrice: '',
    quantity: '',
    date: new Date().toISOString().split('T')[0],
    employee: '',
    paidBy: 'Employee',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [total, setTotal] = useState(0);

  // --- DUMMY DATA (No changes needed) ---
  const productOptions = [
    { value: '', label: 'Select a product' },
    { value: 'office-supplies', label: 'Office Supplies' },
    { value: 'software-license', label: 'Software License' },
    { value: 'travel', label: 'Travel & Accommodation' },
    { value: 'client-dinner', label: 'Client Dinner' },
  ];
  const employeeOptions = [
    { value: '', label: 'Select an employee' },
    { value: 'john-doe', label: 'John Doe' },
    { value: 'jane-smith', label: 'Jane Smith' },
    { value: 'peter-jones', label: 'Peter Jones' },
  ];
  const paidByOptions = ['Employee', 'Company'];

  // --- LOGIC (No changes needed) ---
  useEffect(() => {
    const price = parseFloat(formData.unitPrice) || 0;
    const qty = parseInt(formData.quantity, 10) || 0;
    setTotal(price * qty);
  }, [formData.unitPrice, formData.quantity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.description) newErrors.description = 'Description is required.';
    if (!formData.product) newErrors.product = 'Product must be selected.';
    if (!formData.unitPrice || formData.unitPrice <= 0) newErrors.unitPrice = 'Price must be greater than 0.';
    if (!formData.quantity || formData.quantity <= 0) newErrors.quantity = 'Quantity must be at least 1.';
    if (!formData.employee) newErrors.employee = 'An employee must be selected.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form Submitted:', { ...formData, total });
      alert('Expense Submitted Successfully!');
    }
  };

  const handleDiscard = () => {
    if (window.confirm('Are you sure you want to discard all changes?')) {
      setFormData({
        description: '', product: '', unitPrice: '', quantity: '',
        date: new Date().toISOString().split('T')[0],
        employee: '', paidBy: 'Employee', notes: '',
      });
      setErrors({});
    }
  };

  // --- UI & LAYOUT (Completely Redesigned) ---
  return (
    <div className="bg-gray-50 min-h-screen">
      <UserNavbar/>
      <main className="max-w-4xl mx-auto p-4 md:p-8">
        <form onSubmit={handleSave} noValidate>
          {/* Header */}
          <header className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
              New Expense
            </h1>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleDiscard}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-100 transition-colors"
              >
                <X size={18} /> Discard
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
              >
                <Save size={18} /> Save
              </button>
            </div>
          </header>

          {/* Form Card */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Description (Full Width) */}
              <div className="md:col-span-2">
                <FormInput
                  label="Description" name="description" value={formData.description}
                  onChange={handleChange} error={errors.description}
                  placeholder="e.g., Team lunch meeting" required
                />
              </div>

              <FormSelect
                label="Product" name="product" value={formData.product}
                onChange={handleChange} options={productOptions}
                error={errors.product} required
              />
              <FormInput
                label="Unit Price" name="unitPrice" type="number" value={formData.unitPrice}
                onChange={handleChange} error={errors.unitPrice} placeholder="0.00" required
              />
              <FormInput
                label="Quantity" name="quantity" type="number" value={formData.quantity}
                onChange={handleChange} error={errors.quantity} placeholder="1" required
              />
              <FormInput
                label="Date" name="date" type="date" value={formData.date}
                onChange={handleChange} error={errors.date} required
              />
              <FormSelect
                label="Employee" name="employee" value={formData.employee}
                onChange={handleChange} options={employeeOptions}
                error={errors.employee} required
              />
              <FormRadioGroup
                legend="Paid By" name="paidBy" options={paidByOptions}
                selectedValue={formData.paidBy} onChange={handleChange}
              />
              
              {/* Notes (Full Width) */}
              <div className="md:col-span-2">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  id="notes" name="notes" className="form-textarea"
                  value={formData.notes} onChange={handleChange}
                  rows="4" placeholder="Add any additional details here..."
                ></textarea>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <footer className="mt-6 flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-2xl shadow-lg">
            <div className="flex items-center gap-3 mb-4 sm:mb-0">
               <button type="button" className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800">
                   <Paperclip size={16} /> Attach Document
               </button>
               <button type="button" className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800">
                   <FileText size={16} /> Create Report
               </button>
            </div>
            <div className="flex items-center gap-4">
               <span className="text-lg font-medium text-gray-600">Total</span>
               <span className="text-2xl font-bold text-gray-800 bg-gray-100 px-4 py-1 rounded-lg">
                   ₹{total.toFixed(2)}
               </span>
            </div>
          </footer>
        </form>
      </main>
      
      {/* Adding some global styles for form elements to keep JSX clean */}
      <style jsx global>{`
        .form-input, .form-select, .form-textarea {
          display: block;
          width: 100%;
          padding: 0.75rem;
          font-size: 1rem;
          color: #374151;
          background-color: #f9fafb;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .form-input:focus, .form-select:focus, .form-textarea:focus {
          outline: none;
          border-color: #4f46e5;
          box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.3);
        }
        .error-message {
          color: #ef4444;
          font-size: 0.875rem;
          margin-top: 0.25rem;
        }
      `}</style>
    </div>
  );
};

// --- Reusable Form Component Snippets ---
// These are now defined inside the main component file for simplicity and better styling integration.
const FormInput = ({ label, name, type = 'text', value, onChange, error, required, placeholder }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type} id={name} name={name} value={value}
      onChange={onChange} placeholder={placeholder}
      className="form-input"
    />
    {error && <p className="error-message">{error}</p>}
  </div>
);

const FormSelect = ({ label, name, value, onChange, options, error, required }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select id={name} name={name} value={value} onChange={onChange} className="form-select">
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
          {opt.label}
        </option>
      ))}
    </select>
    {error && <p className="error-message">{error}</p>}
  </div>
);

const FormRadioGroup = ({ legend, name, options, selectedValue, onChange }) => (
    <div>
        <fieldset>
            <legend className="block text-sm font-medium text-gray-700 mb-2">{legend}</legend>
            <div className="flex items-center gap-6">
                {options.map((option) => (
                    <label key={option} className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name={name}
                            value={option}
                            checked={selectedValue === option}
                            onChange={onChange}
                            className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                        <span className="text-gray-800">{option}</span>
                    </label>
                ))}
            </div>
        </fieldset>
    </div>
);


export default ExpenseSubmission;
