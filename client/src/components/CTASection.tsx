import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { fetchPublicPricingPlans, getDefaultTrialCtaLabel } from "@/lib/pricingApi";

export default function CTASection() {
  const pricingQuery = useQuery({
    queryKey: ["public", "pricing-plans"],
    queryFn: fetchPublicPricingPlans,
  });
  const defaultTrialCtaLabel = getDefaultTrialCtaLabel(pricingQuery.data?.plans ?? []) ?? "Start Free Trial";

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
          Start Managing Your Cap Table Today
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Join hundreds of companies who trust Captavola with their equity
          management. No credit card required.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            data-testid="button-cta-trial"
            onClick={() => console.log("Start trial clicked")}
          >
            {defaultTrialCtaLabel}
          </Button>
          <Button
            size="lg"
            variant="outline"
            data-testid="button-cta-demo"
            onClick={() => console.log("Schedule demo clicked")}
          >
            Schedule a Demo
          </Button>
        </div>
      </div>
    </section>
  );
}
