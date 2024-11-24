import { render, screen, fireEvent } from "@testing-library/react";
import DatasetModal from "../components/DatasetModal";

describe("DatasetModal Component", () => {
  const mockOnClose = jest.fn();
  const mockOnSelect = jest.fn();
  const mockOnNewDataset = jest.fn();

  const datasets = [
    {
      id: "1",
      name: "Dataset 1",
      categories: ["Category A", "Category B"],
      score: 85,
    },
    {
      id: "2",
      name: "Dataset 2",
      categories: ["Category C", "Category D"],
      score: 72,
    },
    {
      id: "3",
      name: "Dataset 3",
      categories: ["Category E", "Category F"],
      score: 90,
    },
  ];


  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the modal with datasets", () => {
    render(
      <DatasetModal
        datasets={datasets}
        onClose={mockOnClose}
        onSelect={mockOnSelect}
        onNewDataset={mockOnNewDataset}
      />
    );

    // Check modal title
    expect(screen.getByText("Choose Dataset")).toBeInTheDocument();

    // Check all dataset names are rendered
    datasets.forEach((dataset) => {
      expect(screen.getByText(dataset.name)).toBeInTheDocument();
    });
  });
});
