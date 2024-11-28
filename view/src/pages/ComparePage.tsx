import { ReactElement, useState } from "react";
import Graph from "../components/Graph";
import { Dataset } from "../types/types";

interface ComparePageProps {
  datasets: Dataset[];
}

export default function ComparePage({
  datasets,
}: ComparePageProps): ReactElement {
  const [selectedDataset1, setSelectedDataset1] = useState<Dataset | null>(
    null
  );
  const [selectedDataset2, setSelectedDataset2] = useState<Dataset | null>(
    null
  );

  const difference =
    selectedDataset1 && selectedDataset2
      ? 10 - selectedDataset2.score - selectedDataset1.score
      : undefined;

  return (
    <div className="flex flex-col items-center">
      <p className="text-3xl mt-5">Compare bias detected between datasets</p>
      {/* Choose buttons */}
      <div className="flex gap-10 mt-10">
        <div className="flex flex-col">
          <p>Choose dataset 1</p>
          <select
            className="select select-sm select-bordered"
            onChange={(e) => {
              setSelectedDataset1(
                datasets.find((d) => d.id === e.target.value) || null
              );
            }}
          >
            <option disabled selected>
              Pick dataset 1
            </option>
            {datasets.map((dataset) => (
              <option className="text-lg" key={dataset.id} value={dataset.id}>
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
                datasets.find((d) => d.id === e.target.value) || null
              );
            }}
          >
            <option disabled selected>
              Pick dataset 2
            </option>
            {datasets.map((dataset) => (
              <option className="text-lg" key={dataset.id} value={dataset.id}>
                {dataset.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {difference !== undefined && (
        <p className={`mt-5 text-lg`}>
          Overall bias{" "}
          <span className={`text-${difference < 0 ? "green-500" : "red-500"}`}>
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
            onBarClick={(category) => {}}
          />
        </div>
      )}
    </div>
  );
}
