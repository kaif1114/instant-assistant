import { ChatPreview } from "./components/chat-preview";
import CTASection from "./components/cta-section";
import DashboardCards from "./components/dashboard-cards";
import FAQ from "./components/faq";
import Footer from "./components/footer";
import ForBusiness from "./components/ForBusiness";
import HeroSection from "./components/hero-section";
import BenefitsSection from "./components/HowItWorks";
import Navbar from "./components/navbar";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col relative">
      <Navbar />
      <main className="flex-1 -mt-16">
        <HeroSection />
        {/* <ChatPreview/> */}
        <ForBusiness/>
        <BenefitsSection />
        <DashboardCards />

        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
