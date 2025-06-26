import React from 'react';
import PropTypes from 'prop-types';

/**
 * Page header component with title and description
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {JSX.Element} [props.actions] - Optional actions to display on the right
 * @returns {JSX.Element} PageHeader component
 */
const PageHeader = ({ title, description, actions }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-schibsted font-bold text-white mb-1">
          {title}
        </h1>
        <p className="text-text-body">
          {description}
        </p>
      </div>
      
      {actions && (
        <div className="flex items-center space-x-3">
          {actions}
        </div>
      )}
    </div>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  actions: PropTypes.node,
};

export default PageHeader;
