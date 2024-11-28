import axios from "axios";
import { ReactElement, useState } from "react";
import Graph from "../components/Graph";
import Modal from "../components/Modal";
import { API_BASE_URL } from "../consts/consts";
import { Dataset } from "../types/types";
import { capitalize } from "../utils/string";

interface ComparePageProps {
  datasets: Dataset[];
  selectedDataset1: Dataset | undefined;
  selectedDataset2: Dataset | undefined;
  setSelectedDataset1: (dataset: Dataset | undefined) => void;
  setSelectedDataset2: (dataset: Dataset | undefined) => void;
}

export default function ComparePage({
  datasets,
  selectedDataset1,
  selectedDataset2,
  setSelectedDataset1,
  setSelectedDataset2,
}: ComparePageProps): ReactElement {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const difference =
    selectedDataset1 && selectedDataset2
      ? 10 - selectedDataset2.score - (10 - selectedDataset1.score)
      : undefined;

  return (
    <div className="relative flex flex-col items-center">
      <button
        className="absolute top-5 right-5 btn"
        onClick={async () => {
          const response = await axios.post(
            `${API_BASE_URL}/api/saveComparison`,
            {
              data: JSON.stringify({
                dataset1: selectedDataset1,
                dataset2: selectedDataset2,
              }),
            }
          );
          const comparisonId = response.data;

          navigator.clipboard.writeText(
            `${window.location.origin}/#${comparisonId}`
          );
        }}
      >
        Copy link
      </button>
      <p className="text-3xl mt-5">Compare bias detected between datasets</p>
      {/* Choose buttons */}
      <div className="flex gap-10 mt-10">
        <div className="flex flex-col">
          <p>Choose dataset 1</p>
          <select
            className="select select-sm select-bordered"
            onChange={(e) => {
              setSelectedDataset1(
                datasets.find((d) => d.id === e.target.value) || undefined
              );
            }}
          >
            <option disabled selected>
              Pick dataset 1
            </option>
            {datasets.map((dataset) => (
              <option
                className="text-lg"
                key={dataset.id}
                value={dataset.id}
                selected={dataset === selectedDataset1}
              >
                {dataset.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <p>Choose dataset 2</p>
          <select
            className="select select-sm select-bordered"
            onChange={(e) => {
              setSelectedDataset2(
                datasets.find((d) => d.id === e.target.value) || undefined
              );
            }}
          >
            <option disabled selected>
              Pick dataset 2
            </option>
            {datasets.map((dataset) => (
              <option
                className="text-lg"
                key={dataset.id}
                value={dataset.id}
                selected={dataset === selectedDataset2}
              >
                {dataset.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {difference !== undefined && (
        <p className={`mt-5 text-lg`}>
          Overall bias{" "}
          <span
            className={`text-${
              difference < 0
                ? "green-500"
                : difference === 0
                ? "yellow-500"
                : "red-500"
            }`}
          >
            {difference < 0 ? "decreased" : "increased"} by{" "}
            {Math.abs(difference).toFixed(1)}/10
          </span>{" "}
          from <span className="text-blue-500">{selectedDataset1?.name}</span>{" "}
          to <span className="text-blue-500">{selectedDataset2?.name}</span>
        </p>
      )}
      {selectedDataset1 && selectedDataset2 && (
        <div>
          <div className="mt-2" />
          <Graph
            name={"Change in Bias Detected by Category"}
            entries={selectedDataset1.categories.map((c, i) => ({
              name: c.name,
              value:
                selectedDataset2.categories.find((a) => a.name === c.name)!
                  .fprScore - c.fprScore,
            }))}
            getColor={(value) => (value < 0 ? "green-500" : "red-500")}
            maxValue={10}
            minValue={-10}
            maxValueLabel={"More bias (10)"}
            zeroValueLabel="No change (0)"
            minValueLabel="Less bias (-10)"
            onBarClick={(category) => {
              setSelectedCategory(category);
            }}
          />
        </div>
      )}
      {selectedCategory && (
        <Modal
          content={
            <div className="mt-0 w-[50rem] max-w-[90vw] flex flex-col items-center">
              <Graph
                name={`Dataset V.S. ${capitalize(selectedCategory)} Bias Score`}
                entries={[
                  {
                    name: selectedDataset1!.name,
                    value: selectedDataset1!.categories.find(
                      (c) => c.name === selectedCategory
                    )!.fprScore,
                  },
                  {
                    name: selectedDataset2!.name,
                    value: selectedDataset2!.categories.find(
                      (c) => c.name === selectedCategory
                    )!.fprScore,
                  },
                ]}
                getColor={(value) => "blue-500"}
                maxValue={10}
                maxValueLabel={"10 (High)"}
                zeroValueLabel="0 (Low)"
              />
              <div className="mt-32" />
            </div>
          }
          onClose={() => {
            setSelectedCategory(null);
          }}
        />
      )}
    </div>
  );
}
