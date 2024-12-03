import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import CopyComparisonLinkButton from "../components/CopyComparisonLinkButton";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

// Mock API_BASE_URL directly, otherwise won't run
jest.mock("../consts/consts", () => ({
  API_BASE_URL: "http://mock-api-url.com",
}));

describe("CopyComparisonLinkButton Component", () => {
  const mockDataset1 = { id: "1", name: "Dataset 1", categories: [], score: 0.85, description: "" };
  const mockDataset2 = { id: "2", name: "Dataset 2", categories: [], score: 0.65, description: "" };

  test("handles click and copies the correct link to clipboard", async () => {
    const mockResponse = { data: "comparison123" };
    mockedAxios.post.mockResolvedValueOnce(mockResponse);

    render(
      <CopyComparisonLinkButton
        selectedDataset1={mockDataset1}
        selectedDataset2={mockDataset2}
      />
    );

    const button = screen.getByRole("button", { name: /copy comparison link/i });
    fireEvent.click(button);

    expect(mockedAxios.post).toHaveBeenCalledWith("http://mock-api-url.com/api/saveComparison", {
      data: JSON.stringify({
        dataset1: mockDataset1,
        dataset2: mockDataset2,
      }),
    });

    // wait for async function to complete
    await screen.findByText(/copy link/i);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      `${window.location.origin}/#comparison123`
    );
  });
});
