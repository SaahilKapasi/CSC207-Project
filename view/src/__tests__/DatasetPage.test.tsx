import { render, screen, fireEvent } from "@testing-library/react";
import DatasetPage from "../pages/DatasetPage";
import { Dataset, Category } from "../types/types";

// Mock subcomponents
jest.mock("../components/CopyLinkButton", () => ({ datasetId }: { datasetId: string }) => (
  <div data-testid="copy-link-button">Copy Link for {datasetId}</div>
));

jest.mock("../components/Graph", () => {
  return function MockGraph({
    name,
    onBarClick,
  }: {
    name: string;
    onBarClick: (category: string) => void;
  }) {
    return (
      <div data-testid="graph">
        {name}
        <button onClick={() => onBarClick("Category A")}>Bar: Category A</button>
        <button onClick={() => onBarClick("Category B")}>Bar: Category B</button>
      </div>
    );
  };
});

jest.mock("../components/BiasProgressBar", () => ({ bias }: { bias: number }) => (
  <div data-testid="bias-progress-bar">Bias Score: {bias}</div>
));

jest.mock("../components/CategoryInfoModal", () => ({
  category,
  onClose,
}: {
  category: Category;
  onClose: () => void;
}) => (
  <div data-testid="modal">
    Modal for {category.name}
    <button onClick={onClose}>Close Modal</button>
  </div>
));

describe("DatasetPage Component", () => {
  const mockDataset: Dataset = {
    id: "1",
    name: "Test Dataset",
    categories: [
      { name: "Category A", fprScore: 5, traits: [] },
      { name: "Category B", fprScore: 7, traits: [] },
    ],
    score: 6,
    description: "This is a test dataset.",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the dataset page with key components", () => {
    render(<DatasetPage dataset={mockDataset} />);

    expect(screen.getByTestId("copy-link-button")).toHaveTextContent("Copy Link for 1");
    expect(screen.getByTestId("bias-progress-bar")).toHaveTextContent("Bias Score: 4");
    expect(screen.getByText("This is a test dataset.")).toBeInTheDocument();
    expect(screen.getByTestId("graph")).toHaveTextContent("Bias Detected by Category");
  });

  test("renders BiasProgressBar correctly at minimum bias score", () => {
    const datasetWithMinBias = { ...mockDataset, score: 0 };
    render(<DatasetPage dataset={datasetWithMinBias} />);

    expect(screen.getByTestId("bias-progress-bar")).toHaveTextContent("Bias Score: 10");
  });

  test("renders BiasProgressBar correctly at maximum bias score", () => {
    const datasetWithMaxBias = { ...mockDataset, score: 10 };
    render(<DatasetPage dataset={datasetWithMaxBias} />);

    expect(screen.getByTestId("bias-progress-bar")).toHaveTextContent("Bias Score: 0");
  });

  test("opens the modal when a graph bar is clicked", () => {
    render(<DatasetPage dataset={mockDataset} />);

    const barButton = screen.getByText("Bar: Category A");
    fireEvent.click(barButton);
    expect(screen.getByTestId("modal")).toHaveTextContent("Modal for Category A");
  });

  test("opens modal with correct category data when different graph bars are clicked", () => {
    render(<DatasetPage dataset={mockDataset} />);

    const barButtonB = screen.getByText("Bar: Category B");
    fireEvent.click(barButtonB);

    expect(screen.getByTestId("modal")).toHaveTextContent("Modal for Category B");
  });

  test("closes the modal when the close button is clicked", () => {
    const { rerender } = render(<DatasetPage dataset={mockDataset} />);

    const barButton = screen.getByText("Bar: Category A");
    fireEvent.click(barButton);
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    const closeButton = screen.getByText("Close Modal");
    fireEvent.click(closeButton);

    rerender(<DatasetPage dataset={mockDataset} />);
    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
  });

  test("does not render the modal initially", () => {
    render(<DatasetPage dataset={mockDataset} />);

    // Modal shouldn't be in the document initially
    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
  });
});
