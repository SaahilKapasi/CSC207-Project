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
        <div className="w-80 h-8 border-2 border-black rounded-md overflow-hidden">
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
