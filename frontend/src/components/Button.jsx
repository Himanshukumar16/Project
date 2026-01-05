
import React from 'react';
import { Loader2 } from 'lucide-react';
import './Button.css';

const Button = ({
    children,
    onClick,
    variant = 'primary',
    type = 'button',
    disabled = false,
    isLoading = false,
    className = ''
}) => {
    return (
        <button
            type={type}
            className={`btn btn-${variant} ${className}`}
            onClick={onClick}
            disabled={disabled || isLoading}
        >
            {isLoading && <Loader2 className="spinner" size={18} />}
            {children}
        </button>
    );
};

export default Button;
