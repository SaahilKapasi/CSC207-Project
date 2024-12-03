import { useState } from "react";
import BiasProgressBar from "../components/BiasProgressBar";
import CategoryInfoModal from "../components/CategoryInfoModal";
import CopyLinkButton from "../components/CopyLinkButton";
import Graph from "../components/Graph";
import Tooltip from "../components/Tooltip";
import { Category, Dataset } from "../types/types";
import { getColorByScore } from "../utils/score";

interface DatasetPageProps {
  dataset: Dataset;
}

export default function DatasetPage({ dataset }: DatasetPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  return (
    <div className="relative flex flex-col items-center text">
      <h1 id="page-title" className="sr-only">
        Dataset Bias Visualization
      </h1>
      {/* Copy Link Button */}
      <CopyLinkButton datasetId={dataset.id} />

      {/* Overall Bias Section */}
      <div className="flex items-center mt-5 mb-2 gap-1">
        <p className="text-lg">Overall Bias Detected: </p>
        <Tooltip
          text={
            "The overall bias is calculated by taking the mean of all the bias' detected by each category."
          }
        />
      </div>
      <BiasProgressBar
        bias={10 - dataset.score}
        aria-label={`Overall bias score: ${10 - dataset.score}`}
      />
      <p className="mt-5 max-w-96 mb-10 text-md whitespace-pre-line">
        {dataset.description}
      </p>

      {/* Graph Section */}
      <Graph
        name={"Bias Detected by Category"}
        entries={dataset.categories.map((c) => ({
          name: c.name,
          value: 10 - c.fprScore,
        }))}
        getColor={(value) => getColorByScore(value)}
        maxValue={10}
        maxValueLabel={"High (10)"}
        zeroValueLabel="Low (0)"
        onBarClick={(category) =>
          setSelectedCategory(
            dataset.categories.find((c) => c.name === category)!
          )
        }
        aria-label="Graph showing bias scores by category. Use Tab to navigate and Enter to select a category."
      />
      <div className="mt-36" />

      {/* Modal Section */}
      {selectedCategory && (
        <CategoryInfoModal
          category={selectedCategory}
          onClose={() => setSelectedCategory(null)}
        />
      )}
    </div>
  );
}
