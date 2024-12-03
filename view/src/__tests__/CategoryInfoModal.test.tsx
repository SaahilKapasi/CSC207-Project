import { render, screen, fireEvent } from "@testing-library/react";
import SelectedCategoryModal from "../components/CategoryInfoModal";
import { Category } from "../types/types";

describe("SelectedCategoryModal Component", () => {
  const mockOnClose = jest.fn();

  const mockCategory: Category = {
    name: "fraud",
    fprScore: 2,
    traits: [
      { name: "age", fprMean: 0.7, count: 50 },
      { name: "gender", fprMean: 0.5, count: 40 },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the modal with correct content", () => {
    render(<SelectedCategoryModal category={mockCategory} onClose={mockOnClose} />);

    expect(screen.getByText("Fraud Bias Detected:")).toBeInTheDocument();

    expect(
      screen.getByLabelText("Bias value is 8.0 out of 10") // 10 - fprScore
    ).toBeInTheDocument();

    expect(screen.getByText(/The bias is calculated/i)).toBeInTheDocument();

    expect(screen.getByText("age")).toBeInTheDocument();
    expect(screen.getByText("gender")).toBeInTheDocument();
  });

  test("calls onClose when the modal is closed", () => {
    render(<SelectedCategoryModal category={mockCategory} onClose={mockOnClose} />);

    const closeButton = screen.getByRole("button", { name: /close modal/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("contains correct accessibility attributes", () => {
    render(<SelectedCategoryModal category={mockCategory} onClose={mockOnClose} />);

    const dialog = screen.getByRole("dialog");

    expect(dialog).toHaveAttribute("aria-labelledby", "modal-title");
    expect(dialog).toHaveAttribute("aria-describedby", "modal-description");
    expect(screen.getByText("Fraud Bias Detected:")).toHaveAttribute("id", "modal-title");
    expect(screen.getByText(/The bias is calculated/i)).toHaveAttribute("id", "modal-description");
  });
});
