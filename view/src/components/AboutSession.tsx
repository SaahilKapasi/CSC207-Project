import { ReactElement } from "react";
import TableOfContents from "./TableOfContents.tsx";

export default function AboutSection(): ReactElement {
  return (
      <div id="about" className="bg-gray-100 p-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Bias Visualizer Tool: User Guide</h2>

          {/* Table of Contents */}
          <TableOfContents/>

          {/* Overview */}
          <h3 id="overview" className="text-xl font-semibold mb-2">
            Overview

          </h3>
          <p className="mb-4">
            The Bias Visualizer Tool is designed to help CashApp identify and visualize potential biases in its AI
            models, with a focus on fraud detection algorithms. This tool provides comprehensive insights into model
            fairness and helps in mitigating algorithmic bias.
          </p>

          {/* Getting Started */}
          <section>
            <h3 id="getting-started" className="text-xl font-semibold mb-2">Getting Started</h3>
            <ol className="list-decimal pl-5 mb-4">
              <li>Access the Bias Visualizer dashboard</li>
              <li>Click "CHOOSE FILE" to select your dataset</li>
              <li>After file selection, click the green "Submit" button</li>
              <li>Utilize the "Compare" feature in the header for multi-dataset analysis</li>
            </ol>
          </section>

          <section>
            <h3 id="data-requirements" className="text-xl font-semibold mb-2">Data Requirements</h3>
            <p className="mb-2">Your dataset must adhere to the following criteria:</p>
            <ul className="list-disc pl-5 mb-4">
              <li>File format: .csv</li>
              <li>Required columns:
                <ul className="list-disc pl-5 mt-2">
                  <li><code className="bg-gray-200 px-2 py-1 rounded">marked</code>: Indicates if a transaction was
                    flagged as fraudulent
                  </li>
                  <li><code className="bg-gray-200 px-2 py-1 rounded">actual</code>: Indicates if a transaction was
                    actually fraudulent
                  </li>
                </ul>
              </li>
              <li>At least one protected class attribute</li>
            </ul>

            <h4 className="text-lg font-semibold mb-2">Protected Class Attributes</h4>
            <li>At least one protected class attribute. <span className="text-red-500 font-bold">The column name in your dataset should exactly match one of these attributes:</span>
              <ul className="list-disc pl-5 mt-2 grid grid-cols-2 gap-2">
                <li>"citizenship"</li>
                <li>"sex"</li>
                <li>"pregnancy"</li>
                <li>"race"</li>
                <li>"family status"</li>
                <li>"place of origin"</li>
                <li>"marital status"</li>
                <li>"ethnic origin"</li>
                <li>"sexual orientation"</li>
                <li>"color"</li>
                <li>"gender identity"</li>
                <li>"ancestry"</li>
                <li>"gender expression"</li>
                <li>"disability"</li>
                <li>"receipt of public assistance (in housing)"</li>
                <li>"age"</li>
                <li>"record of offenses (in employment)"</li>
                <li>"creed"</li>
              </ul>
            </li>
          </section>
          <br/>


          <section>
            <h3 id="analysis-features" className="text-xl font-semibold mb-2">Analysis Features</h3>
            <ul className="list-disc pl-5 mb-4">
              <li><strong>Interactive Visualizations:</strong> Dynamic bar graphs for exploring specific classes.
              </li>
              <li><strong>Overall Bias Score:</strong> Aggregates individual category scores for a comprehensive
                fairness measure.
              </li>
              <li><strong>False Positive Rate (FPR) Analysis:</strong> Calculated as FPR = FP / (FP + TN)
                <ul className="list-disc pl-5 mt-2">
                  <li>FP: Non-fraudulent transactions flagged as fraudulent</li>
                  <li>TN: Non-fraudulent transactions correctly identified</li>
                  <li>Assesses model's tendency for false alarms across groups</li>
                </ul>
              </li>
              <li><strong>Bias Score Calculation:</strong> For each protected attribute (e.g., race, gender):
                <ul className="list-disc pl-5 mt-2">
                  <li>Compares model performance across different groups</li>
                  <li>Uses metrics like false positive rate parity</li>
                  <li>Score of 0 indicates no bias, deviations suggest potential bias</li>
                </ul>
              </li>
              <li><strong>Comparative Analysis:</strong> Compare bias metrics across multiple datasets or model
                versions.
              </li>
            </ul>
          </section>


          <section>
            <h3 id="interpreting-results" className="text-xl font-semibold mb-2">Interpreting Results</h3>
            <p className="mb-4">
              The tool provides various metrics to help interpret bias in your model:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li><strong>Bias Score:</strong> Indicates the level of bias for each protected attribute</li>
              <li><strong>Change in Bias Score:</strong> Shows how bias has shifted for each category over time or
                between datasets
              </li>
              <li><strong>Overall Bias Score:</strong> Provides a comprehensive measure of bias across all attributes
              </li>
            </ul>
          </section>

          <section>
            <h3 id="best-practices" className="text-xl font-semibold mb-2">Best Practices</h3>
            <ul className="list-disc pl-5 mb-4">
              <li>Regularly audit your AI models using this tool</li>
              <li>Compare results across different time periods or model versions</li>
              <li>Use insights to refine your AI models and reduce bias</li>
              <li>Combine tool results with domain expertise for comprehensive bias mitigation</li>
            </ul>
          </section>

          <section>
            <h3 id="technical-support" className="text-xl font-semibold mb-2">Technical Support</h3>
            <p className="mb-4">
              For technical assistance or inquiries about the Bias Visualizer Tool, please contact our support team
              at <a href="mailto:aaina.garg@mail.utoronto.ca"
                    className="text-blue-600 hover:underline">hifive@gmail.com</a>.
            </p>
          </section>
        </div>
      </div>
  );
}






