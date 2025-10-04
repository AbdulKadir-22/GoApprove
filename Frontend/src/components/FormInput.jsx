import React from 'react';
import '../styles/ExpenseSubmission.css';

const FormInput = ({ label, name, type = 'text', value, onChange, placeholder, error, required }) => {
  // Conditionally join class names for the error state
  const inputClassName = `input ${error ? 'input-error' : ''}`;
  
  return (
    <div className="form-group">
      <label htmlFor={name} className="label">
        {label} {required && <span className="required">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputClassName}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default FormInput;