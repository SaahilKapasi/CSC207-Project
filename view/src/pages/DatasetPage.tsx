import { useState } from "react";
import BiasProgressBar from "../components/BiasProgressBar";
import CategoryInfoModal from "../components/CategoryInfoModal";
import CopyLinkButton from "../components/CopyLinkButton";
import Graph from "../components/Graph";
import { Category, Dataset } from "../types/types";
import { getColorByScore } from "../utils/score";

const raceData = [
  {
    name: "White",
    falsePositiveRate: 0.31,
  },
  {
    name: "Black",
    falsePositiveRate: 0.53,
  },
  {
    name: "Asian",
    falsePositiveRate: 0.45,
  },
  {
    name: "Hispanic",
    falsePositiveRate: 0.91,
  },
];

const genderData = [
  {
    name: "Male",
    falsePositiveRate: 0.45,
  },
  {
    name: "Female",
    falsePositiveRate: 0.55,
  },
];

function CustomizedAxisTick({ x, y, stroke, payload }: any) {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-35)"
      >
        {payload.value}
      </text>
    </g>
  );
}

function scoreToColor(score: number) {
  if (score < 3.3) {
    return "red-700";
  } else if (score < 6.6) {
    return "yellow-500";
  } else {
    return "green-700";
  }
}

function scoreToText(score: number) {
  if (score < 3.3) {
    return "BAD bad BADD!!asdf";
  } else if (score < 6.6) {
    return "Okay";
  } else {
    return "Good";
  }
}

interface GraphPageProps {
  dataset: Dataset;
}

export default function DatasetPage({ dataset }: GraphPageProps) {
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
      <p className="mb-2 text-lg mt-5">Overall Bias Detected:</p>
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
