import { ReactElement } from "react";
import TableOfContents from "./TableOfContents.tsx";

export default function AboutSection(): ReactElement {
  return (
    <div id="about" className="bg-gray-100 p-10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Bias Calculator Project</h2>

        {/* Table of Contents */}
        <TableOfContents />

        {/* Background */}
        <h3 id="background" className="text-xl font-semibold mb-2">
          Background
        </h3>
        <p className="mb-4">
          Algorithmic bias, particularly indirect bias, is a significant
          concern for financial applications like CashApp. Indirect bias arises
          when a machine learning model uses seemingly neutral features that
          disproportionately impact protected groups.
        </p>

        {/* Project Goals */}
        <h3 id="project-goals" className="text-xl font-semibold mb-2">
          Project Goals
        </h3>
        <p className="mb-4">
          Our project aims to integrate fairness into CashApp’s machine
          learning practices by ensuring compliance, building trust, and
          improving decision-making.
        </p>

        {/* How Can We Achieve This? */}
        <h3 id="how-can-we-achieve-this" className="text-xl font-semibold mb-2">
          How Can We Achieve This?
        </h3>
        <ul className="list-disc pl-5 mb-6">
          <li>Identify Direct Bias</li>
          <li>Identify Indirect Bias</li>
          <li>Visualize Bias</li>
          <li>Integrate Fairness Metrics</li>
          <li>Adjust Model Design</li>
        </ul>

        {/* Problem Statement */}
        <h3 id="problem-statement" className="text-xl font-semibold mb-2">
          Problem Statement
        </h3>
        <p className="mb-4">
          The failure to sufficiently tackle bias in CashApp's machine learning
          models poses risks such as loss of user trust and restricted access
          for certain populations.
        </p>

        {/* Proposed Solution */}
        <h3 id="proposed-solution" className="text-xl font-semibold mb-2">
          Proposed Solution
        </h3>
        <p className="mb-4">
          We will build an application that identifies algorithmic bias and
          provides clear visualizations to help CashApp employees understand
          and address these biases.
        </p>

        {/* Project Structure */}
        <h3 id="project-structure" className="text-xl font-semibold mb-2">
          Project Structure
        </h3>
        <p className="mb-4">
          The project consists of a backend (FastAPI) for processing data and a
          frontend (React) for user interaction and visualization.
        </p>

        {/* Running the Project */}
        <h3 id="running-the-project" className="text-xl font-semibold mb-2">
          Running the Project
        </h3>
        <ol className="list-decimal pl-5">
          <li>Install dependencies for both backend and frontend.</li>
          <li>Run the backend server using FastAPI.</li>
          <li>Run the frontend development server using npm.</li>
        </ol>
      </div>
    </div>
  );
}
