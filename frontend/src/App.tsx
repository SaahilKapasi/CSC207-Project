import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import GraphPage from "./pages/GraphPage";
import WelcomePage from "./pages/WelcomePage";
import { Dataset } from "./types/types";

function App() {
  const [page, setPage] = useState<"welcome" | "graph">("welcome");
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [selectedDataset, setSelectedDataset] = useState<Dataset>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/getDataset?id=${window.location.pathname.slice(1)}`)
      .then((response) => {
        if (response.data) {
          handleReceiveDataset(response.data);
        }
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    document.title = page === "welcome" ? "Upload Dataset" : "Data Visualization";
  }, [page]);

  function handleReceiveDataset(newDataset: Dataset) {
    setSelectedDataset(newDataset);
    setDatasets([...datasets, newDataset]);
    setPage("graph");
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
    <div className="">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Navbar
        datasets={datasets}
        selectedDataset={selectedDataset}
        onSelectDataset={handleSelectDataset}
        onNewDataset={handleNewDataset}
      />

      {/* Main Content Area */}
      <main id="main-content" role="main">
        {loading ? (
          <></>
        ) : page === "welcome" ? (
          <WelcomePage onDataset={handleReceiveDataset} />
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
