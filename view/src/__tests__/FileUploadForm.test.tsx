import { render, screen, fireEvent } from "@testing-library/react";
import FileUploadForm from "../components/FileUploadForm";
import userEvent from "@testing-library/user-event";

describe("FileUploadForm Component", () => {
  const mockSetFile = jest.fn();
  const mockOnSubmit = jest.fn();

  const mockFile = new File(["sample content"], "sample.txt", {
    type: "text/plain",
  });

  test("renders all elements correctly", () => {
    render(
      <FileUploadForm file={null} setFile={mockSetFile} onSubmit={mockOnSubmit} />
    );
  
    const label = screen.getByLabelText(/choose a file to upload/i);
    expect(label).toBeInTheDocument();
  
    const fileSpan = screen.getByText(/no file selected/i);
    expect(fileSpan).toBeInTheDocument();
  
    const submitButton = screen.getByRole("button", { name: /submit/i });
    expect(submitButton).toBeInTheDocument();
  });

  test("handles file selection", async () => {
  render(
    <FileUploadForm file={null} setFile={mockSetFile} onSubmit={mockOnSubmit} />
  );

  const fileInput = screen.getByLabelText(/choose a file to upload/i);

  const mockFile = new File(["sample content"], "sample.txt", {
    type: "text/plain",
  });

  await userEvent.upload(fileInput, mockFile);

  expect(mockSetFile).toHaveBeenCalledWith(mockFile);
  expect(mockSetFile).toHaveBeenCalledTimes(1);
});
  
  test("displays the selected file name", () => {
    render(
      <FileUploadForm file={mockFile} setFile={mockSetFile} onSubmit={mockOnSubmit} />
    );

    // Check that the file name is displayed
    const fileSpan = screen.getByText(/sample.txt/i);
    expect(fileSpan).toBeInTheDocument();
  });

  test("handles form submission with a selected file", () => {
    render(
      <FileUploadForm file={mockFile} setFile={mockSetFile} onSubmit={mockOnSubmit} />
    );

    const submitButton = screen.getByRole("button", { name: /submit/i });

    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith(mockFile);
  });  
});
