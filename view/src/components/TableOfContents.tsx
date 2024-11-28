import { ReactElement } from "react";

export default function TableOfContents(): ReactElement {
  return (
    <>
      <h3 className="text-xl font-semibold mb-2">Table of Contents</h3>
      <ul className="list-disc pl-5 mb-6">
        <li>
          <a href="#background">Background</a>
        </li>
        <li>
          <a href="#project-goals">Project Goals</a>
        </li>
        <li>
          <a href="#how-can-we-achieve-this">How Can We Achieve This?</a>
        </li>
        <li>
          <a href="#problem-statement">Problem Statement</a>
        </li>
        <li>
          <a href="#proposed-solution">Proposed Solution</a>
        </li>
        <li>
          <a href="#project-structure">Project Structure</a>
        </li>
        <li>
          <a href="#running-the-project">Running the Project</a>
        </li>
      </ul>
    </>
  );
}
