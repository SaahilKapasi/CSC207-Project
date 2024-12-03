import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../components/Navbar";
import { Dataset } from "../types/types";

describe("Navbar Component", () => {
  const mockOnSelectDataset = jest.fn();
  const mockOnNewDataset = jest.fn();
  const mockOnNewCompare = jest.fn();
  const mockOnLanding = jest.fn();

  const mockDatasets: Dataset[] = [
    { id: "1", name: "Dataset One", categories: [], score: 0.8, description: "Description 1" },
    { id: "2", name: "Dataset Two", categories: [], score: 0.9, description: "Description 2" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the navbar with datasets and buttons", () => {
    render(
      <Navbar
        onSelectDataset={mockOnSelectDataset}
        onNewDataset={mockOnNewDataset}
        onNewCompare={mockOnNewCompare}
        onLanding={mockOnLanding}
        selectedDataset={undefined}
        selectedPage="landing"
        datasets={mockDatasets}
      />
    );

    expect(screen.getByAltText("Cash App Logo")).toBeInTheDocument();
    expect(screen.getByText("Cash App")).toBeInTheDocument();

    expect(screen.getByText("Dataset One")).toBeInTheDocument();
    expect(screen.getByText("Dataset Two")).toBeInTheDocument();

    expect(screen.getByText("Compare")).toBeInTheDocument();
    expect(screen.getByText("+")).toBeInTheDocument();

    expect(screen.getByText("Bias Visualizer")).toBeInTheDocument();
  });

  test("calls onSelectDataset when a dataset button is clicked", () => {
    render(
      <Navbar
        onSelectDataset={mockOnSelectDataset}
        onNewDataset={mockOnNewDataset}
        onNewCompare={mockOnNewCompare}
        onLanding={mockOnLanding}
        selectedDataset={undefined}
        selectedPage="landing"
        datasets={mockDatasets}
      />
    );

    const datasetOneButton = screen.getByText("Dataset One");
    fireEvent.click(datasetOneButton);

    expect(mockOnSelectDataset).toHaveBeenCalledWith(mockDatasets[0]);
  });

  test("calls onNewCompare when the Compare button is clicked", () => {
    render(
      <Navbar
        onSelectDataset={mockOnSelectDataset}
        onNewDataset={mockOnNewDataset}
        onNewCompare={mockOnNewCompare}
        onLanding={mockOnLanding}
        selectedDataset={undefined}
        selectedPage="landing"
        datasets={mockDatasets}
      />
    );

    const compareButton = screen.getByText("Compare");
    fireEvent.click(compareButton);

    expect(mockOnNewCompare).toHaveBeenCalledTimes(1);
  });

  test("calls onNewDataset when the + button is clicked", () => {
    render(
      <Navbar
        onSelectDataset={mockOnSelectDataset}
        onNewDataset={mockOnNewDataset}
        onNewCompare={mockOnNewCompare}
        onLanding={mockOnLanding}
        selectedDataset={undefined}
        selectedPage="landing"
        datasets={mockDatasets}
      />
    );

    const newDatasetButton = screen.getByText("+");
    fireEvent.click(newDatasetButton);

    expect(mockOnNewDataset).toHaveBeenCalledTimes(1);
  });

  test("calls onLanding when the logo is clicked or activated with keyboard", () => {
    render(
      <Navbar
        onSelectDataset={mockOnSelectDataset}
        onNewDataset={mockOnNewDataset}
        onNewCompare={mockOnNewCompare}
        onLanding={mockOnLanding}
        selectedDataset={undefined}
        selectedPage="landing"
        datasets={mockDatasets}
      />
    );

    const logo = screen.getByText("Cash App");

    fireEvent.click(logo);
    expect(mockOnLanding).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(logo, { key: "Enter" });
    expect(mockOnLanding).toHaveBeenCalledTimes(2);

    fireEvent.keyDown(logo, { key: " " });
    expect(mockOnLanding).toHaveBeenCalledTimes(3);
  });

  test("indicates the selected page and dataset", () => {
    render(
      <Navbar
        onSelectDataset={mockOnSelectDataset}
        onNewDataset={mockOnNewDataset}
        onNewCompare={mockOnNewCompare}
        onLanding={mockOnLanding}
        selectedDataset={mockDatasets[0]} // Matches dataset One
        selectedPage="graph" // Matches graph condition
        datasets={mockDatasets}
      />
    );
  
    const datasetOneButton = screen.getByRole("button", { name: /Dataset One/i });
    expect(datasetOneButton).toHaveClass("border-slate-700");
  
    const compareButton = screen.getByRole("button", { name: /Compare/i });
    expect(compareButton).not.toHaveClass("border-slate-700");
  
    const newDatasetButton = screen.getByRole("button", { name: /\+/i });
    expect(newDatasetButton).not.toHaveClass("border-slate-700");
  });
  
});
