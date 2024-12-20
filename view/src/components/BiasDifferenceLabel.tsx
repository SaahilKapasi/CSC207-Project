import { Dataset } from "../types/types";

interface BiasDifferenceDisplayProps {
  dataset1: Dataset;
  dataset2: Dataset;
}

export default function BiasDifferenceDisplay({
  dataset1,
  dataset2,
}: BiasDifferenceDisplayProps): JSX.Element {
  const difference = 10 - dataset2.score - (10 - dataset1.score);

  return (
    <p className="mt-5 text-lg">
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
      from <span className="text-blue-500">{dataset1.name}</span> to{" "}
      <span className="text-blue-500">{dataset2.name}</span>
    </p>
  );
}
