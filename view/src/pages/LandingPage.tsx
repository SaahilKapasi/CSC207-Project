import React from "react";
import "./LandingPage.css";

const LandingPage: React.FC = () => {
    return (
        <div className="landing-page">
            {/* Header Section */}
            <header className="header">
                <div className="logo-section">
                    <img
                        src="/path-to-logo.png" // Replace with your logo image path
                        alt="Cash App Logo"
                        className="logo"
                    />
                    <span className="logo-text">Cash App</span>
                </div>
                <div className="app-name">Bias Visualizer</div>
            </header>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    {/* Typing Effect */}
                    <h1 className="typing-effect">Welcome to Bias Visualizer!</h1>
                    <p>
                        Today we spot bias and together provide an ethical environment.
                        Use this to get a better sense of your ML model and protect people
                        from undesired harms!
                    </p>
                </div>

                {/* Image with Fade-In Animation */}
                <img
                    src="/path-to-hero-image.jpg" // Replace with your hero image path
                    alt="Illustration"
                    className="hero-image fade-in"
                />
            </section>
        </div>
    );
};

export default LandingPage;