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
      <div className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-4 bg-white shadow-md">
        {/* Left Section: Cash App Logo - to be added , for now a green placeholder*/}
        <div className="flex items-center">
          {/* Placeholder for logo- added */}
          <div className="h-8 w-8 bg-green-500 rounded-full mr-3"></div>
          <span className="text-xl font-semibold text-gray-800">Cash App</span>
        </div>

        {/* Center Section: Dataset Information */}
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

        {/* Right Section: Bias Visualizer Title */}
        <div>
          <span className="text-lg font-semibold text-gray-700">Bias Visualizer</span>
        </div>
      </div>
  );
}