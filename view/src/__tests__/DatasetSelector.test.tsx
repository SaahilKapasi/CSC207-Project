import { render, screen, fireEvent } from "@testing-library/react";
import DatasetSelector from "../components/DatasetSelector";
import { Dataset } from "../types/types";

describe("DatasetSelector Component", () => {
  const mockDatasets: Dataset[] = [
    { id: "1", name: "Dataset One", categories: [], score: 0.9, description: "Description 1" },
    { id: "2", name: "Dataset Two", categories: [], score: 0.7, description: "Description 2" },
  ];

  const setSelectedDatasetMock = jest.fn();

  test("renders label, dropdown, and description", () => {
    render(
      <DatasetSelector
        label="Select a Dataset"
        datasets={mockDatasets}
        selectedDataset={undefined}
        setSelectedDataset={setSelectedDatasetMock}
      />
    );
  
    const label = screen.getByText(/select a dataset/i, { selector: "label" });
    expect(label).toBeInTheDocument();

    const dropdown = screen.getByRole("combobox", { name: /select a dataset/i });
    expect(dropdown).toBeInTheDocument();
  
    const description = screen.getByText(/currently selected: none/i);
    expect(description).toBeInTheDocument();
  });
  

  test("displays options correctly", () => {
    render(
      <DatasetSelector
        label="Select a Dataset"
        datasets={mockDatasets}
        selectedDataset={undefined}
        setSelectedDataset={setSelectedDatasetMock}
      />
    );

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(mockDatasets.length + 1); // Includes the "Pick dataset" option

    // Check placeholder
    expect(options[0]).toHaveTextContent("Pick dataset");

    // Check datasets
    expect(options[1]).toHaveTextContent("Dataset One");
    expect(options[2]).toHaveTextContent("Dataset Two");
  });

  test("calls setSelectedDataset with the correct dataset", () => {
    render(
      <DatasetSelector
        label="Select a Dataset"
        datasets={mockDatasets}
        selectedDataset={undefined}
        setSelectedDataset={setSelectedDatasetMock}
      />
    );

    const dropdown = screen.getByRole("combobox", { name: /select a dataset/i });

    fireEvent.change(dropdown, { target: { value: "1" } });
    expect(setSelectedDatasetMock).toHaveBeenCalledWith(mockDatasets[0]);

    fireEvent.change(dropdown, { target: { value: "2" } });
    expect(setSelectedDatasetMock).toHaveBeenCalledWith(mockDatasets[1]);
  });

  test("updates description dynamically", () => {
    render(
      <DatasetSelector
        label="Select a Dataset"
        datasets={mockDatasets}
        selectedDataset={mockDatasets[0]}
        setSelectedDataset={setSelectedDatasetMock}
      />
    );

    const description = screen.getByText(/currently selected: dataset one/i);
    expect(description).toBeInTheDocument();
  });

  test("handles no datasets gracefully", () => {
    render(
      <DatasetSelector
        label="Select a Dataset"
        datasets={[]}
        selectedDataset={undefined}
        setSelectedDataset={setSelectedDatasetMock}
      />
    );
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(1); // Only the placeholder option
    expect(options[0]).toHaveTextContent("Pick dataset");
  });
});
