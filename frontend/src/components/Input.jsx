import React from 'react';
import './Input.css';

const Input = ({
    label,
    type = 'text',
    name,
    value,
    onChange,
    placeholder,
    required = false,
    error
}) => {
    return (
        <div className="input-group">
            {label && <label className="input-label" htmlFor={name}>{label}</label>}
            <input
                id={name}
                name={name}
                type={type}
                className={`input-field ${error ? 'input-error' : ''}`}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
            />
            {error && <span className="input-error-msg">{error}</span>}
        </div>
    );
};

export default Input;
