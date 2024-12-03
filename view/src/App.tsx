import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { API_BASE_URL } from "./consts/consts";
import ComparePage from "./pages/ComparePage";
import DatasetPage from "./pages/DatasetPage";
import LandingPage from "./pages/LandingPage";
import WelcomePage from "./pages/WelcomePage";
import { Dataset } from "./types/types";

function App() {
  // const [page, setPage] = useState<"welcome" | "graph" | "compare">("compare");
  // const [datasets, setDatasets] = useState<Dataset[]>([
  //   mockDataset,
  //   mockDataset2 as Dataset,
  // ]);
  // const [selectedDataset, setSelectedDataset] = useState<Dataset | undefined>(
  //   mockDataset
  // );
  // const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<"landing" | "new" | "graph" | "compare">(
    "landing"
  );
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [selectedDataset, setSelectedDataset] = useState<Dataset | undefined>();
  const [loading, setLoading] = useState(true);
  const [selectedDataset1, setSelectedDataset1] = useState<
    Dataset | undefined
  >();
  const [selectedDataset2, setSelectedDataset2] = useState<
    Dataset | undefined
  >();

  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
  });

  useEffect(() => {
    (async () => {
      const response1 = await axiosInstance.get(
        `/api/getDataset?id=${window.location.hash.slice(1)}`
      );
      if (response1.data && response1.data != "Missing") {
        handleReceiveDataset(response1.data);
        setLoading(false);
        return;
      }

      const response2 = await axiosInstance.get(
        `/api/getComparison?id=${window.location.hash.slice(1)}`
      );
      if (response2.data && response2.data != "Missing") {
        const compare = JSON.parse(response2.data);
        setSelectedDataset1(compare.dataset1);
        setSelectedDataset2(compare.dataset2);
        setPage("compare");
        setDatasets([...datasets, compare.dataset1, compare.dataset2]);
        setLoading(false);
        return;
      }

      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.title =
      page === "new"
        ? "Upload Dataset"
        : page === "compare"
        ? "Compare"
        : page === "landing"
        ? "CashApp Bias Visualizer"
        : "Data Visualization";
  }, [page]);

  function handleReceiveDataset(newDataset: Dataset) {
    setSelectedDataset(newDataset);
    setDatasets([...datasets, newDataset]);
    setPage("graph");
    setLoading(false);
  }

  function handleNewDataset() {
    setPage("new");
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
        onLanding={() => setPage("landing")}
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
        ) : page === "new" ? (
          <WelcomePage
            onDataset={handleReceiveDataset}
            onSubmit={() => setLoading(true)}
          />
        ) : page === "landing" ? (
          <LandingPage onWelcome={() => setPage("new")} />
        ) : page === "graph" && selectedDataset ? (
          <DatasetPage dataset={selectedDataset} />
        ) : page === "compare" ? (
          <ComparePage
            datasets={datasets}
            selectedDataset1={selectedDataset1}
            selectedDataset2={selectedDataset2}
            setSelectedDataset1={setSelectedDataset1}
            setSelectedDataset2={setSelectedDataset2}
          />
        ) : (
          <></>
        )}
      </main>
    </div>
  );
}

export default App;
