import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "../components/Navbar";
import { Dataset } from "../types/types";

// Mock datasets
const mockDatasets: Dataset[] = [
  {
    id: "1",
    name: "Dataset 1",
    categories: [],
    score: 0.9,
  },
  {
    id: "2",
    name: "Dataset 2",
    categories: [],
    score: 0.85,
  },
];

// Mock callback functions
const mockOnSelectDataset = jest.fn();
const mockOnNewDataset = jest.fn();

describe("Navbar", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the Navbar with default props", () => {
    render(
      <Navbar
        onSelectDataset={mockOnSelectDataset}
        onNewDataset={mockOnNewDataset}
        datasets={mockDatasets}
      />
    );

    // Check static elements
    expect(screen.getByText("Cash App")).toBeInTheDocument();
    expect(screen.getByText("Bias Visualizer")).toBeInTheDocument();

    // Check dataset label
    expect(screen.getByText("Data Set:")).toBeInTheDocument();
    expect(screen.getByText("N/A")).toBeInTheDocument(); // Default dataset is "N/A"

    // Check "Select Dataset" button
    const selectDatasetButton = screen.getByRole("button", { name: "Select Dataset" });
    expect(selectDatasetButton).toBeInTheDocument();
    expect(selectDatasetButton).toHaveAttribute("aria-haspopup", "dialog");
    expect(selectDatasetButton).toHaveAttribute("aria-expanded", "false");
  });

  test("updates selected dataset label dynamically", () => {
    const selectedDataset = mockDatasets[0];

    render(
      <Navbar
        onSelectDataset={mockOnSelectDataset}
        onNewDataset={mockOnNewDataset}
        datasets={mockDatasets}
        selectedDataset={selectedDataset}
      />
    );

    // Check that the selected dataset name is displayed
    expect(screen.getByText(selectedDataset.name)).toBeInTheDocument();
  });

  test("opens the DatasetModal when 'Select Dataset' button is clicked", () => {
    render(
      <Navbar
        onSelectDataset={mockOnSelectDataset}
        onNewDataset={mockOnNewDataset}
        datasets={mockDatasets}
      />
    );

    // Open the modal
    const selectDatasetButton = screen.getByRole("button", { name: "Select Dataset" });
    fireEvent.click(selectDatasetButton);

    // Check that the modal is rendered
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Choose Dataset")).toBeInTheDocument();
  });

  test("closes the DatasetModal when onClose is triggered", () => {
    render(
      <Navbar
        onSelectDataset={mockOnSelectDataset}
        onNewDataset={mockOnNewDataset}
        datasets={mockDatasets}
      />
    );

    // Open the modal
    const selectDatasetButton = screen.getByRole("button", { name: "Select Dataset" });
    fireEvent.click(selectDatasetButton);

    // Close the modal
    const modal = screen.getByRole("dialog");
    fireEvent.click(modal.querySelector(".bg-black")!); // Simulate clicking outside the modal

    // Check that the modal is closed
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("calls onSelectDataset when a dataset is selected", () => {
    render(
      <Navbar
        onSelectDataset={mockOnSelectDataset}
        onNewDataset={mockOnNewDataset}
        datasets={mockDatasets}
      />
    );

    // Open the modal
    const selectDatasetButton = screen.getByRole("button", { name: "Select Dataset" });
    fireEvent.click(selectDatasetButton);

    // Select a dataset
    const datasetButton = screen.getByLabelText("Select dataset Dataset 1");
    fireEvent.click(datasetButton);

    // Check callback execution
    expect(mockOnSelectDataset).toHaveBeenCalledWith(mockDatasets[0]);
  });

  test("calls onNewDataset when creating a new dataset", () => {
    render(
      <Navbar
        onSelectDataset={mockOnSelectDataset}
        onNewDataset={mockOnNewDataset}
        datasets={mockDatasets}
      />
    );

    // Open the modal
    const selectDatasetButton = screen.getByRole("button", { name: "Select Dataset" });
    fireEvent.click(selectDatasetButton);

    // Click "New Dataset" button
    const newDatasetButton = screen.getByLabelText("Create new dataset");
    fireEvent.click(newDatasetButton);

    // Check callback execution
    expect(mockOnNewDataset).toHaveBeenCalled();
  });
});
