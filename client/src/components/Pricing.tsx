import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");

  const tiers = [
    {
      name: "Starter",
      description: "Perfect for early-stage startups",
      monthlyPrice: 49,
      annualPrice: 39,
      features: [
        "Up to 25 stakeholders",
        "Basic cap table management",
        "Email support",
        "Document storage (1GB)",
        "Export to Excel",
      ],
      cta: "Start Free Trial",
      highlighted: false,
    },
    {
      name: "Professional",
      description: "For growing companies",
      monthlyPrice: 149,
      annualPrice: 119,
      features: [
        "Unlimited stakeholders",
        "Advanced cap table & modeling",
        "Priority support",
        "Document storage (50GB)",
        "API access",
        "Investor portal",
        "Custom reports",
        "Vesting schedules",
      ],
      cta: "Start Free Trial",
      highlighted: true,
      badge: "Most Popular",
    },
    {
      name: "Enterprise",
      description: "For established organizations",
      monthlyPrice: null,
      annualPrice: null,
      features: [
        "Everything in Professional",
        "Dedicated account manager",
        "Custom integrations",
        "Advanced security & compliance",
        "White-glove onboarding",
        "SLA guarantee",
        "Custom contract terms",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Choose the plan that fits your company's stage. All plans include a
            14-day free trial.
          </p>

          <div className="inline-flex items-center gap-2 p-1 bg-background border rounded-md">
            <Button
              variant={billingCycle === "monthly" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setBillingCycle("monthly")}
              data-testid="button-billing-monthly"
            >
              Monthly
            </Button>
            <Button
              variant={billingCycle === "annual" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setBillingCycle("annual")}
              data-testid="button-billing-annual"
            >
              Annual
              <Badge variant="secondary" className="ml-2 text-xs no-default-hover-elevate no-default-active-elevate">
                Save 20%
              </Badge>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <Card
              key={index}
              className={`p-8 flex flex-col ${
                tier.highlighted ? "border-primary shadow-lg relative" : ""
              }`}
              data-testid={`card-pricing-${tier.name.toLowerCase()}`}
            >
              {tier.badge && (
                <Badge
                  className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground"
                  data-testid="badge-most-popular"
                >
                  {tier.badge}
                </Badge>
              )}

              <div className="mb-6">
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                  {tier.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {tier.description}
                </p>
              </div>

              <div className="mb-6">
                {tier.monthlyPrice !== null ? (
                  <>
                    <span className="text-4xl font-bold text-foreground">
                      $
                      {billingCycle === "annual"
                        ? tier.annualPrice
                        : tier.monthlyPrice}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                    {billingCycle === "annual" && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Billed annually
                      </p>
                    )}
                  </>
                ) : (
                  <span className="text-4xl font-bold text-foreground">
                    Custom
                  </span>
                )}
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-start gap-3"
                    data-testid={`text-feature-${index}-${featureIndex}`}
                  >
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={tier.highlighted ? "default" : "outline"}
                className="w-full"
                data-testid={`button-cta-${tier.name.toLowerCase()}`}
                onClick={() => console.log(`${tier.cta} - ${tier.name} clicked`)}
              >
                {tier.cta}
              </Button>
            </Card>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-12">
          All plans include 14-day free trial. No credit card required.
        </p>
      </div>
    </section>
  );
}
