import { useEffect } from "react";
import Header from "@/components/Header";
import Features from "@/components/Features";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function FeaturesPage() {
  useEffect(() => {
    document.title = "Features - Captavola Cap Table Management";
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <div className="py-20 bg-muted/30">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-6">
              Powerful Features for
              <br />
              Modern Cap Table Management
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage equity, communicate with stakeholders,
              and track ownership in one intuitive platform.
            </p>
          </div>
        </div>
        <Features />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
