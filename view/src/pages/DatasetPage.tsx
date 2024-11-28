import { useState } from "react";
import BiasProgressBar from "../components/BiasProgressBar";
import Graph from "../components/Graph";
import Modal from "../components/Modal";
import { Category, Dataset } from "../types/types";
import { getColorByScore } from "../utils/score";
import { capitalize } from "../utils/string";

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
    <div className="flex flex-col items-center mt-10 text">
      <p className="mb-2 text-lg">Overall Bias Detected:</p>
      <BiasProgressBar bias={9} />
      <p className="mt-5 max-w-96 mb-10 text-md">
        The overall bias detected is high. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Nesciunt iure unde, harum consectetur ipsa
        nemo mollitia repellat hic eveniet minima molestiae laborum natus
        ratione deleniti animi sit. Voluptatum, deserunt qui.
      </p>
      <Graph
        name={"Bias Detected by Category"}
        entries={dataset.categories.map((c) => ({
          name: c.name,
          value: 10 - c.fprScore,
        }))}
        getColor={(value) => getColorByScore(value)}
        maxValue={10}
        maxValueLabel={"High (10)"}
        minValueLabel="Low (0)"
        onBarClick={(category) =>
          setSelectedCategory(
            dataset.categories.find((c) => c.name === category)!
          )
        }
      />
      <div className="mt-36" />
      {selectedCategory && (
        <Modal
          content={
            <div className="mt-0 w-[50rem] max-w-[90vw] flex flex-col items-center">
              <p className="mb-2 text-lg">
                {capitalize(selectedCategory.name)} Bias Detected:
              </p>
              <BiasProgressBar bias={10 - selectedCategory.fprScore} />
              <p className="mt-5 max-w-96 mb-10 text-md">
                The creed bias detected is high. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Nesciunt iure unde, harum
                consectetur ipsa nemo mollitia repellat hic eveniet minima
                molestiae laborum natus ratione deleniti animi sit. Voluptatum,
                deserunt qui.
              </p>
              <Graph
                name={`${capitalize(
                  selectedCategory.name
                )} V.S. False Positive Rate`}
                entries={selectedCategory.traits.map((t) => ({
                  name: t.name,
                  value: t.fprMean,
                }))}
                getColor={(value) => "blue-500"}
                maxValue={1}
                maxValueLabel={"100%"}
                minValueLabel="0%"
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
