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
    <div className="fixed top-0 left-0 w-screen z-50 flex justify-center p-3 border-gray-200 border-b-2 bg-gray-100">
      <div className="flex gap-1">
        <p tabIndex={0} className="">Data Set:</p>
        <p tabIndex={0} className="underline">{selectedDataset?.name || "N/A"}</p>
        <button 
          onClick={() => setModalOpen(true)} 
          aria-label="Open dataset modal"
        >📝</button>
        {modalOpen && (
          <DatasetModal
            onClose={() => setModalOpen(false)}
            onSelect={onSelectDataset}
            onNewDataset={onNewDataset}
            datasets={datasets}
          />
        )}
      </div>
    </div>
  );
}
