import { z } from "zod";

const normalizedTrialDaysSchema = z.preprocess((value) => {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  const normalizedValue = typeof value === "string" ? Number(value.trim()) : value;
  if (
    typeof normalizedValue === "number" &&
    Number.isInteger(normalizedValue) &&
    normalizedValue <= 0
  ) {
    return null;
  }

  return normalizedValue;
}, z.number().int().positive().nullable());

const publicPricingPlanSchema = z.object({
  code: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  monthlyPrice: z.number().nullable(),
  annualPrice: z.number().nullable(),
  monthlyDisplay: z.string().nullable(),
  annualDisplay: z.string().nullable(),
  billingMonthlyLabel: z.string(),
  billingAnnualLabel: z.string(),
  isFeatured: z.boolean(),
  displayOrder: z.number().int(),
  trialDays: normalizedTrialDaysSchema.optional(),
  trial_days: normalizedTrialDaysSchema.optional(),
  trialPeriodDays: normalizedTrialDaysSchema.optional(),
  trial_period_days: normalizedTrialDaysSchema.optional(),
  freeTrialDays: normalizedTrialDaysSchema.optional(),
  free_trial_days: normalizedTrialDaysSchema.optional(),
  ctaLabel: z.string().nullable(),
  ctaUrl: z.string().nullable(),
  features: z.array(z.string()),
}).transform(({
  trialDays,
  trial_days,
  trialPeriodDays,
  trial_period_days,
  freeTrialDays,
  free_trial_days,
  ...plan
}) => ({
  ...plan,
  trialDays:
    trialDays ??
    trial_days ??
    trialPeriodDays ??
    trial_period_days ??
    freeTrialDays ??
    free_trial_days ??
    null,
}));

const publicPricingResponseSchema = z.object({
  defaultBillingInterval: z.enum(["monthly", "annual"]).optional().default("annual"),
  annualBadgeLabel: z.string().nullable().optional(),
  plans: z.array(publicPricingPlanSchema),
});

export type PublicPricingPlan = z.infer<typeof publicPricingPlanSchema>;
export type PublicPricingResponse = z.infer<typeof publicPricingResponseSchema>;

export function getTrialAwareCtaLabel(ctaLabel: string, trialDays: number | null): string {
  if (trialDays === null) {
    return ctaLabel
      .replace(/start\s+\d+\s*[- ]?\s*days?\s+free\s+trial/i, "Start Free Trial")
      .replace(/start\s+\d+\s*[- ]?\s*days?\s+trial/i, "Start Trial");
  }

  const trialLengthLabel = `${trialDays}-Day`;

  if (/start\s+(?:\d+\s*[- ]?\s*days?\s+)?free\s+trial/i.test(ctaLabel)) {
    return ctaLabel.replace(
      /start\s+(?:\d+\s*[- ]?\s*days?\s+)?free\s+trial/i,
      `Start ${trialLengthLabel} Free Trial`,
    );
  }

  if (/start\s+(?:\d+\s*[- ]?\s*days?\s+)?trial/i.test(ctaLabel)) {
    return ctaLabel.replace(
      /start\s+(?:\d+\s*[- ]?\s*days?\s+)?trial/i,
      `Start ${trialLengthLabel} Trial`,
    );
  }

  return ctaLabel;
}

export function getDefaultTrialCtaLabel(plans: PublicPricingPlan[]): string | null {
  const preferredPlan =
    plans.find((plan) => plan.isFeatured && plan.ctaLabel) ??
    plans.find((plan) => plan.ctaLabel);

  if (!preferredPlan?.ctaLabel) {
    return null;
  }

  return getTrialAwareCtaLabel(preferredPlan.ctaLabel, preferredPlan.trialDays);
}

export async function fetchPublicPricingPlans(): Promise<PublicPricingResponse> {
  const API_BASE = import.meta.env.VITE_PUBLIC_PRICING_API_BASE_URL;
  const requestUrl = API_BASE?.trim()
    ? new URL("/api/public/pricing-plans", API_BASE).toString()
    : "/api/public/pricing-plans";
  const fallbackUrl = "/api/public/pricing-plans";
  const requestInit: RequestInit = {
    method: "GET",
    headers: {
      "Accept": "application/json",
    },
  };

  let response: Response;
  try {
    response = await fetch(requestUrl, requestInit);
  } catch {
    if (requestUrl !== fallbackUrl) {
      response = await fetch(fallbackUrl, requestInit);
    } else {
      throw new Error("Failed to fetch pricing plans");
    }
  }

  if (!response.ok && requestUrl !== fallbackUrl) {
    response = await fetch(fallbackUrl, requestInit);
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch pricing plans (${response.status})`);
  }

  const payload: unknown = await response.json();
  const parsed = publicPricingResponseSchema.safeParse(payload);
  if (!parsed.success) {
    throw new Error("Invalid pricing response shape");
  }

  return {
    defaultBillingInterval: parsed.data.defaultBillingInterval,
    annualBadgeLabel: parsed.data.annualBadgeLabel,
    plans: [...parsed.data.plans].sort((a, b) => {
      if (a.displayOrder !== b.displayOrder) return a.displayOrder - b.displayOrder;
      return a.code.localeCompare(b.code);
    }),
  };
}
