import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { API_BASE_URL } from "./consts/consts";
import ComparePage from "./pages/ComparePage";
import DatasetPage from "./pages/DatasetPage";
import LandingPage from "./pages/LandingPage";
import WelcomePage from "./pages/WelcomePage";
import { Dataset } from "./types/types";

const mockDataset: Dataset = {
  id: "fe157691-8f92-4390-bc85-d211a3a7d31b",
  name: "2021.csv",
  categories: [
    {
      name: "race",
      fprScore: 3.3,
      traits: [
        {
          name: "Black",
          count: 2,
          fprMean: 0.0,
        },
        {
          name: "Hispanic",
          count: 1,
          fprMean: 0.0,
        },
        {
          name: "White",
          count: 2,
          fprMean: 1.0,
        },
        {
          name: "Asian",
          count: 5,
          fprMean: 0.4,
        },
      ],
    },
    {
      name: "disability",
      fprScore: 9.84375,
      traits: [
        {
          name: "No",
          count: 8,
          fprMean: 0.375,
        },
        {
          name: "Yes",
          count: 2,
          fprMean: 0.5,
        },
      ],
    },
    {
      name: "ancestry",
      fprScore: 3.3000000000000007,
      traits: [
        {
          name: "African",
          count: 2,
          fprMean: 0.0,
        },
        {
          name: "Asian",
          count: 5,
          fprMean: 0.4,
        },
        {
          name: "Western",
          count: 2,
          fprMean: 1.0,
        },
        {
          name: "Hispanic",
          count: 1,
          fprMean: 0.0,
        },
      ],
    },
    {
      name: "creed",
      fprScore: 7.056,
      traits: [
        {
          name: "Christian",
          count: 5,
          fprMean: 0.6,
        },
        {
          name: "Buddhist",
          count: 1,
          fprMean: 0.0,
        },
        {
          name: "Jewish",
          count: 2,
          fprMean: 0.5,
        },
        {
          name: "Muslim",
          count: 1,
          fprMean: 0.0,
        },
        {
          name: "Catholic",
          count: 1,
          fprMean: 0.0,
        },
      ],
    },
    {
      name: "pregnancy",
      fprScore: 9.84375,
      traits: [
        {
          name: "No",
          count: 8,
          fprMean: 0.375,
        },
        {
          name: "Yes",
          count: 2,
          fprMean: 0.5,
        },
      ],
    },
    {
      name: "age",
      fprScore: 0.39999999999999813,
      traits: [
        {
          name: "33",
          count: 1,
          fprMean: 1.0,
        },
        {
          name: "38",
          count: 1,
          fprMean: 0.0,
        },
        {
          name: "40",
          count: 1,
          fprMean: 0.0,
        },
        {
          name: "45",
          count: 1,
          fprMean: 0.0,
        },
        {
          name: "50",
          count: 1,
          fprMean: 1.0,
        },
        {
          name: "23",
          count: 1,
          fprMean: 0.0,
        },
        {
          name: "55",
          count: 1,
          fprMean: 1.0,
        },
        {
          name: "27",
          count: 1,
          fprMean: 0.0,
        },
        {
          name: "29",
          count: 1,
          fprMean: 1.0,
        },
        {
          name: "31",
          count: 1,
          fprMean: 0.0,
        },
      ],
    },
    {
      name: "color",
      fprScore: 2.5,
      traits: [
        {
          name: "Black",
          count: 2,
          fprMean: 0.0,
        },
        {
          name: "Brown",
          count: 3,
          fprMean: 0.0,
        },
        {
          name: "White",
          count: 2,
          fprMean: 1.0,
        },
        {
          name: "Yellow",
          count: 3,
          fprMean: 0.6666666666666666,
        },
      ],
    },
    {
      name: "citizenship",
      fprScore: 4.149659863945578,
      traits: [
        {
          name: "South Korea",
          count: 1,
          fprMean: 1.0,
        },
        {
          name: "China",
          count: 1,
          fprMean: 0.0,
        },
        {
          name: "Mexico",
          count: 1,
          fprMean: 0.0,
        },
        {
          name: "Vietnam",
          count: 1,
          fprMean: 0.0,
        },
        {
          name: "Canada",
          count: 2,
          fprMean: 0.5,
        },
        {
          name: "Korea",
          count: 1,
          fprMean: 0.0,
        },
        {
          name: "US",
          count: 3,
          fprMean: 0.6666666666666666,
        },
      ],
    },
    {
      name: "sex",
      fprScore: 10,
      traits: [
        {
          name: "Male",
          count: 5,
          fprMean: 0.4,
        },
        {
          name: "Female",
          count: 5,
          fprMean: 0.4,
        },
      ],
    },
  ],
  score: 5.599239984882843,
  description: "description of dataset 1",
};

const mockDataset2 = {
  id: "4f6631cb-14f0-4df5-9303-96c4b618b29f",
  name: "2022.csv",
  categories: [
    {
      name: "creed",
      fprScore: 4.176,
      traits: [
        {
          name: "Catholic",
          count: 1,
          fprMean: 1.0,
        },
        {
          name: "Buddhist",
          count: 1,
          fprMean: 0.0,
        },
        {
          name: "Jewish",
          count: 2,
          fprMean: 0.5,
        },
        {
          name: "Christian",
          count: 5,
          fprMean: 0.4,
        },
        {
          name: "Muslim",
          count: 1,
          fprMean: 1.0,
        },
      ],
    },
    {
      name: "color",
      fprScore: 9.444444444444445,
      traits: [
        {
          name: "Yellow",
          count: 3,
          fprMean: 0.6666666666666666,
        },
        {
          name: "Brown",
          count: 3,
          fprMean: 0.3333333333333333,
        },
        {
          name: "White",
          count: 2,
          fprMean: 0.5,
        },
        {
          name: "Black",
          count: 2,
          fprMean: 0.5,
        },
      ],
    },
    {
      name: "pregnancy",
      fprScore: 10,
      traits: [
        {
          name: "No",
          count: 8,
          fprMean: 0.5,
        },
        {
          name: "Yes",
          count: 2,
          fprMean: 0.5,
        },
      ],
    },
    {
      name: "citizenship",
      fprScore: 1.2925170068027214,
      traits: [
        {
          name: "Mexico",
          count: 1,
          fprMean: 1.0,
        },
        {
          name: "US",
          count: 3,
          fprMean: 0.3333333333333333,
        },
        {
          name: "China",
          count: 1,
          fprMean: 0.0,
        },
        {
          name: "South Korea",
          count: 1,
          fprMean: 1.0,
        },
        {
          name: "Korea",
          count: 1,
          fprMean: 0.0,
        },
        {
          name: "Canada",
          count: 2,
          fprMean: 1.0,
        },
        {
          name: "Vietnam",
          count: 1,
          fprMean: 0.0,
        },
      ],
    },
    {
      name: "sex",
      fprScore: 9.6,
      traits: [
        {
          name: "Female",
          count: 5,
          fprMean: 0.4,
        },
        {
          name: "Male",
          count: 5,
          fprMean: 0.6,
        },
      ],
    },
    {
      name: "age",
      fprScore: 0,
      traits: [
        {
          name: "33",
          count: 1,
          fprMean: 1.0,
        },
        {
          name: "38",
          count: 1,
          fprMean: 0.0,
        },
        {
          name: "40",
          count: 1,
          fprMean: 0.0,
        },
        {
          name: "45",
          count: 1,
          fprMean: 1.0,
        },
        {
          name: "50",
          count: 1,
          fprMean: 1.0,
        },
        {
          name: "23",
          count: 1,
          fprMean: 0.0,
        },
        {
          name: "55",
          count: 1,
          fprMean: 1.0,
        },
        {
          name: "27",
          count: 1,
          fprMean: 1.0,
        },
        {
          name: "29",
          count: 1,
          fprMean: 0.0,
        },
        {
          name: "31",
          count: 1,
          fprMean: 0.0,
        },
      ],
    },
    {
      name: "race",
      fprScore: 7.800000000000001,
      traits: [
        {
          name: "Hispanic",
          count: 1,
          fprMean: 1.0,
        },
        {
          name: "Asian",
          count: 5,
          fprMean: 0.4,
        },
        {
          name: "White",
          count: 2,
          fprMean: 0.5,
        },
        {
          name: "Black",
          count: 2,
          fprMean: 0.5,
        },
      ],
    },
    {
      name: "ancestry",
      fprScore: 7.800000000000001,
      traits: [
        {
          name: "Western",
          count: 2,
          fprMean: 0.5,
        },
        {
          name: "Hispanic",
          count: 1,
          fprMean: 1.0,
        },
        {
          name: "Asian",
          count: 5,
          fprMean: 0.4,
        },
        {
          name: "African",
          count: 2,
          fprMean: 0.5,
        },
      ],
    },
    {
      name: "disability",
      fprScore: 6.09375,
      traits: [
        {
          name: "No",
          count: 8,
          fprMean: 0.375,
        },
        {
          name: "Yes",
          count: 2,
          fprMean: 1.0,
        },
      ],
    },
  ],
  score: 6.245190161249685,
  description: "description of dataset 2",
};

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

  useEffect(() => {
    (async () => {
      const response1 = await axios.get(
        `${API_BASE_URL}/api/getDataset?id=${window.location.hash.slice(1)}`
      );
      if (response1.data) {
        handleReceiveDataset(response1.data);
        setLoading(false);
        return;
      }

      const response2 = await axios.get(
        `${API_BASE_URL}/api/getComparison?id=${window.location.hash.slice(1)}`
      );
      if (response2.data) {
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
