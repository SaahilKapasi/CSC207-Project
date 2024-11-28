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
  return (
    <div className="flex flex-col">
      <p>{label}</p>
      <select
        className="select select-sm select-bordered"
        onChange={(e) => {
          setSelectedDataset(
            datasets.find((d) => d.id === e.target.value) || undefined
          );
        }}
        value={selectedDataset?.id || ""}
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
    </div>
  );
}
