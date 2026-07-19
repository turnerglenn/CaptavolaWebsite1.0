import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Features from "@/components/Features";
import StatsSection from "@/components/StatsSection";
import Testimonials from "@/components/Testimonials";
import WaitlistForm from "@/components/WaitlistForm";
import Footer from "@/components/Footer";
import { DEMO_REQUEST_SECTION_ID } from "@/lib/links";

export default function Home() {
  useEffect(() => {
    document.title = "Captavola - Investor & Cap Table Management for Growing Businesses";
    if (window.location.hash === `#${DEMO_REQUEST_SECTION_ID}`) {
      document
        .getElementById(DEMO_REQUEST_SECTION_ID)
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Features />
        <StatsSection />
        <Testimonials />
        <WaitlistForm />
      </main>
      <Footer />
    </div>
  );
}
