import { ReactElement, useState } from "react";
import { Dataset } from "../types/types";
import DatasetModal from "./DatasetModal";

interface NavbarProps {
  onSelectDataset: (dataset: Dataset) => void;
  onNewDataset: () => void;
  selectedDataset?: Dataset;
  datasets: Dataset[];
  isLandingPage?: boolean;
}

export default function Navbar({
                                 onSelectDataset,
                                 selectedDataset,
                                 onNewDataset,
                                 datasets,
                                 isLandingPage = false, // Default to false
                               }: NavbarProps): ReactElement {
  const [modalOpen, setModalOpen] = useState(false);

  return (
      <div className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-4 bg-white shadow-md">
        {/* Left Section: Cash App Logo */}
        <div className="flex items-center">
          <img
              src="/cash_app.svg" // Ensure this path is correct
              alt="Cash App Logo"
              className="h-8 w-8 mr-3"
          />
          <span className="text-xl font-semibold text-gray-800">Cash App</span>
        </div>

        {/* Center Section */}
        {isLandingPage ? (
            // Animated HiFive x Cash App text for the landing page
            <div className="text-lg font-semibold animate-marquee whitespace-nowrap overflow-hidden">
          <span className="inline-block">
            HiFive x Cash App &nbsp; | &nbsp; HiFive x Cash App &nbsp; | &nbsp;
          </span>
            </div>
        ) : (
            // Dataset information for other pages
            <div className="flex gap-2 items-center">
              <p tabIndex={0} className="text-gray-600">Data Set:</p>
              <p tabIndex={0} className="text-gray-800 font-semibold underline">
                {selectedDataset?.name || "N/A"}
              </p>
              <button
                  onClick={() => setModalOpen(true)}
                  aria-label="Open dataset modal"
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-all"
              >
                Select Dataset
              </button>
              {modalOpen && (
                  <DatasetModal
                      onClose={() => setModalOpen(false)}
                      onSelect={onSelectDataset}
                      onNewDataset={onNewDataset}
                      datasets={datasets}
                  />
              )}
            </div>
        )}

        {/* Right Section */}
        <div>
        <span className="text-lg font-semibold text-gray-700">
          Bias Visualizer
        </span>
        </div>
      </div>
  );
}