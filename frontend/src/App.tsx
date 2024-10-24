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
import Modal from "./Modal";
import Navbar from "./Navbar";

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

function App() {
  const [settingModal, setSettingModal] = useState(false);
  const [xAxis, setXAxis] = useState<string>("Race");

  return (
    <div className="">
      <Navbar />
      <div className="flex w-screen justify-center gap-20">
        <div className="w-[30rem] flex flex-col items-center">
          <p className="text-lg text-gray-700 mb-3">
            Race VS Declined Transaction False Positive Rate
          </p>
          <div className="w-full h-96">
            <ResponsiveContainer height="100%" width="100%">
              <BarChart
                data={raceData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" minTickGap={0} fontSize={14} />
                <YAxis />
                <Tooltip />
                {/* <Legend /> */}
                <Bar
                  dataKey="falsePositiveRate"
                  fill="#8884d8"
                  name="Declined Transaction False Positive Rate"
                  activeBar={<Rectangle stroke="black" />}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-1">
            <p className="text-gray-700">Race</p>
            <button className="" onClick={() => setSettingModal(true)}>
              ⚙️
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center">
            <p className="text-xl">Bias Score</p>
            <p className="text-6xl text-red-700">7.8</p>
          </div>
          <div className="mt-5">
            <p className="text-xl">Statistics</p>
            <p>Min: 31% (White)</p>
            <p>Max: 91% (Hispanic)</p>
            <p>Gap: 70% (White VS Hispanic)</p>
          </div>
        </div>
      </div>
      {settingModal && (
        <Modal onClose={() => setSettingModal(false)} onSelect={setXAxis} />
      )}
    </div>
  );
}

export default App;
