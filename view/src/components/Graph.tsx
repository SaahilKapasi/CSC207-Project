import { ReactElement } from "react";

interface GraphProps {
  name: string;
  onBarClick?: (bar: string) => void;
  maxValue: number;
  entries: { name: string; value: number }[];
  maxValueLabel: string;
  minValueLabel: string;
  getColor: (value: number) => string;
}

export default function Graph({
  onBarClick,
  name,
  maxValue,
  entries,
  maxValueLabel,
  minValueLabel,
  getColor,
}: GraphProps): ReactElement {
  const barWidth = 10;
  const gap = 2;
  const height = 48;

  return (
    <div className="flex flex-col items-center">
      <p className="mb-4 text-lg text-center">{name}</p>
      <div className="w-max">
        <div
          className="flex"
          style={{
            height: `${height / 4}rem`,
            gap: `${gap / 4}rem`,
          }}
        >
          {/* X axis */}
          <div className="h-full border-black border-r-2 relative">
            <div className="absolute top-0 right-1 -translate-y-1/2 w-max text-sm">
              {maxValueLabel}
            </div>
            <div className="absolute bottom-0 right-1 translate-y-1/2 w-max text-sm">
              {minValueLabel}
            </div>
          </div>
          {/* Bars */}
          <div
            className="h-full flex items-end"
            style={{ gap: `${gap / 4}rem` }}
          >
            {entries.map((entry) => (
              <div
                className="h-full flex items-end relative hover:bg-slate-100 hover:cursor-pointer"
                style={{
                  width: `${barWidth / 4}rem`,
                }}
                onClick={() => onBarClick && onBarClick(entry.name)}
              >
                <div
                  className={`bg-${getColor(entry.value)}`}
                  style={{
                    height: `${(entry.value / maxValue) * 100}%`,
                    width: `${barWidth / 4}rem`,
                  }}
                ></div>
                <div
                  className="absolute -bottom-10 origin-top-left rotate-90 w-max"
                  style={{ marginLeft: `${barWidth / 8 + 1}rem` }}
                >
                  {entry.name}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="h-[2px] w-full bg-black" />
      </div>
    </div>
  );
}
