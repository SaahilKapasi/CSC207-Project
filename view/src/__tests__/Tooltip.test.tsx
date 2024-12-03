import { render, screen } from "@testing-library/react";
import Tooltip from "../components/Tooltip";

describe("Tooltip Component", () => {
  const tooltipText = "This is a tooltip";

  test("renders the Tooltip component with the provided text", () => {
    render(<Tooltip text={tooltipText} />);

    // Ensure the tooltip container is present
    const tooltipElement = screen.getByRole("tooltip", { hidden: true });
    expect(tooltipElement).toBeInTheDocument();

    // Ensure the tooltip text is correctly set in the `data-tip` attribute
    expect(tooltipElement).toHaveAttribute("data-tip", tooltipText);
  });

  test("renders the tooltip icon", () => {
    render(<Tooltip text={tooltipText} />);

    // Ensure the icon is rendered
    const iconElement = screen.getByTestId("tooltip-icon");
    expect(iconElement).toBeInTheDocument();
  });

  test("tooltip is accessible for screen readers", () => {
    render(<Tooltip text={tooltipText} />);

    // Ensure the tooltip is accessible
    const tooltipElement = screen.getByRole("tooltip", { hidden: true });
    expect(tooltipElement).toHaveAttribute("aria-label", tooltipText);
  });
});
