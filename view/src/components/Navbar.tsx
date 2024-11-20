import { ReactElement, useState } from "react";
import { Dataset } from "../types/types";
import DatasetModal from "./DatasetModal";

interface NavbarProps {
  onSelectDataset: (dataset: Dataset) => void;
  onNewDataset: () => void;
  selectedDataset?: Dataset;
  datasets: Dataset[];
}

export default function Navbar({
  onSelectDataset,
  selectedDataset,
  onNewDataset,
  datasets,
}: NavbarProps): ReactElement {
  const [modalOpen, setModalOpen] = useState(false);

  return (
      <div
          className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-4 bg-white shadow-md"
          role="banner" // Adds a semantic role for the navbar
      >
        {/* Left Section: Cash App Logo */}
        <div className="flex items-center">
          {/* Placeholder for logo */}
          <div
              className="h-8 w-8 bg-green-500 rounded-full mr-3"
              aria-hidden="true" // Hides decorative element from screen readers
          ></div>
          <span className="text-xl font-semibold text-gray-800">Cash App</span>
        </div>

        {/* Center Section: Dataset Information */}
        <div className="flex gap-2 items-center">
          <p
              tabIndex={0}
              className="text-gray-600"
              aria-label="Current dataset label"
          >
            Data Set:
          </p>
          <p
              tabIndex={0}
              className="text-gray-800 font-semibold underline"
              aria-live="polite" // Announces changes to the selected dataset dynamically
          >
            {selectedDataset?.name || "N/A"}
          </p>
          <button
              onClick={() => setModalOpen(true)}
              aria-haspopup="dialog" // Indicates that this button opens a modal dialog
              aria-expanded={modalOpen} // Dynamically updates to reflect modal state
              aria-controls="dataset-modal" // Links the button to the modal by ID
              className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-all focus:outline focus:outline-blue-700 focus:outline-offset-2"
              tabIndex ={-1}
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

        {/* Right Section: Bias Visualizer Title */}
        <div>
        <span className="text-lg font-semibold text-gray-700">
          Bias Visualizer
        </span>
        </div>
      </div>
  );
}