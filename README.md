# Bias Calculator Project

This project is designed to calculate and visualize biases in datasets. The application consists of a backend and frontend, both of which can be run independently. The backend performs bias calculations, while the frontend allows users to interact with the data and view the results.

## Project Structure

The project is divided into two main parts:
- **Backend**: A FastAPI-based server that handles file uploads, processes data, and performs bias calculations.
- **Frontend**: A React-based interface for users to upload files and visualize calculated biases.

## Running the Project

### Prerequisites
Make sure you have the following installed:
- **Python** (version 3.8 or higher)
- **Node.js** (for the frontend)

### Backend Setup

1. **Navigate to the backend directory** (where `main.py` is located).
2. **Install required dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the FastAPI Backend**
  ```bash
  fastapi dev main.py
  ```

### Frontend Setup
1. **Navigate to the frontend directory.**

2. **Install frontend dependencies:**
  ```bash
  npm install
  ```
3. **Start the frontend development server:**
  ```bash
  npm run dev
  ```

