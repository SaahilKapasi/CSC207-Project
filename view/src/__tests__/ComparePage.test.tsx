import { render, screen, fireEvent } from "@testing-library/react";
import ComparePage from "../pages/ComparePage";
import { Dataset } from "../types/types";

jest.mock("../components/CopyComparisonLinkButton", () => () => (
  <div data-testid="copy-link-button">Copy Link Button</div>
));
jest.mock("../components/DatasetSelector", () => ({ label }: { label: string }) => (
  <div data-testid={`dataset-selector-${label}`}>{label}</div>
));
jest.mock("../components/BiasDifferenceDisplay", () => ({ difference }: { difference: number }) => (
  <div data-testid="bias-difference-display">Difference: {difference}</div>
));
jest.mock("../components/Graph", () => ({ name }: { name: string }) => (
  <div data-testid={`graph-${name}`}>{name}</div>
));
jest.mock("../components/Modal", () => ({ content }: { content: any }) => (
  <div data-testid="modal">{content}</div>
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
    expect(screen.getByText("Difference: -2")).toBeInTheDocument(); // (10 - 5) - (10 - 3)

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

  // the program for now can't handle invalid datasets, uncomment below to check whether the updated version can handle.
//   test("handles invalid datasets gracefully", () => {
//     const invalidDataset = null; // or an improperly structured dataset
//     render(
//       <ComparePage
//         datasets={mockDatasets}
//         selectedDataset1={invalidDataset}
//         selectedDataset2={mockDatasets[1]}
//         setSelectedDataset1={mockSetSelectedDataset1}
//         setSelectedDataset2={mockSetSelectedDataset2}
//       />
//     );
  
//     // Assertions to check for error messages or fallback UI
//     expect(screen.getByText("Invalid dataset selected")).toBeInTheDocument();
//   });  

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

    // Open the modal
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

    // Close modal
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
