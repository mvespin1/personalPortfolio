import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import TechMarquee from "./components/TechMarquee";
import BiographySection from "./components/BiographySection";
import HobbiesSection from "./components/HobbiesSection";
import ProjectsSection from "./components/ProjectsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import Footer from "./components/Footer";
import MouseFollower from "./components/MouseFollower";

export default function Home() {
  return (
    <>
      <MouseFollower />
      <Navbar />
      <HeroSection />
      <BiographySection />
      <TechMarquee />
      <HobbiesSection />
      <ProjectsSection />
      <TestimonialsSection />
      <Footer />
    </>
  );
}
