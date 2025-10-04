import React from 'react';
import '../styles/ExpenseSubmission.css';

const FormSelect = ({ label, name, value, onChange, options, error, required }) => {
  const selectClassName = `select ${error ? 'input-error' : ''}`;
  
  return (
    <div className="form-group">
      <label htmlFor={name} className="label">
        {label} {required && <span className="required">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={selectClassName}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.value === ''}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default FormSelect;