import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import {
  fetchPublicPricingPlans,
  getDefaultTrialCtaLabel,
  getDefaultTrialCtaUrl,
} from "@/lib/pricingApi";
import { goToDemoRequest } from "@/lib/links";

export default function CTASection() {
  const pricingQuery = useQuery({
    queryKey: ["public", "pricing-plans"],
    queryFn: fetchPublicPricingPlans,
  });
  const defaultTrialCtaLabel = getDefaultTrialCtaLabel(
    pricingQuery.data?.plans ?? [],
  ) ?? "Start Free Trial";
  const trialCtaUrl =
    getDefaultTrialCtaUrl(pricingQuery.data?.plans ?? []) ?? "/pricing";

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
          <Button asChild size="lg" data-testid="button-cta-trial">
            <a href={trialCtaUrl}>{defaultTrialCtaLabel}</a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            data-testid="button-cta-demo"
            onClick={goToDemoRequest}
          >
            Schedule a Demo
          </Button>
        </div>
      </div>
    </section>
  );
}
