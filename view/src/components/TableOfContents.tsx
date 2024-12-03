import { ReactElement } from "react";

export default function TableOfContents(): ReactElement {
  return (
      <>
        <h3 className="text-xl font-semibold mb-2">Table of Contents</h3>
        <ul className="list-disc pl-5 mb-6">
          <li>
            <a href="#overview">Overview</a>
          </li>
          <li>
            <a href="#getting-started">Getting Started</a>
          </li>
          <li>
            <a href="#data-requirements">Data Requirements</a>
          </li>
          <li>
            <a href="#protected-class-attributes">Protected Classes Attributes</a>
          </li>
          <li>
            <a href="#analysis-features">Analysis Features</a>
          </li>
          <li>
            <a href="#interpreting-results">Interpreting Results</a>
          </li>
          <li>
            <a href="#best-practices">Best Practices</a>
          </li>
          <li>

            <a href="#technical-support">Technical Support</a>
          </li>
        </ul>
      </>
  );
}