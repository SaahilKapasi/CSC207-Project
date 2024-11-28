import { ReactElement, useState } from "react";
import { Dataset } from "../types/types";

interface NavbarProps {
  onSelectDataset: (dataset: Dataset) => void;
  onNewDataset: () => void;
  onNewCompare: () => void;
  selectedDataset?: Dataset;
  selectedPage: "new" | "landing" | "graph" | "compare";
  datasets: Dataset[];
}

export default function Navbar({
  onSelectDataset,
  selectedDataset,
  onNewDataset,
  onNewCompare,
  selectedPage,
  datasets,
}: NavbarProps): ReactElement {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div
      className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 py-2 bg-white shadow-md"
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
      <div className="flex gap-2">
        {datasets.map((dataset) => (
          <button
            className={`p-2 bg-slate-100 rounded-md border-2 ${
              selectedPage === "graph" && dataset.id === selectedDataset?.id
                ? "border-slate-700"
                : ""
            }`}
            onClick={() => onSelectDataset(dataset)}
          >
            <p>{dataset.name}</p>
          </button>
        ))}
        <button
          className={`p-2 bg-slate-100 rounded-md border-2 ${
            selectedPage === "compare" ? "border-slate-700" : ""
          }`}
          onClick={() => onNewCompare()}
        >
          <p>Compare</p>
        </button>
        <button
          className={`p-2 bg-slate-100 rounded-md border-2 ${
            selectedPage === "new" ? "border-slate-700" : ""
          }`}
          onClick={() => onNewDataset()}
        >
          <p>+</p>
        </button>
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
