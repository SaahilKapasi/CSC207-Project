import { ReactElement } from "react";
import TableOfContents from "./TableOfContents.tsx";

export default function AboutSection(): ReactElement {
  return (
      <div id="about" className="bg-gray-100 p-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Bias Visualizer Tool: User Guide</h2>
          <br/>

          {/* Table of Contents */}
          <TableOfContents/>
          <br/>

          {/* Overview */}
          <h3 id="overview" className="text-xl font-semibold mb-2">
            Overview
          </h3>
          <p className="mb-4">
            The Bias Visualizer Tool is designed to provide clear and interactive visualizations of biases detected in AI models, 
            particularly in fraud detection algorithms. This tool focuses on presenting insights into model fairness and highlighting potential disparities, 
            allowing stakeholders to better understand algorithmic performance across different groups.
          </p>
          <br/>
          <br/>
          {/* Getting Started */}
          <section>
            <h3 id="getting-started" className="text-xl font-semibold mb-4">Getting Started</h3>
            <p className="mb-4">
              Follow these simple steps to begin using the Bias Visualizer dashboard and uncover insights about bias in your datasets:
            </p>
            <ol className="list-decimal pl-5 mb-4">
              <li><strong>Open the Dashboard:</strong> Access the Bias Visualizer dashboard by clicking the <code className="bg-green-200 px-2 py-1 rounded">Get Started</code> button on this page.</li>
              <li>
                <strong>Upload Your Dataset:</strong> Click the <code className="bg-gray-200 px-2 py-1 rounded">CHOOSE FILE</code> button to browse and select your <b>"correctly formatted"</b> dataset file from your computer.
              </li>
              <li>
                <strong>Submit the Dataset:</strong> After selecting your file, click the <code className="bg-green-200 px-2 py-1 rounded">Submit</code> button to upload it to the dashboard.
              </li>
              <li>
                <strong>Analyze and Compare:</strong> Use the interactive graphs and visualizations to explore bias within your dataset. For multi-dataset comparisons, click the <code className="bg-gray-200 px-2 py-1 rounded">Compare</code> button in the header.
              </li>
            </ol>
          </section>
          <br/>
          <br/>
          <section>
            <h3 id="data-requirements" className="text-xl font-semibold mb-2">Data Requirements</h3>
            <p className="mb-2">Your dataset must adhere to the following criteria:</p>
            <ul className="list-disc pl-5 mb-4">
              <li><strong>File format:</strong> <code>.csv</code></li>
              <li><strong>Required columns:</strong>
                <ul className="list-disc pl-5 mt-2">
                  <li><code>"marked"</code>: Indicates if a transaction was flagged as fraudulent
                  </li>
                  <li><code>"actual"</code>: Indicates if a transaction was actually fraudulent
                  </li>
                </ul>
              </li>
              <li><strong>At least one protected class attribute described below: </strong> <span className="text-red-500">(the intended protected class column names 
                in your dataset should match <b>exactly</b> to below attributes)</span>  
                <ul className="list-disc pl-5 mt-2 grid grid-cols-2 gap-2">
                  <li>citizenship</li>
                  <li>sex</li>
                  <li>pregnancy</li>
                  <li>race</li>
                  <li>family status</li>
                  <li>place of origin</li>
                  <li>marital status</li>
                  <li>ethnic origin</li>
                  <li>sexual orientation</li>
                  <li>color</li>
                  <li>gender identity</li>
                  <li>ancestry</li>
                  <li>gender expression</li>
                  <li>disability</li>
                  <li>receipt of public assistance (in housing)</li>
                  <li>age</li>
                  <li>record of offenses (in employment)</li>
                  <li>creed</li>
                </ul>
              </li>
            </ul>
          </section>
          <br/>
          <br/>
          <section>
            <h3 id="analysis-features" className="text-xl font-semibold mb-4">Analysis Features</h3>
            <ul className="list-disc pl-5 mb-4">
              <li><strong>Interactive Visualizations:</strong> Clickable bar graphs allow you to explore bias scores across categories (protected classes). The initial graph shows bias scores for each category, calculated based on the variance in False Positive Rates (FPR). Clicking on a bar reveals detailed FPRs for each value within the category (e.g., specific demographic groups).</li>
              
              <li><strong>False Positive Rate (FPR):</strong> FPR measures how often transactions are incorrectly flagged as fraudulent. It is calculated for each value in a category as:
                <ul className="list-disc pl-5 mt-2">
                  <li>FPR = False Positives / Total Population of the Value</li>
                  <li>For example, FPR for "White" in the "Race" category would be the proportion of transactions incorrectly flagged as fraudulent for White individuals.</li>
                </ul>
              </li>
              
              <li><strong>Bias Score Calculation:</strong> Bias scores are derived from the variance of FPRs within a category. 
                <ul className="list-disc pl-5 mt-2">
                  <li>The score is normalized by dividing the variance by the maximum possible variance (0.25).</li>
                  <li>A bias score of 0 indicates no bias, while 10 represents maximum bias (e.g., one group has an FPR of 0 while another has an FPR of 1).</li>
                </ul>
              </li>
              
              <li><strong>Overall Bias Score:</strong> Provides a high-level summary of bias by aggregating bias scores across all categories. This helps users quickly gauge the overall fairness of a model.</li>
              
              <li><strong>Comparative Analysis:</strong> Compare bias metrics across multiple models or datasets. The tool highlights changes in bias scores for each category, enabling users to assess whether a new model version has improved fairness or introduced more bias.</li>
            </ul>
          </section>

          <br/>
          <br/>
          <section>
            <h3 id="understanding-the-metrics" className="text-xl font-semibold mb-4">Understanding the Metrics</h3>
            <p className="mb-4">
              The Bias Visualizer Tool provides several key metrics to help you interpret bias in your model:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li><strong>Bias Score:</strong> Represents the level of bias for each protected attribute. A score of 0 indicates no bias, while 10 suggests high bias.</li>
              <li><strong>Change in Bias Score:</strong> Compares bias levels across datasets or model versions, helping you assess improvements or regressions in fairness.</li>
              <li><strong>Overall Bias Score:</strong> A summary metric aggregating bias scores across all categories for a quick overview of your model's fairness.</li>
            </ul>
            <p>
              Use these metrics to identify areas for improvement and track progress as you refine your models.
            </p>
          </section>
          <br/>
          <br/>
          <section>
            <h3 id="best-practices" className="text-xl font-semibold mb-4">Best Practices</h3>
            <ul className="list-disc pl-5 mb-4">
              <li>
                <strong>Regularly Audit Your AI Models:</strong> 
                Use the Bias Visualizer Tool on a regular schedule to monitor fairness metrics and track potential biases over time. Establish periodic evaluations to ensure ongoing fairness as models evolve.
              </li>
              <li>
                <strong>Compare Results Across Versions:</strong> 
                Utilize the comparative analysis feature to identify changes in bias scores between datasets or model iterations. Pay close attention to categories with significant shifts to understand how updates impact fairness.
              </li>
              <li>
                <strong>Refine Models Based on Insights:</strong> 
                Leverage insights to identify areas for improvement, such as categories with high bias scores. Collaborate with teams to address disparities through adjustments in data collection, preprocessing, or algorithm design.
              </li>
              <li>
                <strong>Engage Domain Experts:</strong> 
                Combine the tool's results with input from subject matter experts to ensure a thorough understanding of the context behind biases. This interdisciplinary approach can lead to more effective and ethical AI systems.
              </li>
              <li>
                <strong>Incorporate Feedback Loops:</strong> 
                Continuously refine your models and processes by integrating insights from the tool, user feedback, and iterative testing. Document lessons learned to improve future workflows.
              </li>
              <li>
                <strong>Analyze Across Demographics and Contexts:</strong> 
                Validate that datasets used for analysis represent real-world diversity. Consider intersectional attributes (e.g., combining age and gender) to gain deeper insights into fairness.
              </li>
              <li>
                <strong>Educate Teams About Bias:</strong> 
                Provide training on interpreting bias metrics and taking corrective actions. Encourage discussions around fairness and ethics in AI development.
              </li>
              <li>
                <strong>Use Results as a Starting Point:</strong> 
                Remember that the tool provides insights but does not eliminate bias. Treat the findings as the foundation for further investigation and collaborative efforts to improve fairness.
              </li>
            </ul>
          </section>
          <br/>
          <br/>
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






