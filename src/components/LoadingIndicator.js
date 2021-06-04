import '../scss/LoadingIndicator.scss';
import React from 'react';

const LoadingIndicator = ({ isLoading }) => {
  return (
    <React.Fragment>
      {isLoading ? (
        <div className="loading-wrapper">
          <div className="book">
            <div className="inner">
              <div className="left"></div>
              <div className="middle"></div>
              <div className="right"></div>
            </div>
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default LoadingIndicator;
