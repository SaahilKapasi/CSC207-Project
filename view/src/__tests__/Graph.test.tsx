import { render, screen, fireEvent } from "@testing-library/react";
import Graph from "../components/Graph";

describe("Graph Component", () => {
  const mockOnBarClick = jest.fn();
  const mockGetColor = jest.fn((value) => (value > 0 ? "green-500" : "red-500"));

  const mockEntries = [
    { name: "A", value: 10 },
    { name: "B", value: -5 },
    { name: "C", value: 0 },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly with required props", () => {
    render(
      <Graph
        name="Test Graph"
        maxValue={10}
        entries={mockEntries}
        maxValueLabel="Max"
        zeroValueLabel="Zero"
        getColor={mockGetColor}
      />
    );

    // Check graph title
    expect(screen.getByText("Test Graph")).toBeInTheDocument();

    // Check labels
    expect(screen.getByText("Max")).toBeInTheDocument();
    expect(screen.getByText("Zero")).toBeInTheDocument();
    expect(screen.getAllByText("A")).toHaveLength(1);
    expect(screen.getAllByText("B")).toHaveLength(1);
    expect(screen.getAllByText("C")).toHaveLength(1);
  });

  test("calls onBarClick when a bar is clicked", () => {
    render(
      <Graph
        name="Clickable Graph"
        maxValue={10}
        entries={mockEntries}
        maxValueLabel="Max"
        zeroValueLabel="Zero"
        getColor={mockGetColor}
        onBarClick={mockOnBarClick}
      />
    );

    const barA = screen.getByLabelText("Bar A, value 10");
    fireEvent.click(barA);
    expect(mockOnBarClick).toHaveBeenCalledWith("A");

    const barB = screen.getByLabelText("Bar B, value -5");
    fireEvent.click(barB);
    expect(mockOnBarClick).toHaveBeenCalledWith("B");
  });

  test("supports keyboard navigation and activation", () => {
    render(
      <Graph
        name="Keyboard Graph"
        maxValue={10}
        entries={mockEntries}
        maxValueLabel="Max"
        zeroValueLabel="Zero"
        getColor={mockGetColor}
        onBarClick={mockOnBarClick}
        keyboardNavigationEnabled={true}
      />
    );

    const barA = screen.getByLabelText("Bar A, value 10");
    fireEvent.keyDown(barA, { key: "Enter" });
    expect(mockOnBarClick).toHaveBeenCalledWith("A");

    const barB = screen.getByLabelText("Bar B, value -5");
    fireEvent.keyDown(barB, { key: " " }); // Space key
    expect(mockOnBarClick).toHaveBeenCalledWith("B");
  });

  test("renders bars with correct styles and colors", () => {
    render(
      <Graph
        name="Styled Graph"
        maxValue={10}
        entries={mockEntries}
        maxValueLabel="Max"
        zeroValueLabel="Zero"
        getColor={mockGetColor}
      />
    );

    const barA = screen.getByLabelText("Bar A, value 10");
    const barB = screen.getByLabelText("Bar B, value -5");

    // Check styles for bar heights
    expect(barA.firstChild).toHaveStyle("height: 100%"); // 10/10 = 100%
    expect(barB.firstChild).toHaveStyle("height: 50%"); // 5/10 = 50%

    // Check bar colors
    expect(barA.firstChild).toHaveClass("bg-green-500");
    expect(barB.firstChild).toHaveClass("bg-red-500");
  });

  test("renders negative value axis when minValue < 0", () => {
    render(
      <Graph
        name="Negative Graph"
        maxValue={10}
        minValue={-10}
        entries={mockEntries}
        maxValueLabel="Max"
        zeroValueLabel="Zero"
        minValueLabel="Min"
        getColor={mockGetColor}
      />
    );

    expect(screen.getByText("Min")).toBeInTheDocument();
    expect(screen.getByText("Zero")).toBeInTheDocument();
  });

  test("disables keyboard navigation when keyboardNavigationEnabled is false", () => {
    render(
      <Graph
        name="Non-Navigable Graph"
        maxValue={10}
        entries={mockEntries}
        maxValueLabel="Max"
        zeroValueLabel="Zero"
        getColor={mockGetColor}
        keyboardNavigationEnabled={false}
      />
    );

    const barA = screen.getByLabelText("Bar A, value 10");
    expect(barA).not.toHaveAttribute("tabindex");
    expect(barA).not.toHaveAttribute("role");
  });
});
