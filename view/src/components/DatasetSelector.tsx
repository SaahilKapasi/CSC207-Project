import { Dataset } from "../types/types";

interface DatasetSelectorProps {
  label: string;
  datasets: Dataset[];
  selectedDataset: Dataset | undefined;
  setSelectedDataset: (dataset: Dataset | undefined) => void;
}

export default function DatasetSelector({
  label,
  datasets,
  selectedDataset,
  setSelectedDataset,
}: DatasetSelectorProps): JSX.Element {
  const selectId = "dataset-selector";

  function truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return `${text.slice(0, maxLength)}…`; // Truncate and add ellipsis
    }
    return text;
  }

  
  return (
    <div className="flex flex-col">
      <label htmlFor={selectId} className="mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>

      {/* Select Dropdown */}
      <select
        id={selectId}
        className="select select-sm select-bordered"
        onChange={(e) => {
          setSelectedDataset(
            datasets.find((d) => d.id === e.target.value) || undefined
          );
        }}
        value={selectedDataset?.id || ""}
        aria-describedby={`${selectId}-description`}
      >
        <option disabled value="">
          Pick dataset
        </option>
        {datasets.map((dataset) => (
          <option className="text-lg" key={dataset.id} value={dataset.id}>
            {dataset.name}
          </option>
        ))}
      </select>

      {/* Description for Screen Readers */}
      <p 
        id={`${selectId}-description`} 
        className="mt-1 text-xs text-gray-500"
      >
        Use the dropdown to select a dataset. Currently selected:{" "}
        {selectedDataset ? truncateText(selectedDataset.name, 20) : "none"}.
      </p>
    </div>
  );
}
