import React from 'react';

const Button = ({
  variant = 'primary',
  children,
  onClick,
  className = '',
  disabled = false,
  type = 'button',
}) => {
  const baseClasses = 'btn-hover font-schibsted rounded-lg inline-flex items-center justify-center';
  
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    white: 'btn-white',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <span className="btn-content">{children}</span>
      <div className="btn-gradient-overlay"></div>
      <div className="btn-glow"></div>
    </button>
  );
};

export default Button;
