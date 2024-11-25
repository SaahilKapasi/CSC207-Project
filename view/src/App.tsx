import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { API_BASE_URL } from "./consts/consts";
import GraphPage from "./pages/GraphPage";
import WelcomePage from "./pages/WelcomePage";
import { Dataset } from "./types/types";

function App() {
    const [page, setPage] = useState<"landing" | "welcome" | "graph">("landing");
    const [datasets, setDatasets] = useState<Dataset[]>([]);
    const [selectedDataset, setSelectedDataset] = useState<Dataset | undefined>(
        undefined
    );
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (page === "graph") {
            axios
                .get(
                    `${API_BASE_URL}/api/getDataset?id=${window.location.pathname.slice(1)}`
                )
                .then((response) => {
                    if (response.data) {
                        handleReceiveDataset(response.data);
                    }
                    setLoading(false);
                })
                .catch(console.error);
        }
    }, [page]);

    useEffect(() => {
        document.title =
            page === "landing"
                ? "Welcome to Bias Visualizer"
                : page === "welcome"
                    ? "Upload Dataset"
                    : "Data Visualization";
    }, [page]);

    function handleReceiveDataset(newDataset: Dataset) {
        setSelectedDataset(newDataset);
        setDatasets([...datasets, newDataset]);
        setPage("graph");
        setLoading(false);
    }

    function handleNewDataset() {
        setPage("welcome");
        setSelectedDataset(undefined);
    }

    function handleSelectDataset(dataset: Dataset) {
        setSelectedDataset(dataset);
        setPage("graph");
    }

    return (
        <div className="min-h-screen">
            <a href="#main-content" className="skip-link">
                Skip to main content
            </a>
            <Navbar
                datasets={datasets}
                selectedDataset={selectedDataset}
                onSelectDataset={handleSelectDataset}
                onNewDataset={handleNewDataset}
                isLandingPage={page === "landing"} // Pass prop to indicate landing page
            />

            {/* Main Content Area */}
            <main id="main-content" role="main">
                {page === "landing" ? (
                    <div className="flex flex-col items-center bg-gray-50 min-h-screen">
                        {/* Hero Section */}
                        <div className="flex flex-col md:flex-row items-center justify-between px-10 py-20 w-full max-w-6xl">
                            {/* Left Content */}
                            <div className="text-center md:text-left md:w-1/2">
                                <h1 className="text-4xl font-bold mb-4">
                                    Welcome to Bias Visualizer!
                                </h1>
                                <p className="text-lg text-gray-700 mb-6">
                                    Today we spot bias and together provide an ethical environment.
                                    Use this to get a better sense of your ML model and protect
                                    people from undesired harms!
                                </p>
                                <button
                                    onClick={() => setPage("welcome")}
                                    className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                >
                                    Get Started
                                </button>
                            </div>

                            {/* Right Image */}
                            <img
                                src="/path-to-image.jpg" // Replace with your hero image path
                                alt="Illustration"
                                className="w-full md:w-1/2 mt-10 md:mt-0"
                            />
                        </div>
                    </div>
                ) : loading ? (
                    <div className="w-screen flex justify-center">
                        <span className="loading loading-spinner text-success w-16 h-16"></span>
                    </div>
                ) : page === "welcome" ? (
                    <WelcomePage
                        onDataset={handleReceiveDataset}
                        onSubmit={() => setLoading(true)}
                    />
                ) : page === "graph" && selectedDataset ? (
                    <GraphPage dataset={selectedDataset} />
                ) : (
                    <></>
                )}
            </main>
        </div>
    );
}

export default App;