import CTASection from "./components/cta-section";
import DashboardCards from "./components/dashboard-cards";
import FAQ from "./components/faq";
import Footer from "./components/footer";
import HeroSection from "./components/hero-section";
import BenefitsSection from "./components/HowItWorks";
import Navbar from "./components/navbar";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col relative">
      <Navbar />
      <main className="flex-1 -mt-16">
        <HeroSection />
        {/* <HeroSection title="Instant Assistant" description="Instant Assistant" actions={[]} image={{ light: "./public/dashboard.png", dark: "", alt: "" }} /> */}

        <BenefitsSection />
        <DashboardCards />

        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
