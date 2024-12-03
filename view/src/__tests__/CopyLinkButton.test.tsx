import { render, screen, fireEvent } from "@testing-library/react";
import CopyLinkButton from "../components/CopyLinkButton";

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

describe("CopyLinkButton Component", () => {
  const datasetId = "12345";

  test("renders the button with correct label and styling", () => {
    render(<CopyLinkButton datasetId={datasetId} />);

    const button = screen.getByRole("button", { name: /copy link to this dataset/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("btn");
  });

  test("copies the correct link to the clipboard when clicked", () => {
    render(<CopyLinkButton datasetId={datasetId} />);

    const button = screen.getByRole("button", { name: /copy link to this dataset/i });
    fireEvent.click(button);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      `${window.location.origin}/#${datasetId}`
    );
  });

  test("handles different dataset IDs correctly", () => {
    const newDatasetId = "67890";
    render(<CopyLinkButton datasetId={newDatasetId} />);

    const button = screen.getByRole("button", { name: /copy link to this dataset/i });
    fireEvent.click(button);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      `${window.location.origin}/#${newDatasetId}`
    );
  });
});
