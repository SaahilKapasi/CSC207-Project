import { ReactElement } from "react";
import AboutSection from "../components/AboutSession";
import WelcomeSection from "../components/WelcomeSession";

interface LandingPageProps {
  onWelcome: () => void;
}

export default function LandingPage({
  onWelcome,
}: LandingPageProps): ReactElement {
  return (
    <div>
        {/* Welcome Section */}
        <WelcomeSection onWelcome={onWelcome}/>
        {/* About Section */}
        <AboutSection />
    </div>
  );
}
