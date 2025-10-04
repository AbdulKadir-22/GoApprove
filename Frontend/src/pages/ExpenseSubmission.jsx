import React, { useState, useEffect } from 'react';
import '../styles/ExpenseSubmission.css'; // Standard CSS import
import FormInput from '../components/FormInput';
import FormSelect from '../components/FormSelect';
import FormRadio from '../components/FormRadio';

const ExpenseSubmission = () => {
  // State for all form fields
  const [formData, setFormData] = useState({
    description: '',
    product: '',
    unitPrice: '',
    quantity: '',
    date: new Date().toISOString().split('T')[0], // Default to today
    employee: '',
    paidBy: 'Employee', // Default value
    notes: '',
  });

  // State to hold validation errors
  const [errors, setErrors] = useState({});
  // State for the calculated total
  const [total, setTotal] = useState(0);

  // Dummy data for dropdowns
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

  // Effect to auto-calculate the total
  useEffect(() => {
    const price = parseFloat(formData.unitPrice) || 0;
    const qty = parseInt(formData.quantity, 10) || 0;
    setTotal(price * qty);
  }, [formData.unitPrice, formData.quantity]);

  // Generic change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Basic form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.description) newErrors.description = 'Description is required.';
    if (!formData.product) newErrors.product = 'Product must be selected.';
    if (!formData.unitPrice || formData.unitPrice <= 0) newErrors.unitPrice = 'Price must be greater than 0.';
    if (!formData.quantity || formData.quantity <= 0) newErrors.quantity = 'Quantity must be greater than 0.';
    if (!formData.employee) newErrors.employee = 'Employee must be selected.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form Submitted:', { ...formData, total });
      alert('Expense Submitted Successfully!');
    } else {
      console.log('Validation Failed:', errors);
    }
  };
  
  const handleDiscard = () => {
      setFormData({
        description: '', product: '', unitPrice: '', quantity: '',
        date: new Date().toISOString().split('T')[0],
        employee: '', paidBy: 'Employee', notes: '',
      });
      setErrors({});
  }

  return (
    <div className="page-container">
      <header className="header">
        <h1>Expense Submission</h1>
        <div className="header-actions">
          <button type="button" className="btn btn-secondary" onClick={handleDiscard}>Discard</button>
          <button type="submit" className="btn btn-primary" form="expenseForm">Save</button>
        </div>
      </header>

      <form id="expenseForm" className="form-grid" onSubmit={handleSave} noValidate>
        <div className="full-width">
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

        <FormRadio
            legend="Paid By" name="paidBy" options={paidByOptions}
            selectedValue={formData.paidBy} onChange={handleChange} error={errors.paidBy}
        />

        <div className="full-width">
            <label htmlFor="notes" className="label">Notes</label>
            <textarea
                id="notes" name="notes" className="textarea"
                value={formData.notes} onChange={handleChange}
                rows="4" placeholder="Add any additional details here..."
            ></textarea>
        </div>
      </form>
      
      <footer className="footer">
          <div className="footer-actions">
              <button className="btn btn-outline">📎 Attach Document</button>
              <button className="btn btn-outline">📄 Create Report</button>
          </div>
          <div className="summary">
              <span>Total</span>
              <span className="total-amount">
                  ${total.toFixed(2)}
              </span>
          </div>
      </footer>
    </div>
  );
};

export default ExpenseSubmission;