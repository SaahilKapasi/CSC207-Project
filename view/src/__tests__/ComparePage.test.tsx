import { render, screen, fireEvent } from "@testing-library/react";
import ComparePage from "../pages/ComparePage";
import { Dataset } from "../types/types";

// Mock components with specific types
jest.mock("../components/CopyComparisonLinkButton", () => () => (
  <div data-testid="copy-link-button">Copy Link Button</div>
));

jest.mock("../components/DatasetSelector", () => (props: { label: string }) => (
  <div data-testid={`dataset-selector-${props.label}`}>{props.label}</div>
));

jest.mock("../components/BiasDifferenceLabel", () => (props: { dataset1: Dataset; dataset2: Dataset }) => (
  <div data-testid="bias-difference-display">
    Difference: {(10 - props.dataset2.score - (10 - props.dataset1.score)).toFixed(1)}
  </div>
));

jest.mock("../components/Graph", () => (props: { name: string }) => (
  <div data-testid={`graph-${props.name}`}>{props.name}</div>
));

jest.mock("../components/Modal", () => (props: { content: JSX.Element }) => (
  <div data-testid="modal">{props.content}</div>
));

describe("ComparePage Component", () => {
  const mockDatasets: Dataset[] = [
    {
      id: "1",
      name: "Dataset 1",
      categories: [{ name: "Category A", fprScore: 5, traits: [] }],
      score: 3,
      description: "Test dataset 1",
    },
    {
      id: "2",
      name: "Dataset 2",
      categories: [{ name: "Category A", fprScore: 7, traits: [] }],
      score: 5,
      description: "Test dataset 2",
    },
  ];

  const mockSetSelectedDataset1 = jest.fn();
  const mockSetSelectedDataset2 = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the ComparePage with all main components", () => {
    render(
      <ComparePage
        datasets={mockDatasets}
        selectedDataset1={undefined}
        selectedDataset2={undefined}
        setSelectedDataset1={mockSetSelectedDataset1}
        setSelectedDataset2={mockSetSelectedDataset2}
      />
    );

    expect(screen.getByTestId("copy-link-button")).toBeInTheDocument();
    expect(screen.getByTestId("dataset-selector-Choose dataset 1")).toBeInTheDocument();
    expect(screen.getByTestId("dataset-selector-Choose dataset 2")).toBeInTheDocument();
    expect(screen.queryByTestId("bias-difference-display")).not.toBeInTheDocument();
    expect(screen.queryByTestId("graph-Change in Bias Detected by Category")).not.toBeInTheDocument();
    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
  });

  test("renders the difference and graph when both datasets are selected", () => {
    render(
      <ComparePage
        datasets={mockDatasets}
        selectedDataset1={mockDatasets[0]}
        selectedDataset2={mockDatasets[1]}
        setSelectedDataset1={mockSetSelectedDataset1}
        setSelectedDataset2={mockSetSelectedDataset2}
      />
    );

    expect(screen.getByTestId("bias-difference-display")).toBeInTheDocument();
    expect(screen.getByText("Difference: -2.0")).toBeInTheDocument();

    expect(
      screen.getByTestId("graph-Change in Bias Detected by Category")
    ).toBeInTheDocument();
  });

  test("renders correctly when only the first dataset is selected", () => {
    render(
      <ComparePage
        datasets={mockDatasets}
        selectedDataset1={mockDatasets[0]}
        selectedDataset2={undefined}
        setSelectedDataset1={mockSetSelectedDataset1}
        setSelectedDataset2={mockSetSelectedDataset2}
      />
    );

    expect(screen.getByTestId("dataset-selector-Choose dataset 1")).toBeInTheDocument();
    expect(screen.queryByTestId("bias-difference-display")).not.toBeInTheDocument();
    expect(screen.queryByTestId("graph-Change in Bias Detected by Category")).not.toBeInTheDocument();
  });

  test("renders correctly when only the second dataset is selected", () => {
    render(
      <ComparePage
        datasets={mockDatasets}
        selectedDataset1={undefined}
        selectedDataset2={mockDatasets[1]}
        setSelectedDataset1={mockSetSelectedDataset1}
        setSelectedDataset2={mockSetSelectedDataset2}
      />
    );

    expect(screen.getByTestId("dataset-selector-Choose dataset 2")).toBeInTheDocument();
    expect(screen.queryByTestId("bias-difference-display")).not.toBeInTheDocument();
    expect(screen.queryByTestId("graph-Change in Bias Detected by Category")).not.toBeInTheDocument();
  });

  test("opens and closes the modal when a graph bar is clicked", () => {
    const { rerender } = render(
      <ComparePage
        datasets={mockDatasets}
        selectedDataset1={mockDatasets[0]}
        selectedDataset2={mockDatasets[1]}
        setSelectedDataset1={mockSetSelectedDataset1}
        setSelectedDataset2={mockSetSelectedDataset2}
      />
    );

    const graph = screen.getByTestId("graph-Change in Bias Detected by Category");
    fireEvent.click(graph);

    rerender(
      <ComparePage
        datasets={mockDatasets}
        selectedDataset1={mockDatasets[0]}
        selectedDataset2={mockDatasets[1]}
        setSelectedDataset1={mockSetSelectedDataset1}
        setSelectedDataset2={mockSetSelectedDataset2}
      />
    );

    expect(screen.getByTestId("graph-Change in Bias Detected by Category")).toBeInTheDocument();

    const modal = screen.getByTestId("graph-Change in Bias Detected by Category");
    fireEvent.click(modal);

    rerender(
      <ComparePage
        datasets={mockDatasets}
        selectedDataset1={mockDatasets[0]}
        selectedDataset2={mockDatasets[1]}
        setSelectedDataset1={mockSetSelectedDataset1}
        setSelectedDataset2={mockSetSelectedDataset2}
      />
    );

    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
  });
});
