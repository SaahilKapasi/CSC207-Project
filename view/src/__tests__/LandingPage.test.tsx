// LandingPage.test.tsx
import { render } from "@testing-library/react";
import LandingPage from "../pages/LandingPage";
import WelcomeSection from "../components/WelcomeSession";
import AboutSection from "../components/AboutSession";

jest.mock("../components/WelcomeSession", () => jest.fn(() => null));
jest.mock("../components/AboutSession", () => jest.fn(() => null));

describe("LandingPage Component", () => {
  const mockOnWelcome = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders WelcomeSection and passes onWelcome prop", () => {
    render(<LandingPage onWelcome={mockOnWelcome} />);

    expect(WelcomeSection).toHaveBeenCalledWith(
      { onWelcome: mockOnWelcome },
      {}
    );
  });

  test("renders AboutSection", () => {
    render(<LandingPage onWelcome={mockOnWelcome} />);

    expect(AboutSection).toHaveBeenCalled();
  });
});
