import { ReactElement } from "react";
import { Dataset } from "../types/types";

interface ModalProps {
  onClose: () => void;
  onSelect: (dataset: Dataset) => void;
  onNewDataset: () => void;
  datasets: Dataset[];
}

export default function DatasetModal({
  datasets,
  onClose,
  onSelect,
  onNewDataset,
}: ModalProps): ReactElement {
  return (
    <div className="fixed z-50 w-screen h-screen top-0 left-0">
      <div
        className="bg-black opacity-50 h-full w-full absolute"
        onClick={onClose}
      />
      <div className="absolute min-w-96 bg-white rounded-md flex items-center flex-col p-8 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
        <p className="text-xl">Choose Dataset</p>
        <div className="flex-col gap-3 flex mt-5">
          {datasets.map((dataset) => (
            <div className="flex gap-3 justify-between">
              <button
                className="p-1 px-3 bg-gray-100 min-w-32 hover:bg-gray-200"
                onClick={() => {
                  onSelect(dataset);
                  onClose();
                }}
              >
                {dataset.name}
              </button>

              <button
                className="p-1 px-3 bg-gray-100 min-w-32 hover:bg-gray-200"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${window.location.origin}/${dataset.id}`
                  );
                  onClose();
                }}
              >
                Copy Link
              </button>
            </div>
          ))}
          <div className="flex gap-3 justify-between">
            <button
              className="p-1 px-3 bg-gray-100 min-w-32 hover:bg-gray-200"
              onClick={() => {
                onNewDataset();
                onClose();
              }}
            >
              New Dataset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
