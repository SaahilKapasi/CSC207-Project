import React from 'react';
import './FirstWindow.css';  // Assuming you have styles for this component

interface FirstWindowProps {
    onNext: () => void;
}

const FirstWindow: React.FC<FirstWindowProps> = ({ onNext }) => {
    return (
        <div className="first-window-container">
            <h1>Welcome to Bias Visualizer</h1>
            <p>Please upload your files to begin analyzing.</p>
            <button onClick={onNext} className="start-button">
                Get Started
            </button>
        </div>
    );
};

export default FirstWindow;