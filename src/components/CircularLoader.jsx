import React from 'react';
import './CircularLoader.scss';

const CircularLoader = ({ message = "Loading..." }) => {
  return (
    <div className="circular-loader-overlay">
      <div className="circular-loader-content">
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
        <p className="loader-message">{message}</p>
      </div>
    </div>
  );
};

export default CircularLoader;

