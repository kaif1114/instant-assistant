import Navbar from "./components/navbar";
import HeroSection from "./components/hero-section";
import SocialProof from "./components/social-proof";
import BenefitsSection from "./components/benefits-section";
import HowItWorks from "./components/how-it-works";
import Testimonials from "./components/testimonials";
import FAQ from "./components/faq";
import CTASection from "./components/cta-section";
import Footer from "./components/footer";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col relative">
      <Navbar />
      <main className="flex-1 -mt-16">
        <HeroSection />
        <SocialProof />
        <BenefitsSection />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
