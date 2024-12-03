// Mock modules before importing them
jest.mock("axios");
jest.mock("../consts/consts", () => ({
  API_BASE_URL: "http://mock-api-url.com",
}));

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WelcomePage from "../pages/WelcomePage";
import axios from "axios";
import { Dataset } from "../types/types";

const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockResponseData: Dataset = {
  id: "1",
  name: "Mock Dataset",
  categories: [
    { name: "Category A", fprScore: 4.5, traits: [] },
    { name: "Category B", fprScore: 6.0, traits: [] },
  ],
  score: 5.5,
  description: "This is a mock dataset description.",
};

describe("WelcomePage Component", () => {
  let mockOnDataset: jest.Mock;
  let mockOnSubmit: jest.Mock;

  beforeEach(() => {
    mockOnDataset = jest.fn();
    mockOnSubmit = jest.fn();
    jest.clearAllMocks();
  });

  test("renders the WelcomePage with all key components", () => {
    render(<WelcomePage onDataset={mockOnDataset} onSubmit={mockOnSubmit} />);

    expect(screen.getByText("Import Data Set")).toBeInTheDocument();

    expect(screen.getByText("CHOOSE FILE")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();

    expect(screen.getByRole("status", { hidden: true })).toBeInTheDocument();
  });

  test("handles successful file upload and dataset generation", async () => {
    const user = userEvent.setup();
    const mockFile = new File(["dummy content"], "test.csv", { type: "text/csv" });
    mockedAxios.post.mockResolvedValueOnce({ data: mockResponseData });
  
    const { container } = render(<WelcomePage onDataset={mockOnDataset} onSubmit={mockOnSubmit} />);
  
    const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
  
    expect(fileInput).toBeInTheDocument();
  
    fireEvent.change(fileInput, { target: { files: [mockFile] } });
  
    await waitFor(() => {
      expect(fileInput.files?.[0]).toEqual(mockFile);
    });
  
    const submitButton = screen.getByText("Submit");
    await user.click(submitButton);
  
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  
    await waitFor(() => {
      expect(mockOnDataset).toHaveBeenCalledWith(mockResponseData);
    });
  
    expect(screen.getByRole("status", { hidden: true })).toHaveTextContent("File uploaded successfully.");
  });

  test("handles file upload failure", async () => {
    const user = userEvent.setup();
    const mockFile = new File(["dummy content"], "test.csv", { type: "text/csv" });
    mockedAxios.post.mockRejectedValueOnce(new Error("Upload failed"));
  
    const { container } = render(<WelcomePage onDataset={mockOnDataset} onSubmit={mockOnSubmit} />);
  
    const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
  
    expect(fileInput).toBeInTheDocument();
  
    fireEvent.change(fileInput, { target: { files: [mockFile] } });
  
    await waitFor(() => {
      expect(fileInput.files?.[0]).toEqual(mockFile);
    });

    const submitButton = screen.getByText("Submit");
    await user.click(submitButton);
  
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(mockOnDataset).not.toHaveBeenCalled();
      expect(screen.getByRole("status", { hidden: true })).toHaveTextContent(
        "File upload failed. Please try again."
      );
    });
  });

  test("does not submit without a file", async () => {
    const user = userEvent.setup();
    render(<WelcomePage onDataset={mockOnDataset} onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByText("Submit");
    await user.click(submitButton);

    expect(mockOnSubmit).not.toHaveBeenCalled();
    expect(mockOnDataset).not.toHaveBeenCalled();
  });
});
