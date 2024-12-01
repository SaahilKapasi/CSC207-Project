import { ReactElement } from "react";

interface GraphProps {
  name: string;
  onBarClick?: (bar: string) => void;
  maxValue: number;
  minValue?: number;
  entries: { name: string; value: number }[];
  maxValueLabel: string;
  zeroValueLabel: string;
  minValueLabel?: string;
  getColor: (value: number) => string;
  keyboardNavigationEnabled?: boolean;
}

export default function Graph({
  onBarClick,
  name,
  maxValue,
  minValue = 0,
  entries,
  maxValueLabel,
  zeroValueLabel,
  minValueLabel,
  getColor,
  keyboardNavigationEnabled = true, // Default to enabled
}: GraphProps): ReactElement {
  const barWidth = 10;
  const gap = 2;
  const height = 48;
  const enableNegative = minValue < 0;

  return (
    <div className="flex flex-col items-center">
      <p className="mb-4 text-lg text-center underline">{name}</p>
      <div className="w-max relative">
        <div
          className="flex"
          style={{
            height: `${height / 4}rem`,
            gap: `${gap / 4}rem`,
          }}
        >
          {/* Y axis */}
          <div className="h-full border-black border-r-2 relative">
            <div className="absolute top-0 -right-[2px] -translate-y-1/2 w-max text-sm flex items-center gap-2">
              {maxValueLabel}
              <div className="w-2 h-[2px] bg-black -mt-[2px]" />
            </div>
            {enableNegative && (
              <div className="absolute top-1/2 -right-[2px] -translate-y-1/2 w-max text-sm flex items-center gap-2">
                {zeroValueLabel}
                <div className="w-2 h-[2px] bg-black mt-[2px]" />
              </div>
            )}
            <div className="absolute bottom-0 -right-[2px] translate-y-1/2 w-max text-sm flex items-center gap-2">
              {enableNegative ? minValueLabel : zeroValueLabel}
              <div className="w-2 h-[2px] bg-black -mb-[2px]" />
            </div>
          </div>
          {/* Bars */}
          <div
            className="h-full flex items-end"
            style={{
              gap: `${gap / 4}rem`,
              height: enableNegative ? `${height / 8}rem` : `${height / 4}rem`,
            }}
          >
            {entries.map((entry, index) => (
              <div
                key={index}
                className="h-full flex relative hover:bg-slate-100 hover:cursor-pointer"
                style={{
                  width: `${barWidth / 4}rem`,
                  alignItems: "flex-end",
                }}
                onClick={() => onBarClick && onBarClick(entry.name)}
                tabIndex={keyboardNavigationEnabled ? 0 : undefined} // Conditional tabIndex
                role={keyboardNavigationEnabled ? "button" : undefined} // Conditional role
                aria-label={`Bar ${entry.name}, value ${entry.value}`} // Screen reader description
                onKeyDown={(e) => {
                if (keyboardNavigationEnabled) {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onBarClick && onBarClick(entry.name); 
                  }
                }
              }}
              >
                {/* Bar */}
                <div
                  className={`bg-${getColor(entry.value)}`}
                  style={{
                    height: `${(Math.abs(entry.value) / maxValue) * 100}%`,
                    width: `${barWidth / 4}rem`,
                    marginTop: entry.value < 0 ? `${height / 8}rem` : 0,
                    alignSelf: entry.value < 0 ? "flex-start" : "flex-end",
                  }}
                ></div>
                {/* Label */}
                <div
                  className="absolute w-max"
                  style={{
                    marginLeft: `${
                      barWidth / 8 + (entry.value < 0 ? 0.5 : 1)
                    }rem`,
                    marginTop: enableNegative ? `${height / 8}rem` : 0,
                    bottom: entry.value < 0 ? undefined : "-2.5rem",
                    top: entry.value < 0 ? "-2rem" : undefined,
                    transformOrigin:
                      entry.value < 0 ? "bottom left" : "top left",
                    rotate: entry.value < 0 ? "-90deg" : "90deg",
                  }}
                >
                  {entry.name}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className="h-[2px] w-full bg-black absolute"
          style={{ top: enableNegative ? "50%" : "100%" }}
        />
      </div>
    </div>
  );
}
