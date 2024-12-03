import { render, screen } from "@testing-library/react";
import BiasDifferenceLabel from "../components/BiasDifferenceLabel";
import { Dataset } from "../types/types";

describe("BiasDifferenceLabel - Green Text for Decreased Bias", () => {
  const mockDataset1: Dataset = {
    id: "1",
    name: "Dataset 1",
    categories: [],
    score: 2,
    description: "",
  };
  const mockDataset2: Dataset = {
    id: "2",
    name: "Dataset 2",
    categories: [],
    score: 5,
    description: "",
  };

  it("renders with green text when bias decreases", () => {
    render(<BiasDifferenceLabel dataset1={mockDataset1} dataset2={mockDataset2} />);

    const textElement = screen.getByText(/decreased by 3.0\/10/i);
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveClass("text-green-500");
  });

  it("renders with yellow text when there is no change in bias", () => {
    render(
      <BiasDifferenceLabel
        dataset1={{ ...mockDataset1, score: 5 }}
        dataset2={mockDataset2}
      />
    );

    const textElement = screen.getByText(/increased by 0.0\/10/i);
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveClass("text-yellow-500");
  });

  it("renders with red text when bias increases", () => {
    render(<BiasDifferenceLabel dataset1={mockDataset2} dataset2={mockDataset1} />);

    const textElement = screen.getByText(/increased by 3.0\/10/i);
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveClass("text-red-500");
  });
});
