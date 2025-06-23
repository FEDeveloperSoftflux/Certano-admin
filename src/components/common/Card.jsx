import React from 'react';

const Card = ({
  children,
  className = '',
  variant = 'default',
}) => {
  const baseClass = variant === 'default' ? 'card' : 'card-alt';
  
  return (
    <div className={`${baseClass} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
