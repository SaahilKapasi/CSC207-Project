import { ReactElement, useState } from "react";
import Graph from "../components/Graph";
import Modal from "../components/Modal";
import { Dataset } from "../types/types";
import { capitalize } from "../utils/string";
import CopyComparisonLinkButton from "../components/CopyComparisonLinkButton";
import DatasetSelector from "../components/DatasetSelector";
import BiasDifferenceDisplay from "../components/BiasDifferenceDisplay";

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

      {/* Copy Link Button */}
      <CopyComparisonLinkButton
        selectedDataset1={selectedDataset1}
        selectedDataset2={selectedDataset2}
      />

      <p className="text-3xl mt-5">Compare bias detected between datasets</p>

      {/* Dataset Selectors */}
      <div className="flex gap-10 mt-10">
        <DatasetSelector
          label="Choose dataset 1"
          datasets={datasets}
          selectedDataset={selectedDataset1}
          setSelectedDataset={setSelectedDataset1}
        />
        <DatasetSelector
          label="Choose dataset 2"
          datasets={datasets}
          selectedDataset={selectedDataset2}
          setSelectedDataset={setSelectedDataset2}
        />
      </div>

      {/* Bias Difference Display */}
      {difference !== undefined && (
        <BiasDifferenceDisplay
          difference={difference}
          dataset1={selectedDataset1!}
          dataset2={selectedDataset2!}
        />
      )}

      {/* Graph Section */}
      {selectedDataset1 && selectedDataset2 && (
        <div>
          <div className="mt-2" />
          <Graph
            name={"Change in Bias Detected by Category"}
            entries={selectedDataset1.categories.map((c, i) => ({
              name: c.name,
              value: c.fprScore - selectedDataset2.categories.find((a) => a.name === c.name)!.fprScore,
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

      {/* Modal Section */}
      {selectedCategory && (
        <Modal
          content={
            <div className="mt-0 w-[50rem] max-w-[90vw] flex flex-col items-center">
              <Graph
                name={`${capitalize(selectedCategory)} Bias Score V.S. Dataset`}
                entries={[
                  {
                    name: selectedDataset1!.name,
                    value: 10 - selectedDataset1!.categories.find(
                      (c) => c.name === selectedCategory
                    )!.fprScore,
                  },
                  {
                    name: selectedDataset2!.name,
                    value: 10- selectedDataset2!.categories.find(
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
