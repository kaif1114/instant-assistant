import BenefitsSection from "./components/benefits-section";
import CTASection from "./components/cta-section";
import FAQ from "./components/faq";
import Footer from "./components/footer";
import HeroSection from "./components/hero-section";
import HowItWorks from "./components/how-it-works";
import Navbar from "./components/navbar";
import SocialProof from "./components/social-proof";
import Testimonials from "./components/testimonials";

const page = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
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
};

export default page;
