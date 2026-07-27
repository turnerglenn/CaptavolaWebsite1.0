import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Minus } from "lucide-react";
import { fetchPublicPricingPlans, getTrialAwareCtaLabel } from "@/lib/pricingApi";

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  const hasUserSelectedBillingCycle = useRef(false);
  const pricingQuery = useQuery({
    queryKey: ["public", "pricing-plans"],
    queryFn: fetchPublicPricingPlans,
  });
  if (pricingQuery.isError && import.meta.env.DEV) {
    console.error("Failed to load public pricing plans", pricingQuery.error);
  }

  const tiers = pricingQuery.data?.plans ?? [];
  const annualBadgeLabel = pricingQuery.data?.annualBadgeLabel;

  useEffect(() => {
    if (!hasUserSelectedBillingCycle.current && pricingQuery.data?.defaultBillingInterval) {
      setBillingCycle(pricingQuery.data.defaultBillingInterval);
    }
  }, [pricingQuery.data?.defaultBillingInterval]);

  const selectBillingCycle = (cycle: "monthly" | "annual") => {
    hasUserSelectedBillingCycle.current = true;
    setBillingCycle(cycle);
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Choose the plan that fits your company's stage.
          </p>

          <div className="inline-flex items-center gap-2 p-1 bg-background border rounded-md">
            <Button
              variant={billingCycle === "monthly" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => selectBillingCycle("monthly")}
              data-testid="button-billing-monthly"
            >
              Monthly
            </Button>
            <Button
              variant={billingCycle === "annual" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => selectBillingCycle("annual")}
              data-testid="button-billing-annual"
            >
              Annual
              {annualBadgeLabel && (
                <Badge variant="secondary" className="ml-2 text-xs no-default-hover-elevate no-default-active-elevate">
                  {annualBadgeLabel}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {pricingQuery.isLoading && (
          <div className="grid md:grid-cols-3 gap-8">
            {[0, 1, 2].map((item) => (
              <Card key={item} className="p-8" data-testid={`card-pricing-loading-${item}`}>
                <div className="h-7 bg-muted rounded w-1/2 mb-4" />
                <div className="h-4 bg-muted rounded w-3/4 mb-8" />
                <div className="h-12 bg-muted rounded w-1/3 mb-8" />
                <div className="space-y-3 mb-8">
                  {[0, 1, 2, 3].map((f) => (
                    <div key={f} className="h-4 bg-muted rounded w-full" />
                  ))}
                </div>
                <div className="h-10 bg-muted rounded w-full" />
              </Card>
            ))}
          </div>
        )}

        {!pricingQuery.isLoading && pricingQuery.isError && (
          <Card className="p-8 text-center" data-testid="pricing-error-state">
            <h3 className="font-display text-2xl font-bold text-foreground mb-3">
              Pricing is temporarily unavailable
            </h3>
            <p className="text-muted-foreground">
              We&apos;re unable to load current plan details right now. Please try again shortly.
            </p>
          </Card>
        )}

        {!pricingQuery.isLoading && !pricingQuery.isError && tiers.length === 0 && (
          <Card className="p-8 text-center" data-testid="pricing-empty-state">
            <h3 className="font-display text-2xl font-bold text-foreground mb-3">
              Pricing plans coming soon
            </h3>
            <p className="text-muted-foreground">
              Plan information is not available at the moment.
            </p>
          </Card>
        )}

        {!pricingQuery.isLoading && !pricingQuery.isError && tiers.length > 0 && (
          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier, index) => (
            <Card
              key={tier.code}
              className={`p-8 flex flex-col ${
                tier.isFeatured ? "border-primary shadow-lg relative" : ""
              }`}
              data-testid={`card-pricing-${tier.code}`}
            >
              <div className="mb-6">
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                  {tier.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {tier.description}
                </p>
              </div>

              <div className="mb-6">
                {billingCycle === "annual" ? (
                  <>
                    <span className="text-4xl font-bold text-foreground">
                      {tier.annualDisplay ?? (tier.annualPrice !== null ? `$${tier.annualPrice}` : "Custom")}
                    </span>
                    <span className="text-muted-foreground">/{tier.billingAnnualLabel.replace(/^per /, "")}</span>
                    {tier.monthlyDisplay && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Monthly: {tier.monthlyDisplay}
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <span className="text-4xl font-bold text-foreground">
                      {tier.monthlyDisplay ?? (tier.monthlyPrice !== null ? `$${tier.monthlyPrice}` : "Custom")}
                    </span>
                    <span className="text-muted-foreground">/{tier.billingMonthlyLabel.replace(/^per /, "")}</span>
                    {tier.annualDisplay && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Annual: {tier.annualDisplay}
                      </p>
                    )}
                  </>
                )}
                {(tier.trialDays) && (
                  <p className="text-xs text-primary font-medium mt-2" data-testid={`text-trial-${tier.code}`}>
                    {tier.trialDays}-day free trial included
                  </p>
                )}
              </div>

              <div className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature, featureIndex) => (
                  <div
                    key={`feature-${featureIndex}`}
                    className="flex items-start gap-3"
                    data-testid={`text-feature-${index}-${featureIndex}`}
                  >
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
                {tier.limits.length > 0 && (
                  <>
                    {tier.features.length > 0 && <div className="border-t my-2" />}
                    {tier.limits.map((limit, limitIndex) => (
                      <div
                        key={`limit-${limitIndex}`}
                        className="flex items-start gap-3"
                        data-testid={`text-limit-${index}-${limitIndex}`}
                      >
                        <Minus className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{limit}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>

              {tier.ctaLabel && tier.ctaUrl ? (
                <Button
                  asChild
                  variant={tier.isFeatured ? "default" : "outline"}
                  className="w-full"
                  data-testid={`button-cta-${tier.code}`}
                >
                  <a href={tier.ctaUrl}>
                    {getTrialAwareCtaLabel(tier.ctaLabel, tier.trialDays)}
                  </a>
                </Button>
              ) : (
                <Button
                  variant={tier.isFeatured ? "default" : "outline"}
                  className="w-full"
                  disabled
                >
                  Contact Sales
                </Button>
              )}
            </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
