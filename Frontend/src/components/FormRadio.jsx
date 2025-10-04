import React from 'react';
import '../styles/ExpenseSubmission.css';

const FormRadio = ({ legend, name, options, selectedValue, onChange, error }) => {
    return (
        <fieldset className="form-group">
            <legend className="label">{legend}</legend>
            <div className="radio-group">
                {options.map((option) => (
                    <label key={option} className="radio-label">
                        <input
                            type="radio"
                            name={name}
                            value={option}
                            checked={selectedValue === option}
                            onChange={onChange}
                            className="radio-input"
                        />
                        {option}
                    </label>
                ))}
            </div>
             {error && <p className="error-message">{error}</p>}
        </fieldset>
    );
};

export default FormRadio;