import { render, screen, fireEvent } from "@testing-library/react";
import { Category } from "../types/types";
import SettingModal from "../components/SettingModal";
import '@testing-library/jest-dom';

describe("SettingModal", () => {
  const mockOnClose = jest.fn();
  const mockOnSelect = jest.fn();
  const categories = [
  {
    name: "Category 1",
    fprVarianceScore: 2,
    fprMeanScore: 3,
    traits: [
      { name: "Trait 1", fprMean: 1.5, count: 10 },
      { name: "Trait 2", fprMean: 2.5, count: 20 },
    ],
  },
  {
    name: "Category 2",
    fprVarianceScore: 5,
    fprMeanScore: 6,
    traits: [
      { name: "Trait 3", fprMean: 4.5, count: 15 },
      { name: "Trait 4", fprMean: 5.5, count: 25 },
    ],
  },
  {
    name: "Category 3",
    fprVarianceScore: 8,
    fprMeanScore: 9,
    traits: [
      { name: "Trait 5", fprMean: 8.5, count: 30 },
    ],
  },
];


  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the modal with categories", () => {
    render(
      <SettingModal
        categories={categories}
        onClose={mockOnClose}
        onSelect={mockOnSelect}
      />
    );

    // Check if modal title is rendered
    expect(screen.getByText("Choose X-Axis")).toBeInTheDocument();

    // Check if categories are rendered
    categories.forEach((category) => {
      expect(screen.getByText(category.name)).toBeInTheDocument();
    });
  });

  it("calls onSelect and onClose when a category button is clicked", () => {
    render(
      <SettingModal
        categories={categories}
        onClose={mockOnClose}
        onSelect={mockOnSelect}
      />
    );

    // Click the first category button
    const categoryButton = screen.getByText("Category 1");
    fireEvent.click(categoryButton);

    // Verify that onSelect is called with the correct category
    expect(mockOnSelect).toHaveBeenCalledWith(categories[0]);

    // Verify that onClose is called
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("calls onClose when the background overlay is clicked", () => {
    render(
      <SettingModal
        categories={categories}
        onClose={mockOnClose}
        onSelect={mockOnSelect}
      />
    );

    // Click the background overlay
    const overlay = screen.getByRole("button", { name: "" }); // Using an accessible role for the overlay
    fireEvent.click(overlay);

    // Verify that onClose is called
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("renders the correct warning text for categories", () => {
    render(
      <SettingModal
        categories={categories}
        onClose={mockOnClose}
        onSelect={mockOnSelect}
      />
    );

    // Check the warning texts
    expect(screen.getByText("❗❗")).toBeInTheDocument(); // Category 1
    expect(screen.getByText("❗")).toBeInTheDocument();  // Category 2
    expect(screen.queryByText("")).not.toBeNull();      // Category 3
  });
});

