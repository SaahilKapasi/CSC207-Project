import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DatasetModal from "../components/DatasetModal";
import { Dataset } from "../types/types";

// Mock data for the tests
const mockDatasets: Dataset[] = [
  { id: "1", name: "Dataset 1" },
  { id: "2", name: "Dataset 2" },
];

// Mock functions for the props
const onClose = jest.fn();
const onSelect = jest.fn();
const onNewDataset = jest.fn();

describe("DatasetModal Component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
  });

  it("renders correctly with datasets", () => {
    render(
      <DatasetModal
        datasets={mockDatasets}
        onClose={onClose}
        onSelect={onSelect}
        onNewDataset={onNewDataset}
      />
    );

    // Check modal title
    expect(screen.getByText(/Choose Dataset/i)).toBeInTheDocument();

    // Check dataset buttons
    mockDatasets.forEach((dataset) => {
      expect(screen.getByText(dataset.name)).toBeInTheDocument();
    });

    // Check "New Dataset" button
    expect(screen.getByText(/New Dataset/i)).toBeInTheDocument();
  });

  it("calls onSelect and onClose when a dataset is selected", () => {
    render(
      <DatasetModal
        datasets={mockDatasets}
        onClose={onClose}
        onSelect={onSelect}
        onNewDataset={onNewDataset}
      />
    );

    // Simulate selecting a dataset
    const datasetButton = screen.getByText("Dataset 1");
    fireEvent.click(datasetButton);

    expect(onSelect).toHaveBeenCalledWith(mockDatasets[0]);
    expect(onClose).toHaveBeenCalled();
  });

  it("copies link and closes modal when 'Copy Link' is clicked", () => {
    render(
      <DatasetModal
        datasets={mockDatasets}
        onClose={onClose}
        onSelect={onSelect}
        onNewDataset={onNewDataset}
      />
    );

    // Simulate copying the link
    const copyLinkButton = screen.getByLabelText("Copy link for dataset Dataset 1");
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(),
      },
    });
    fireEvent.click(copyLinkButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      `${window.location.origin}/1`
    );
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onNewDataset and onClose when 'New Dataset' is clicked", () => {
    render(
      <DatasetModal
        datasets={mockDatasets}
        onClose={onClose}
        onSelect={onSelect}
        onNewDataset={onNewDataset}
      />
    );

    // Simulate creating a new dataset
    const newDatasetButton = screen.getByText(/New Dataset/i);
    fireEvent.click(newDatasetButton);

    expect(onNewDataset).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it("closes modal when the overlay is clicked", () => {
    render(
      <DatasetModal
        datasets={mockDatasets}
        onClose={onClose}
        onSelect={onSelect}
        onNewDataset={onNewDataset}
      />
    );

    // Simulate clicking the overlay
    const overlay = screen.getByLabelText(/Close modal/i);
    fireEvent.click(overlay);

    expect(onClose).toHaveBeenCalled();
  });

  it("traps focus within the modal", () => {
    render(
      <DatasetModal
        datasets={mockDatasets}
        onClose={onClose}
        onSelect={onSelect}
        onNewDataset={onNewDataset}
      />
    );

    // Get all buttons
    const buttons = screen.getAllByRole("button");

    // Focus the first button
    buttons[0].focus();
    expect(document.activeElement).toBe(buttons[0]);

    // Simulate pressing Tab
    fireEvent.keyDown(document, { key: "Tab" });
    expect(document.activeElement).toBe(buttons[1]);

    // Simulate pressing Shift + Tab
    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(buttons[0]);
  });

  it("closes modal on 'Escape' key press", () => {
    render(
      <DatasetModal
        datasets={mockDatasets}
        onClose={onClose}
        onSelect={onSelect}
        onNewDataset={onNewDataset}
      />
    );

    // Simulate pressing Escape
    fireEvent.keyDown(document, { key: "Escape" });

    expect(onClose).toHaveBeenCalled();
  });
});
