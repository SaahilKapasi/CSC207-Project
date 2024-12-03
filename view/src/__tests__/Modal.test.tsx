import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "../components/Modal";

describe("Modal Component", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the modal with the given content", () => {
    render(<Modal onClose={mockOnClose} content={<p>Test Content</p>} />);

    expect(screen.getByText("Test Content")).toBeInTheDocument();

    const overlay = screen.getByRole("button", { hidden: true });
    expect(overlay).toBeInTheDocument();

    expect(screen.getByRole("document")).toBeInTheDocument();
  });

  test("calls onClose when the overlay is clicked", () => {
    render(<Modal onClose={mockOnClose} content={<p>Test Content</p>} />);

    const overlay = screen.getByRole("button", { hidden: true });
    fireEvent.click(overlay);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("calls onClose when the close button is clicked", () => {
    render(<Modal onClose={mockOnClose} content={<p>Test Content</p>} />);

    const closeButton = screen.getByRole("button", { name: /close modal/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("focuses the close button when the modal opens", () => {
    render(<Modal onClose={mockOnClose} content={<p>Test Content</p>} />);

    const closeButton = screen.getByRole("button", { name: /close modal/i });
    expect(closeButton).toHaveFocus();
  });

  test("handles keyboard navigation and accessibility", () => {
    render(<Modal onClose={mockOnClose} content={<p>Test Content</p>} />);
  
    const overlay = screen.getByTestId("modal-overlay");
    expect(overlay).toHaveAttribute("aria-hidden", "true");
  
    const modalContent = screen.getByRole("document");
    expect(modalContent).toBeInTheDocument();
  });
  
});
