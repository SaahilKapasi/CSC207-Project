import { ReactElement } from "react";
import { getColorByScore } from "../utils/score";

interface BiasProgressBarProps {
  bias: number;
}

export default function BiasProgressBar({
  bias,
}: BiasProgressBarProps): ReactElement {
  return (
    <div className="flex gap-3">
      <p>Low</p>
      <div>
        <div 
          className="w-80 h-8 border-2 border-black rounded-md overflow-hidden"
          role="progressbar" // Add role for accessibility and testing
          aria-valuenow={bias} // Current bias value
          aria-valuemin={0} // Minimum value
          aria-valuemax={10} // Maximum value
          aria-label={`Bias value is ${bias.toFixed(1)} out of 10`} // Screen reader description
        >
          <div
            className={`h-full bg-${getColorByScore(bias)}`}
            style={{ width: `${bias * 10}%` }}
          />
        </div>
        <p
          className="text-sm"
          style={{ marginLeft: `${Math.max(0, bias * 10 - 8)}%` }}
        >
          {bias.toFixed(1)}/10.0
        </p>
      </div>
      <p>High</p>
    </div>
  );
}
