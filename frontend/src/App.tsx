import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { API_BASE_URL } from "./consts/consts";
import GraphPage from "./pages/GraphPage";
import WelcomePage from "./pages/WelcomePage";
import { Dataset } from "./types/types";

function App() {
  const [page, setPage] = useState<"welcome" | "graph">("welcome");
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [selectedDataset, setSelectedDataset] = useState<Dataset | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);
  const [loadingDataset, setLoadingDataset] = useState(true);

  useEffect(() => {
    axios
      .get(
        `${API_BASE_URL}/api/getDataset?id=${window.location.pathname.slice(1)}`
      )
      .then((response) => {
        if (response.data) {
          handleReceiveDataset(response.data);
        }
        setLoading(false);
        setLoadingDataset(false);
      })
      .catch(console.error)
      .finally(() => {});
  }, []);

  useEffect(() => {
    document.title =
      page === "welcome" ? "Upload Dataset" : "Data Visualization";
  }, [page]);

  function handleReceiveDataset(newDataset: Dataset) {
    setSelectedDataset(newDataset);
    setDatasets([...datasets, newDataset]);
    setPage("graph");
    setLoadingDataset(false);
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
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar
        datasets={datasets}
        selectedDataset={selectedDataset}
        onSelectDataset={handleSelectDataset}
        onNewDataset={handleNewDataset}
      />

      {/* Main Content Area */}
      <main id="main-content" role="main">
        {loading || loadingDataset ? (
          <div className="w-screen flex justify-center">
            <span className="loading loading-spinner text-success w-16 h-16"></span>
          </div>
        ) : page === "welcome" ? (
          <WelcomePage
            onDataset={handleReceiveDataset}
            onSubmit={() => setLoadingDataset(true)}
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
