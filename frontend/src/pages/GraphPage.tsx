import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import SettingModal from "../components/SettingModal";
import { Dataset } from "../types/types";

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

export default function GraphPage({ dataset }: GraphPageProps) {
  const [settingModal, setSettingModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    dataset.categories[0]
  );
  const xAxis = selectedCategory.name;

  return (
    <div className="">
      <div className="flex w-screen justify-center gap-20">
        <div className="w-[30rem] flex flex-col items-center">
          <p className="text-lg text-gray-700 mb-3">
            {xAxis} VS Declined Transaction False Positive Rate
          </p>
          <div className="w-full h-96" role="img" aria-labelledby="chart-description" aria-label={`Bar chart showing ${xAxis} versus False Positive Rate`}>
            <p id="chart-description" className="sr-only">
            This chart shows the relationship between {xAxis} categories and the False Positive Rate in declined transactions. Values are between 0 and 1, where higher values indicate a higher rate of false positives.
            </p>
            <ResponsiveContainer height="100%" width="100%">
              <BarChart
                data={dataset.categories
                  .find((c) => c.name === xAxis)!
                  .traits.map((t) => ({
                    name: t.name,
                    fprMean: t.fprMean.toFixed(2),
                  }))}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" minTickGap={0} fontSize={14} aria-label="Categories on X-axis" />
                <YAxis domain={[0, 1]} aria-label="False Positive Rate on Y-axis" />
                <Tooltip />
                {/* <Legend /> */}
                <Bar
                  dataKey="fprMean"
                  fill="#8884d8"
                  name="Declined Transaction False Positive Rate"
                  activeBar={<Rectangle stroke="black" />}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-1">
            <p className="text-gray-700">{xAxis}</p>
            <button className="" onClick={() => setSettingModal(true)} aria-label="Open settings modal">
              ⚙️
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center" role="status" aria-live="polite" aria-label="Current bias score">

            <div className="tooltip tooltip-right" data-tip="The bias score is calculated using the variance of all the false positive rates!">
              <p className="text-xl">Overall Bias Score</p>
              <p className={`text-6xl text-${scoreToColor(dataset.score)}`}>
                {dataset.score.toFixed(1)}
              </p>
              <p className={`mt-1 text-${scoreToColor(dataset.score)}`}>
                {scoreToText(dataset.score)}
              </p>
            </div>

          </div>
          <div className="mt-5">
            <p className="text-xl">{xAxis} scores</p>
            <p>
              Bias score:{" "}
              <span
                className={`text-${scoreToColor(
                  selectedCategory!.fprVarianceScore
                )}`}
              >
                {selectedCategory?.fprVarianceScore.toFixed(1)}/10 (
                {scoreToText(selectedCategory!.fprVarianceScore)})
              </span>
            </p>
            <p className="tooltip tooltip-right" data-tip="The model accuracy score is determined by the mean FPR rate.">
              Model accuracy score:{" "}
              <span
                className={`text-${scoreToColor(
                  selectedCategory!.fprMeanScore
                )}`}
              >
                {selectedCategory?.fprMeanScore.toFixed(1)}/10 (
                {scoreToText(selectedCategory!.fprMeanScore)})
              </span>
            </p>
            <p>
              Sample Size:{" "}
              {selectedCategory?.traits.reduce(
                (prev, curr) => prev + curr.count,
                0
              )}
            </p>
            <p>FPR Min: </p>
            <p>FPR Max: </p>
            <p>FPR Gap: </p>
          </div>
        </div>
      </div>
      {settingModal && (
        <SettingModal
          categories={dataset.categories}
          onClose={() => setSettingModal(false)}
          onSelect={setSelectedCategory}
        />
      )}
    </div>
  );
}
