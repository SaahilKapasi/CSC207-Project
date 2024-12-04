# Bias Visualizer Project

## Table of Contents 
- [Authors and contributors](#authors-and-contributors)
- [User Guide](#user-guide)
- [Background](#background) 
- [Project Goals](#project-goals) 
- [How Can We Achieve This?](#how-can-we-achieve-this) 
- [Project Structure](#project-structure)
- [Feedback](#feedback)
- [Contribution](#contribution)
- [Running the Project](#running-the-project)

## Authors and contributors
Aaina, Yimin, Serena, Dany, Saahil

## User Guide
### Getting Started
Follow these simple steps to begin using the Bias Visualizer dashboard and uncover insights about bias in your datasets:

**Open the Dashboard**: Access the Bias Visualizer dashboard by clicking the Get Started button on this page.
**Upload Your Dataset**: Click the CHOOSE FILE button to browse and select your "correctly formatted" dataset file from your computer.
**Submit the Dataset**: After selecting your file, click the Submit button to upload it to the dashboard.
**Analyze and Compare**: Use the interactive graphs and visualizations to explore bias within your dataset. For multi-dataset comparisons, click the Compare button in the header.

### Data Requirements
Your dataset must adhere to the following criteria:
**File format**: `.csv`
**Required columns**:
`marked`: Indicates if a transaction was flagged as fraudulent
`actual`: Indicates if a transaction was actually fraudulent
**At least one protected class attribute described below**: (the intended protected class column names in your dataset should match exactly to below attributes)
`citizenship`, `sex`, `pregnancy`, `race`, `family status`, `place of origin`, `marital status`, `ethnic origin`, `sexual orientation`, `color`, `gender identity`, `ancestry`, `gender expression`, `disability`, `receipt of public assistance (in housing)`, `age`, `record of offenses (in employment)`, `creed`

---

## Background
Algorithmic bias, particularly **indirect bias**, is a significant concern for financial applications like CashApp. Indirect bias arises when a machine learning model uses seemingly neutral features that disproportionately impact protected groups. For instance:
- A creditworthiness model might unintentionally disadvantage individuals from certain socioeconomic backgrounds (which may correlate with race, place of origin, or other protected characteristics) by using proxies like zip codes that reflect historical inequalities.
This issue is particularly relevant to CashApp, as its financial services involve sensitive decisions around credit, loans, and payments. Visualizing how such biases arise and impact protected groups can help CashApp ensure fairness, improve trust, and meet regulatory compliance standards.

### Example Problem:
- A machine learning model might result in **lower loan approval rates for specific ethnic groups** due to correlations between zip codes or income and historical inequities.

By highlighting how "neutral" variables (e.g., geographic location or income) result in disproportionate outcomes, CashApp can refine its models, ensuring fairness and aligning with ethical and regulatory requirements.

---

## Project Goals
### Ethical AI at CashApp
Our project aims to integrate fairness into CashApp’s machine-learning practices by:
1. **Ensuring Compliance**:
   - Align with anti-discrimination laws such as Ontario's 17 protected classes.
2. **Building Trust**:
   - Enhance customer trust by demonstrating fairness and transparency in decision-making.
3. **Improving Decision-Making**:
   - Develop fairer models that result in better, ethical decisions for financial products.

---

## How Can We Achieve This?
### Steps to Address Bias
1. **Visualize Bias**:
   - Create easy-to-interpret visualizations to help CashApp employees understand where and how bias occurs.
2. **Integrate Fairness Metrics**:
   - Implement metrics and auditing tools to evaluate the impact of proxies for protected characteristics.
3. **Adjust Model Design**:
   - Modify models to mitigate the identified biases and ensure fairness.

--- 

## Project Structure
This project is designed to calculate and visualize biases in datasets. The application consists of a backend and frontend, both of which can be run independently. The backend performs bias calculations, while the frontend allows users to interact with the data and view the results.

The project is divided into two main parts:
- **Backend**: A FastAPI-based server that handles file uploads, processes data, and performs bias calculations.
- **Frontend**: A React-based interface for users to upload files and visualize calculated biases.

### Features for Analyzing Bias: Stats and Visualizations
The project should include multiple stats and visualizations for analyzing bias, supported by a comprehensive bias score. Here's how it could be structured:

#### False Positive Rate (FPR)
- FPR measures how often transactions are incorrectly flagged as fraudulent. It is calculated for each value in a category as:
- FPR = False Positives / Total Population of the Value
- **Example**, FPR for "White" in the "Race" category is the proportion of transactions incorrectly flagged as fraudulent for White individuals.

#### Bias Score
- A single composite score to summarize the fairness of the model.
- Based on multiple fairness metrics (e.g., variance in FPR, demographic parity) and aggregated into one value for simplicity.
- **Example**: A bias score ranging from 0 (completely unfair) to 10 (perfectly fair).

#### Variance-Based Bias Analysis (Overall Bias Score)
- For each protected class (e.g., race, gender):
  - Calculate the variance in **False Positive Rate (FPR)** across categories.
  - **Example**: If the FPR for Group A (e.g., men) is 5% and for Group B (e.g., women) is 15%, this high variance signals bias.

#### How This Helps
By integrating these metrics and stats into the web application:

##### **CashApp Employees**
- Can quickly understand bias in the model using visual and numerical representations.
- Make informed decisions about areas to improve (e.g., which protected classes are most impacted).

##### **Customers**
- Gain trust by knowing that the platform is actively addressing fairness issues.

##### **Compliance**
- Meets legal requirements by auditing the model for adherence to anti-discrimination standards.

---

## Feedback
Create an issue detailing your feedback at https://github.com/SaahilKapasi/CSC207-Project/issues/new

---

## Contribution
We welcome your contributions! To submit a high-quality pull request:
1. Fork & Clone: Fork the repo, clone it locally, and create a new branch:
`git checkout -b feature/your-feature-name`
2. Make Changes: Write clean, purposeful code following the project’s style guide. Update documentation and comments as needed.
3. Test: Add and run tests to ensure your changes work and don’t break anything.
4. Commit: Use clear, descriptive commit messages:
`git commit -m "Describe your change"`
5. Push & PR: Push your branch and open a pull request with a descriptive title and explanation of your changes.
6. Address Feedback: Be available to discuss and refine your PR as needed.
Thank you for contributing!

--- 

## Running the Project
### Prerequisites
Make sure you have the following installed:
- **Python** (version 3.8 or higher)
- **Node.js** (for the frontend)

### Backend Setup
1. **Navigate to the backend directory** (where `main.py` is located).
2. **Install required dependencies**: (skip to the next one if you have run it before)
   ```bash
   pip install -r requirements.txt
   ```
3. **Run the FastAPI Backend**
  ```bash
  fastapi dev main.py
  ```

### Frontend Setup
1. **Navigate to the frontend directory.**
2. **Install frontend dependencies:** (skip to the next one if you have run it before)
  ```bash
  npm install
  ```
3. **Start the frontend development server:**
  ```bash
  npm run dev
  ```


