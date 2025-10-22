import { useEffect } from "react";
import Header from "@/components/Header";
import Pricing from "@/components/Pricing";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function PricingPage() {
  useEffect(() => {
    document.title = "Pricing - Captavola Cap Table Management";
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Pricing />
        <div className="py-16 bg-background">
          <div className="max-w-4xl mx-auto px-6">
            <h3 className="font-display text-2xl font-bold text-foreground mb-8 text-center">
              Frequently Asked Questions
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  Do you offer a free trial?
                </h4>
                <p className="text-muted-foreground">
                  Yes! All plans include a 14-day free trial with full access to
                  features. No credit card required to start.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  Can I change plans later?
                </h4>
                <p className="text-muted-foreground">
                  Absolutely. You can upgrade or downgrade your plan at any time.
                  Changes are prorated to ensure fair billing.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  What payment methods do you accept?
                </h4>
                <p className="text-muted-foreground">
                  We accept all major credit cards, ACH transfers for annual plans,
                  and can accommodate invoice billing for Enterprise customers.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  Is my data secure?
                </h4>
                <p className="text-muted-foreground">
                  Yes. We use enterprise-grade encryption and undergo regular security
                  audits. Your data is yours and is never shared.
                </p>
              </div>
            </div>
          </div>
        </div>
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
