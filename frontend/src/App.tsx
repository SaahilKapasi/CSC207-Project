import React, { useState } from 'react';
import './App.css'; // Make sure this file contains styles matching the Figma design
import cashAppLogo from '/cash_app.svg'; // Adjust path if necessary
import { AiOutlineUpload } from 'react-icons/ai'; // For upload icon
import { Chart } from 'react-chartjs-2'; // Use Chart.js for graph rendering

const App: React.FC = () => {
    const [fileUploaded, setFileUploaded] = useState(false); // State to track if a file is uploaded
    const [score, setScore] = useState(0.0); // State to track score

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            // Simulate file upload and transition to second screen
            setFileUploaded(true);
            setScore(7.8); // Example score after file upload
        }
    };

    return (
        <div className="app-container">
            <header className="header">
                <div className="logo-container">
                    <a href="https://cash.app/" target="_blank" rel="noopener noreferrer">
                        <img src={cashAppLogo} className="logo" alt="Cash App logo" />
                    </a>
                    <h1>Cash App</h1>
                </div>
                <h2>Bias Visualizer</h2>
            </header>

            {/* Conditional rendering based on whether a file is uploaded */}
            {fileUploaded ? (
                // Second screen with chart and updated score
                <main className="main-content">
                    <section className="left-section">
                        {/* Chart Section */}
                        <div className="chart-container">
                            <h3>&lt;File 1.0&gt;</h3>
                            {/* Chart.js example */}
                            <Chart
                                type="bar"
                                data={{
                                    labels: ['White', 'Black', 'Hispanic', 'Asian', 'Indigenous'],
                                    datasets: [
                                        {
                                            label: 'FPR vs Race',
                                            data: [7, 6, 5, 4, 3], // Example data for FPR
                                            backgroundColor: '#007bff',
                                        },
                                    ],
                                }}
                                options={{
                                    scales: {
                                        x: { title: { display: true, text: 'Race' } },
                                        y: { title: { display: true, text: 'False Positive Rate (FPR)' } },
                                    },
                                }}
                            />
                        </div>
                    </section>

                    <section className="right-section">
                        {/* Score Display */}
                        <div className="score-display">
                            <h3>Score:</h3>
                            <div className="score-box">
                                <span>{score.toFixed(1)}</span>
                            </div>
                            {/* ChatGPT Response */}
                            <div className="chatgpt-info">
                                <p>ChatGPT:</p>
                                <p>It seems like you have a few false positive rates that show an increasing trend...</p>
                            </div>
                        </div>

                        {/* Stats Display */}
                        <div className="stats-display">
                            <h4>Stats for &lt;File 1.0&gt;</h4>
                            <ul>
                                <li>Population: race</li>
                                <li>GAP: 53%</li>
                                <li>Mean: 23%</li>
                                {/* Add more stats as needed */}
                            </ul>
                        </div>
                    </section>
                </main>
            ) : (
                // First screen with file upload prompt
                <main className="main-content">
                    <section className="left-section">
                        {/* File Upload Section */}
                        <div className="file-upload">
                            {/* Add styling here to match Figma - larger icon size and spacing */}
                            <AiOutlineUpload size={80} color="#28a745" />
                            {/* Add styles for input button */}
                            <input type="file" onChange={handleFileUpload} />
                            <p>Please upload your files</p>
                        </div>
                    </section>

                    <section className="right-section">
                        {/* Score Display */}
                        <div className="score-display">
                            <h3>Score:</h3>
                            <div className="score-box">
                                {/* Add styles here for better alignment and font size */}
                                <span>{score.toFixed(1)}</span>
                            </div>

                            {/* Placeholder for ChatGPT */}
                            <div className="chatgpt-info">
                                ..............
                                ..............
                                ..............
                            </div>

                            {/* Stats Display Placeholder */}
                            <div className="stats-display">
                                Stats for &lt;File 1.0&gt;
                                Population:
                                GAP:
                                Mean:
                            </div>
                        </div> {/* Correctly closing the div here */}
                    </section>
                </main>
            )}
        </div>
    );
};

export default App;