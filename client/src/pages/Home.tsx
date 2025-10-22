import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Features from "@/components/Features";
import StatsSection from "@/components/StatsSection";
import Testimonials from "@/components/Testimonials";
import WaitlistForm from "@/components/WaitlistForm";
import Footer from "@/components/Footer";

export default function Home() {
  useEffect(() => {
    document.title = "Captavola - Investor & Cap Table Management for Growing Businesses";
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
