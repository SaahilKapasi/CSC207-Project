import React from 'react';

const ScoreDisplay: React.FC = () => {
    return (
        <div className="score-display">
            <h3>Score:</h3>
            <div className="score-box">
                <span>0.0</span> {/* Placeholder for score */}
            </div>
            {/* ChatGPT placeholder */}
            <div className="chatgpt-info">
                <p>ChatGPT:</p>
                <p>..............</p>
                <p>..............</p>
            </div>
        </div>
    );
};

export default ScoreDisplay;