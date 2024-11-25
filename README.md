# Bias Calculator Project

## Table of Contents 
- [Background](#background) 
- [Project Goals](#project-goals) 
- [How Can We Achieve This?](#how-can-we-achieve-this?) 
- [Problem Statement](#problem-statement)
- [Proposed Solution](#proposed-solution)
- [Project Structure](#project-structure)
- [Running the Project](#running-the-project)

## Background

Algorithmic bias, particularly **indirect bias**, is a significant concern for financial applications like CashApp. Indirect bias arises when a machine learning model uses seemingly neutral features that disproportionately impact protected groups. For instance:

- A creditworthiness model might unintentionally disadvantage individuals from certain socioeconomic backgrounds (which may correlate with race, place of origin, or other protected characteristics) by using proxies like zip codes that reflect historical inequalities.

This issue is particularly relevant to CashApp, as its financial services involve sensitive decisions around credit, loans, and payments. Visualizing how such biases arise and impact protected groups can help CashApp ensure fairness, improve trust, and meet regulatory compliance standards.

### Example Problem:
- A machine learning model might result in **lower loan approval rates for specific ethnic groups** due to correlations between zip codes or income and historical inequities.

By highlighting how "neutral" variables (e.g., geographic location or income) result in disproportionate outcomes, CashApp can refine its models, ensuring fairness and aligning with ethical and regulatory requirements.

---

## Project Goals

### Moving Toward Ethical AI at CashApp

Our project aims to integrate fairness into CashApp’s machine learning practices by:
1. **Ensuring Compliance**:
   - Align with anti-discrimination laws such as Ontario's 17 protected classes.
2. **Building Trust**:
   - Enhance customer trust by demonstrating fairness and transparency in decision-making.
3. **Improving Decision-Making**:
   - Develop fairer models that result in better, ethical decisions for financial products.

---

## How Can We Achieve This?

### Steps to Address Bias
1. **Identify Direct Bias**:
   - Analyze the data used for training models to identify overlooked features that represent protected characteristics.
2. **Identify Indirect Bias**:
   - Analyze how seemingly neutral variables act as proxies for protected characteristics and result in disproportionate outcomes.
3. **Visualize Bias**:
   - Create easy-to-interpret visualizations to help CashApp employees understand where and how bias occurs.
4. **Integrate Fairness Metrics**:
   - Implement metrics and auditing tools to evaluate the impact of proxies for protected characteristics.
5. **Adjust Model Design**:
   - Modify models to mitigate the identified biases and ensure fairness.

---

## Problem Statement

The failure to sufficiently tackle bias in CashApp's machine learning models poses the following risks:
- **Loss of User Trust**:
  - Customers may perceive unfairness, leading to reduced trust and retention.
- **Restricted Access**:
  - Certain populations may face barriers to financial services due to systemic bias in the models.

---

## Proposed Solution

We will build an application that:
1. **Identifies Algorithmic Bias**:
   - Detect bias in CashApp’s machine learning models that results in unfair treatment of protected groups and classes.
2. **Visualizes Bias**:
   - Provide clear, intuitive visualizations to help CashApp employees understand and identify areas for improvement.

### Key Outcomes
- Highlight areas where the model disproportionately affects protected classes (direct and indirect bias).
- Provide actionable insights for mitigating these biases and improving the fairness of CashApp's services.

--- 

## Project Structure

This project is designed to calculate and visualize biases in datasets. The application consists of a backend and frontend, both of which can be run independently. The backend performs bias calculations, while the frontend allows users to interact with the data and view the results.

The project is divided into two main parts:
- **Backend**: A FastAPI-based server that handles file uploads, processes data, and performs bias calculations.
- **Frontend**: A React-based interface for users to upload files and visualize calculated biases.

---

### Features for Analyzing Bias: Stats and Visualizations

The project should include multiple stats and visualizations for analyzing bias, supported by a comprehensive bias score. Here's how it could be structured:

#### Bias Score
- A single composite score to summarize the fairness of the model.
- Based on multiple fairness metrics (e.g., variance in FPR, demographic parity) and aggregated into one value for simplicity.
- **Example**: A bias score ranging from 0 (completely unfair) to 10 (perfectly fair).

---

#### Variance-Based Bias Analysis
- For each protected class (e.g., race, gender):
  - Calculate the variance in **False Positive Rate (FPR)** across categories.
  - **Example**: If the FPR for Group A (e.g., men) is 5% and for Group B (e.g., women) is 15%, this high variance signals bias.

---

#### Graph Features
- **X-Axis**: Categories of a protected class (e.g., race, gender, or location).
- **Y-Axis**: Metrics such as FPR, TPR, or approval rates.
- Display side-by-side comparisons of outcomes for different groups to highlight disparities.

---

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


