import React, { useState } from 'react';
import './App.css';
import FirstWindow from './FirstWindow';  // Assuming this is your landing page component
import FileUpload from './components/FileUpload'; // Correct path for FileUpload component
import ScoreDisplay from './components/ScoreDisplay'; // Correct path for ScoreDisplay component
import StatsDisplay from './components/StatsDisplay'; // Correct path for StatsDisplay component
import cashAppLogo from '/cash_app.svg';  // Adjust the path if necessary
const App: React.FC = () => {
    const [showMainContent, setShowMainContent] = useState(false);  // State to toggle between first window and main content

    const handleNext = () => {
        setShowMainContent(true);  // Show main content after clicking "Get Started"
    };

    return (
        <div className="app-container">
            <header className="header">
                <a href="https://cash.app/" target="_blank" rel="noopener noreferrer">
                    <img src={cashAppLogo} className="logo" alt="Cash App logo" />
                </a>
                <h1>Cash App</h1>
            </header>

            {/* Conditional rendering: Show FirstWindow initially, then show main content */}
            {showMainContent ? (
                <main className="main-content">
                    <section className="left-section">
                        <FileUpload />
                    </section>

                    <section className="right-section">
                        <ScoreDisplay />
                        <StatsDisplay />
                    </section>
                </main>
            ) : (
                <FirstWindow onNext={handleNext} />  // Show first window initially
            )}
        </div>
    );
};

export default App;