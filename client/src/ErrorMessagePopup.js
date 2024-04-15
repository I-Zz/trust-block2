import React, { useState, useEffect } from 'react';

const ErrorMessagePopup = ({ message, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <div style={{ 
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'red',
      color: 'white',
      padding: '10px',
      textAlign: 'center',
      display: isVisible ? 'block' : 'none',
    }}>
      {message}
    </div>
  );
};

const App = () => {
    return (
      <div>
        {/* Other components */}
        <ErrorMessagePopup message="Error message" duration={3000} />
      </div>
    );
  };
  
  export default App;