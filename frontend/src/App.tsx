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
        {/* Navbar Component */}
        <header>
          <Navbar
              datasets={datasets}
              selectedDataset={selectedDataset}
              onSelectDataset={handleSelectDataset}
              onNewDataset={handleNewDataset}
          />
        </header>

        {/* Main Content */}
        <main className="flex h-screen bg-white">
          {/* Left Section: File Upload or Graph */}
          {!fileUploaded ? (
              <section className="flex flex-col items-center justify-center w-full h-full">
                <button
                    className="bg-green-500 hover:bg-green-600 text-white py-4 px-6 rounded-lg flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    onClick={() => setFileUploaded(true)}
                    aria-label="Upload file"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16...'/>
                  </svg>
                  Please upload your files
                </button>
              </section>
          ) : (
              /* Bar Chart Section */
              <section className='w-full h-full p-[5rem]'>
                <BarChart width={500} height={300} data={data}>
                  <CartesianGrid strokeDasharray='3' />
                  <XAxis dataKey='name' />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey='value' fill='#82ca9d' />
                </BarChart>
                <p>Protected Classes</p>
              </section>
          )}

          {/* Right Section: Score and Stats */}
          <aside className='w-full p-[2rem]'>
            {/* Score Section with ARIA */}
            <div role='status' aria-live='polite' aria-label='Current bias score'>
              <p className='text-green text-[5rem]'>{score.toFixed(1)}</p>
            </div>

            {/* ChatGPT Insights */}
            <div aria-labelledby='chatgpt-insights'>
              <h2 id='chatgpt-insights'>ChatGPT Insights:</h2>
              <p>It seems like you have a few false positive rates that show an increasing trend...</p>
            </div>

            {/* Stats Section */}
            <div role='region' aria-labelledby='stats-title'>
              <h2 id='stats-title'>Overall Performance:</h2>
              <ul>
                <li>Population: Race</li>
                <li>GAP: 53%</li>
                {/* More stats here */}
              </ul>
            </div>
          </aside>
        </main>
      </div>
  );
}

export default App;