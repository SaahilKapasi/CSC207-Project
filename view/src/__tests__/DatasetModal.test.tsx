import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DatasetModal from "../components/DatasetModal";
import { Dataset } from "../types/types"; 


// Mock dataset with additional properties
const mockDatasets: Dataset[] = [
    {
      id: "1",
      name: "Dataset 1",
      categories: [
        {
          name: "Fraud",
          fprMeanScore: 0.85,
          fprVarianceScore: 0.02,
          traits: [
            { name: "High Risk", fprMean: 0.9, count: 120 },
            { name: "Verified", fprMean: 0.8, count: 80 },
          ],
        },
        {
          name: "Non-Fraud",
          fprMeanScore: 0.15,
          fprVarianceScore: 0.01,
          traits: [
            { name: "Low Risk", fprMean: 0.1, count: 200 },
          ],
        },
      ],
      score: 0.85,
    },
    {
      id: "2",
      name: "Dataset 2",
      categories: [
        {
          name: "Fraud",
          fprMeanScore: 0.9,
          fprVarianceScore: 0.03,
          traits: [
            { name: "High Risk", fprMean: 0.95, count: 150 },
            { name: "Unverified", fprMean: 0.85, count: 50 },
          ],
        },
      ],
      score: 0.92,
    },
    {
      id: "3",
      name: "Dataset 3",
      categories: [
        {
          name: "Non-Fraud",
          fprMeanScore: 0.1,
          fprVarianceScore: 0.005,
          traits: [
            { name: "Verified", fprMean: 0.05, count: 300 },
          ],
        },
      ],
      score: 0.78,
    },
  ];
  
  
  // Mock callback functions
  const mockOnClose = jest.fn();
  const mockOnSelect = jest.fn();
  const mockOnNewDataset = jest.fn();
  
  describe("DatasetModal", () => {
    test("renders the modal with datasets", () => {
      render(
        <DatasetModal
          datasets={mockDatasets}
          onClose={mockOnClose}
          onSelect={mockOnSelect}
          onNewDataset={mockOnNewDataset}
        />
      );
  
      expect(screen.getByText("Choose Dataset")).toBeInTheDocument();
      mockDatasets.forEach((dataset) =>
        expect(screen.getByText(dataset.name)).toBeInTheDocument()
      );
    });

  test("handles selecting a dataset", () => {
    render(
      <DatasetModal
        datasets={mockDatasets}
        onClose={mockOnClose}
        onSelect={mockOnSelect}
        onNewDataset={mockOnNewDataset}
      />
    );

    const selectButton = screen.getByLabelText("Select dataset Dataset 1");
    fireEvent.click(selectButton);

    expect(mockOnSelect).toHaveBeenCalledWith(mockDatasets[0]);
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("handles creating a new dataset", () => {
    render(
      <DatasetModal
        datasets={mockDatasets}
        onClose={mockOnClose}
        onSelect={mockOnSelect}
        onNewDataset={mockOnNewDataset}
      />
    );

    const newDatasetButton = screen.getByLabelText("Create new dataset");
    fireEvent.click(newDatasetButton);

    expect(mockOnNewDataset).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("handles copying dataset link", () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(),
      },
    });

    render(
      <DatasetModal
        datasets={mockDatasets}
        onClose={mockOnClose}
        onSelect={mockOnSelect}
        onNewDataset={mockOnNewDataset}
      />
    );

    const copyLinkButton = screen.getByLabelText("Copy link for dataset Dataset 1");
    fireEvent.click(copyLinkButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      `${window.location.origin}/1`
    );
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("handles keyboard navigation (Tab and Shift+Tab)", () => {
    render(
      <DatasetModal
        datasets={mockDatasets}
        onClose={mockOnClose}
        onSelect={mockOnSelect}
        onNewDataset={mockOnNewDataset}
      />
    );

    const firstButton = screen.getByLabelText("Select dataset Dataset 1");
    const lastButton = screen.getByLabelText("Create new dataset");

    firstButton.focus();
    expect(document.activeElement).toBe(firstButton);

    fireEvent.keyDown(document, { key: "Tab" });
    expect(document.activeElement).toBe(lastButton);

    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(firstButton);
  });

  test("closes the modal on Escape key press", () => {
    render(
      <DatasetModal
        datasets={mockDatasets}
        onClose={mockOnClose}
        onSelect={mockOnSelect}
        onNewDataset={mockOnNewDataset}
      />
    );

    fireEvent.keyDown(document, { key: "Escape" });
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("renders properly with an empty dataset", () => {
    render(
      <DatasetModal
        datasets={[]}
        onClose={mockOnClose}
        onSelect={mockOnSelect}
        onNewDataset={mockOnNewDataset}
      />
    );

    expect(screen.getByText("Choose Dataset")).toBeInTheDocument();
    expect(screen.queryByLabelText("Select dataset")).not.toBeInTheDocument();
  });
});
