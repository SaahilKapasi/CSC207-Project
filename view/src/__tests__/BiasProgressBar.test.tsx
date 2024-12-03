import { render, screen } from "@testing-library/react";
import BiasProgressBar from "../components/BiasProgressBar";
import { getColorByScore } from "../utils/score";
// @ts-ignore

describe("BiasProgressBar Component", () => {
  test("renders progress bar with correct aria attributes and bias value", () => {
    render(<BiasProgressBar bias={5.5} />);

    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute("aria-valuenow", "5.5");
    expect(progressBar).toHaveAttribute("aria-valuemin", "0");
    expect(progressBar).toHaveAttribute("aria-valuemax", "10");
    expect(progressBar).toHaveAttribute(
      "aria-label",
      "Bias value is 5.5 out of 10"
    );
  });

  test("displays the correct color based on bias value", () => {
    render(<BiasProgressBar bias={2} />);
    const progressBar = screen.getByRole("progressbar", {
      name: /Bias value is 2.0 out of 10/i, // Use aria-label text
    });
    const innerBar = progressBar.firstChild as HTMLElement;
    expect(innerBar).toHaveClass("bg-green-500");

    render(<BiasProgressBar bias={5} />);
    const progressBarYellow = screen.getByRole("progressbar", {
      name: /Bias value is 5.0 out of 10/i,
    });
    const innerBarYellow = progressBarYellow.firstChild as HTMLElement;
    expect(innerBarYellow).toHaveClass("bg-yellow-300");

    render(<BiasProgressBar bias={9} />);
    const progressBarRed = screen.getByRole("progressbar", {
      name: /Bias value is 9.0 out of 10/i,
    });
    const innerBarRed = progressBarRed.firstChild as HTMLElement;
    expect(innerBarRed).toHaveClass("bg-red-500");
  });

  test("displays the correct width and label for bias value", () => {
    render(<BiasProgressBar bias={4.5} />);
    const innerBar = screen.getByRole("progressbar").firstChild as HTMLElement;
    expect(innerBar).toHaveStyle("width: 45%");

    const label = screen.getByText("4.5/10.0");
    expect(label).toBeInTheDocument();
    expect(label).toHaveStyle("margin-left: 37%");
  });

  test("handles edge values correctly", () => {
    render(<BiasProgressBar bias={0} />);
    const progressBar1 = screen.getByRole("progressbar", {
      name: /Bias value is 0.0 out of 10/i, // Use aria-label text
    });
    const innerBar1 = progressBar1.firstChild as HTMLElement;
    expect(innerBar1).toHaveStyle("width: 0%");
    expect(screen.getByText("0.0/10.0")).toBeInTheDocument();

    render(<BiasProgressBar bias={10} />);
    const progressBar2 = screen.getByRole("progressbar", {
      name: /Bias value is 10.0 out of 10/i, // Use aria-label text
    });
    const innerBar2 = progressBar2.firstChild as HTMLElement;
    expect(innerBar2).toHaveStyle("width: 100%");
    expect(screen.getByText("10.0/10.0")).toBeInTheDocument();
  });

  // Current progress bar does not handles outside the valid range, Uncomment below to check whether the updated version fixed it
//   test("clamps values outside the valid range", () => {
//     render(<BiasProgressBar bias={-5} />);
//     const progressBar1 = screen.getByRole("progressbar", {
//       name: /Bias value is 0.0 out of 10/i, // Use aria-label text
//     });
//     const innerBar1 = progressBar1.firstChild as HTMLElement;
//     expect(innerBar1).toHaveStyle("width: 0%");
//     expect(screen.getByText("0.0/10.0")).toBeInTheDocument();

//     render(<BiasProgressBar bias={15} />);
//     const progressBar2 = screen.getByRole("progressbar", {
//       name: /Bias value is 10.0 out of 10/i, // Use aria-label text
//     });
//     const innerBar2 = progressBar2.firstChild as HTMLElement;
//     expect(innerBar2).toHaveStyle("width: 100%");
//     expect(screen.getByText("10.0/10.0")).toBeInTheDocument();
//   });
});

describe("getColorByScore utility", () => {
  test("returns the correct color for score ranges", () => {
    expect(getColorByScore(2)).toBe("green-500");
    expect(getColorByScore(5)).toBe("yellow-300");
    expect(getColorByScore(8)).toBe("red-500");
  });

  test("handles edge cases correctly", () => {
    expect(getColorByScore(0)).toBe("green-500");
    expect(getColorByScore(3.3)).toBe("yellow-300");
    expect(getColorByScore(6.6)).toBe("red-500");
  });
});
