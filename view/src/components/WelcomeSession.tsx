import { ReactElement } from "react";

interface WelcomeSectionProps {
  onWelcome: () => void;
}

export default function WelcomeSection({
  onWelcome,
}: WelcomeSectionProps): ReactElement {
  return (
    <>
      <div
        className="h-screen bg-cover bg-center flex flex-col items-center justify-center text-center gap-2"
        style={{
          backgroundImage: `url(logo.svg)`, // Replace with your image path
        }}
      >
        <h1 className="text-white text-4xl font-bold bg-black bg-opacity-50 px-4 py-2 rounded">
          Welcome to Bias Visualizer!
        </h1>
        <p className="text-lg text-white p-1 rounded max-w-xl bg-black bg-opacity-50">
          Today we spot bias and together provide an ethical environment. Use
          this to get a better sense of your ML model and protect people from
          undesired harms!
        </p>
        <button
          onClick={onWelcome}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Get Started
        </button>
      </div>
    </>
  );
}
