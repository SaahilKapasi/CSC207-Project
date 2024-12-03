import { render, screen } from "@testing-library/react";
import BiasDifferenceDisplay from "../components/BiasDifferenceDisplay";
import { Dataset } from "../types/types";

describe("BiasDifferenceDisplay - Green Text for Decreased Bias", () => {
  const mockDataset1: Dataset = { id: "1", name: "Dataset 1", categories: [], score: 2, description: "" };
  const mockDataset2: Dataset = { id: "2", name: "Dataset 2", categories: [], score: 5, description: "" };

  it("renders with the correct class for green text when the bias difference is negative", () => {
    render(
      <BiasDifferenceDisplay
        difference={-3.4}
        dataset1={mockDataset1}
        dataset2={mockDataset2}
      />
    );

    const textElement = screen.getByText(/decreased by 3.4\/10/i);
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveClass("text-green-500");
  });

  it("renders with the correct class for green text when the bias difference is zero", () => {
    render(
      <BiasDifferenceDisplay
        difference={0}
        dataset1={mockDataset1}
        dataset2={mockDataset2}
      />
    );

    const textElement = screen.getByText(/increased by 0.0\/10/i);
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveClass("text-yellow-500");
  });

  it("renders with the correct class for green text when the bias difference is zero", () => {
    render(
      <BiasDifferenceDisplay
        difference={3}
        dataset1={mockDataset1}
        dataset2={mockDataset2}
      />
    );

    const textElement = screen.getByText(/increased by 3.0\/10/i);
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveClass("text-red-500");
  });
});
