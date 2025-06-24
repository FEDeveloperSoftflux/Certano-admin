import React from 'react';

/**
 * Page header component for sections management
 * @param {Object} props - Component props
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @returns {JSX.Element} PageHeader component
 */
const PageHeader = ({ title, description }) => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-semibold text-white">{title}</h1>
      <p className="text-gray-400 mt-1">{description}</p>
    </div>
  );
};

export default PageHeader;
