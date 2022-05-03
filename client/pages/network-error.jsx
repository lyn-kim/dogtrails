import React from 'react';

export default function NetworkError(props) {
  return (
    <div>
      <div className="row justify-center">
        <h3 className="network-error-title">Network Connection Error</h3>
      </div>
      <p className="network-error-message">Please check your internet connection and try again. </p>
    </div>
  );
}
