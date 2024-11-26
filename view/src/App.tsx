import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { Dataset } from "./types/types";
import logo from "./logo.svg"; // Replace with your actual image path

function App() {
    const [page, setPage] = useState<"landing" | "welcome" | "graph">("landing");
    const [datasets, setDatasets] = useState<Dataset[]>([]);
    const [selectedDataset, setSelectedDataset] = useState<Dataset | undefined>(undefined);

    useEffect(() => {
        document.title =
            page === "landing"
                ? "Welcome to Bias Visualizer"
                : page === "welcome"
                    ? "Upload Dataset"
                    : "Data Visualization";
    }, [page]);

    function handleNewDataset() {
        setPage("welcome");
        setSelectedDataset(undefined);
    }

    return (
        <div className="min-h-screen">
            <Navbar
                datasets={datasets}
                selectedDataset={selectedDataset}
                onSelectDataset={(dataset) => setSelectedDataset(dataset)}
                onNewDataset={handleNewDataset}
                isLandingPage={page === "landing"}
            />

            {/* Main Content Area */}
            <main id="main-content" role="main">
                {page === "landing" ? (
                    <>
                        {/* Full-Screen Image Section */}
                        <section
                            className="h-screen bg-cover bg-center flex items-center justify-center"
                            style={{
                                backgroundImage: `url(${logo})`, // Replace with your image path
                            }}
                        >
                            <h1 className="text-white text-4xl font-bold bg-black bg-opacity-50 px-4 py-2 rounded">
                                Welcome to Bias Visualizer!
                            </h1>
                        </section>

                        {/* Welcome Section */}
                        <section id="welcome" className="h-screen flex flex-col items-center justify-center bg-gray-50">
                            <div className="text-center max-w-xl">
                                <h1 className="text-4xl font-bold mb-4">Welcome to Bias Visualizer!</h1>
                                <p className="text-lg text-gray-700 mb-6">
                                    Today we spot bias and together provide an ethical environment. Use this to get a better sense of your ML model and protect people from undesired harms!
                                </p>
                                <button
                                    onClick={() => setPage("welcome")}
                                    className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                >
                                    Get Started
                                </button>
                            </div>
                        </section>

                        {/* About Section */}
                        <section id="about" className="h-screen overflow-y-auto bg-gray-100 p-10">
                            <div className="max-w-4xl mx-auto">
                                <h2 className="text-3xl font-bold mb-4">Bias Calculator Project</h2>

                                {/* Table of Contents */}
                                <h3 className="text-xl font-semibold mb-2">Table of Contents</h3>
                                <ul className="list-disc pl-5 mb-6">
                                    <li><a href="#background">Background</a></li>
                                    <li><a href="#project-goals">Project Goals</a></li>
                                    <li><a href="#how-can-we-achieve-this">How Can We Achieve This?</a></li>
                                    <li><a href="#problem-statement">Problem Statement</a></li>
                                    <li><a href="#proposed-solution">Proposed Solution</a></li>
                                    <li><a href="#project-structure">Project Structure</a></li>
                                    <li><a href="#running-the-project">Running the Project</a></li>
                                </ul>

                                {/* Background */}
                                <h3 id="background" className="text-xl font-semibold mb-2">Background</h3>
                                <p className="mb-4">
                                    Algorithmic bias, particularly indirect bias, is a significant concern for financial applications like CashApp. Indirect bias arises when a machine learning model uses seemingly neutral features that disproportionately impact protected groups.
                                </p>

                                {/* Project Goals */}
                                <h3 id="project-goals" className="text-xl font-semibold mb-2">Project Goals</h3>
                                <p className="mb-4">
                                    Our project aims to integrate fairness into CashApp’s machine learning practices by ensuring compliance, building trust, and improving decision-making.
                                </p>

                                {/* How Can We Achieve This? */}
                                <h3 id="how-can-we-achieve-this" className="text-xl font-semibold mb-2">How Can We Achieve This?</h3>
                                <ul className="list-disc pl-5 mb-6">
                                    <li>Identify Direct Bias</li>
                                    <li>Identify Indirect Bias</li>
                                    <li>Visualize Bias</li>
                                    <li>Integrate Fairness Metrics</li>
                                    <li>Adjust Model Design</li>
                                </ul>

                                {/* Problem Statement */}
                                <h3 id="problem-statement" className="text-xl font-semibold mb-2">Problem Statement</h3>
                                <p className="mb-4">
                                    The failure to sufficiently tackle bias in CashApp's machine learning models poses risks such as loss of user trust and restricted access for certain populations.
                                </p>

                                {/* Proposed Solution */}
                                <h3 id="proposed-solution" className="text-xl font-semibold mb-2">Proposed Solution</h3>
                                <p className="mb-4">
                                    We will build an application that identifies algorithmic bias and provides clear visualizations to help CashApp employees understand and address these biases.
                                </p>

                                {/* Project Structure */}
                                <h3 id="project-structure" className="text-xl font-semibold mb-2">Project Structure</h3>
                                <p className="mb-4">
                                    The project consists of a backend (FastAPI) for processing data and a frontend (React) for user interaction and visualization.
                                </p>

                                {/* Running the Project */}
                                <h3 id="running-the-project" className="text-xl font-semibold mb-2">Running the Project</h3>
                                <ol className="list-decimal pl-5">
                                    <li>Install dependencies for both backend and frontend.</li>
                                    <li>Run the backend server using FastAPI.</li>
                                    <li>Run the frontend development server using npm.</li>
                                </ol>
                            </div>
                        </section>
                    </>
                ) : page === "welcome" ? (
                    /* Welcome Page */
                    <>Welcome Page Content Here</> // Replace with your actual WelcomePage component
                ) : page === "graph" && selectedDataset ? (
                    /* Graph Page */
                    <>Graph Page Content Here</> // Replace with your actual GraphPage component
                ) : (
                    null
                )}
            </main>
        </div>
    );
}

export default App;