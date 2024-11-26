import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SettingModal from "../components/SettingModal";
import { Category } from "../types/types";

// Mock categories
const mockCategories: Category[] = [
  {
    name: "Category 1",
    fprMeanScore: 2.5,
    fprVarianceScore: 1.2,
    traits: [],
  },
  {
    name: "Category 2",
    fprMeanScore: 5.0,
    fprVarianceScore: 4.0,
    traits: [],
  },
  {
    name: "Category 3",
    fprMeanScore: 8.5,
    fprVarianceScore: 7.0,
    traits: [],
  },
];

// Mock callback functions
const mockOnClose = jest.fn();
const mockOnSelect = jest.fn();

describe("SettingModal", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls between tests
  });

  test("renders the modal with categories", () => {
    render(
      <SettingModal
        categories={mockCategories}
        onClose={mockOnClose}
        onSelect={mockOnSelect}
      />
    );

    // Modal title
    expect(screen.getByText("Choose X-Axis")).toBeInTheDocument();

    // Categories
    mockCategories.forEach((category) => {
      expect(screen.getByText(category.name)).toBeInTheDocument();
    });

    // Close button
    expect(screen.getByRole("button", { name: "Close settings modal" })).toBeInTheDocument();
  });

  test("handles selecting a category", () => {
    render(
      <SettingModal
        categories={mockCategories}
        onClose={mockOnClose}
        onSelect={mockOnSelect}
      />
    );

    // Select a category
    const categoryButton = screen.getByLabelText("Select Category 1 category");
    fireEvent.click(categoryButton);

    // Verify callback execution
    expect(mockOnSelect).toHaveBeenCalledWith(mockCategories[0]);
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("handles closing the modal", () => {
    render(
      <SettingModal
        categories={mockCategories}
        onClose={mockOnClose}
        onSelect={mockOnSelect}
      />
    );

    // Click close button
    const closeButton = screen.getByRole("button", { name: "Close settings modal" });
    fireEvent.click(closeButton);

    // Verify callback execution
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("renders warning text based on score", () => {
    render(
      <SettingModal
        categories={mockCategories}
        onClose={mockOnClose}
        onSelect={mockOnSelect}
      />
    );
  
    const category1Warning = screen.getByText("❗❗");
    const category2Warning = screen.getByText("❗");
    const category3Warning = screen.queryByTestId("category3-warning");
  
    expect(category1Warning).toBeInTheDocument();
    expect(category2Warning).toBeInTheDocument();
    expect(category3Warning).toBeNull(); // Update to reflect expected absence
  });
  
});
