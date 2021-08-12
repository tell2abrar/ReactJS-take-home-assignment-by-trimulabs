import React from 'react';

const LoadingScreen = ({message,className})=>{
    return (
        <h2 className={`loading-screen ${className}`}>
            {message}
        </h2>
    );
};

export default LoadingScreen;