import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { API_BASE_URL } from "./consts/consts";
import ComparePage from "./pages/ComparePage";
import DatasetPage from "./pages/DatasetPage";
import WelcomePage from "./pages/WelcomePage";
import { Dataset } from "./types/types";

function App() {
  const [page, setPage] = useState<"welcome" | "graph" | "compare">("welcome");
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [selectedDataset, setSelectedDataset] = useState<Dataset | undefined>();
  const [loading, setLoading] = useState(true);

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
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    document.title =
      page === "welcome"
        ? "Upload Dataset"
        : page === "compare"
        ? "Compare"
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
    <div className="w-screen">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar
        datasets={datasets}
        selectedDataset={selectedDataset}
        onSelectDataset={handleSelectDataset}
        selectedPage={page}
        onNewCompare={() => setPage("compare")}
        onNewDataset={handleNewDataset}
      />
      {/* Height of the navbar */}
      <div className="h-16" />

      {/* Main Content Area */}
      <main id="main-content" role="main" className="w-full">
        {loading ? (
          <div className="w-screen flex justify-center">
            <span className="loading loading-spinner text-success w-16 h-16"></span>
          </div>
        ) : page === "welcome" ? (
          <WelcomePage
            onDataset={handleReceiveDataset}
            onSubmit={() => setLoading(true)}
          />
        ) : page === "graph" && selectedDataset ? (
          <DatasetPage dataset={selectedDataset} />
        ) : page === "compare" ? (
          <ComparePage datasets={datasets} />
        ) : (
          <></>
        )}
      </main>
    </div>
  );
}

export default App;
