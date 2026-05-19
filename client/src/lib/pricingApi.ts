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

const trialLengthKeys = [
  "trialLength",
  "trialLengthDays",
  "trialDays",
  "defaultTrialLength",
  "defaultTrialDays",
  "freeTrialDays",
  "value",
  "settingValue",
  "currentValue",
  "current",
  "days",
] as const;

function normalizeTrialDays(value: unknown): number | null {
  const normalizedValue = typeof value === "string" ? Number(value.trim()) : value;

  if (
    typeof normalizedValue === "number" &&
    Number.isInteger(normalizedValue) &&
    normalizedValue > 0
  ) {
    return normalizedValue;
  }

  return null;
}

function parseTrialLengthPayload(payload: unknown): number | null {
  const directValue = normalizeTrialDays(payload);
  if (directValue !== null) {
    return directValue;
  }

  if (!payload || typeof payload !== "object") {
    return null;
  }

  for (const key of trialLengthKeys) {
    if (key in payload) {
      const value = normalizeTrialDays((payload as Record<string, unknown>)[key]);
      if (value !== null) {
        return value;
      }
    }
  }

  if ("data" in payload) {
    return parseTrialLengthPayload((payload as Record<string, unknown>).data);
  }

  if ("setting" in payload) {
    return parseTrialLengthPayload((payload as Record<string, unknown>).setting);
  }

  return null;
}

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

export function getDefaultTrialCtaLabel(plans: PublicPricingPlan[], trialDaysOverride?: number | null): string | null {
  const preferredPlan =
    plans.find((plan) => plan.isFeatured && plan.ctaLabel) ??
    plans.find((plan) => plan.ctaLabel);

  if (!preferredPlan?.ctaLabel) {
    return null;
  }

  return getTrialAwareCtaLabel(preferredPlan.ctaLabel, trialDaysOverride ?? preferredPlan.trialDays);
}

async function fetchJsonWithFallback(path: string, errorLabel: string): Promise<unknown> {
  const API_BASE = import.meta.env.VITE_PUBLIC_PRICING_API_BASE_URL;
  const requestUrl = API_BASE?.trim() ? new URL(path, API_BASE).toString() : path;
  const fallbackUrl = path;
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
      throw new Error(`Failed to fetch ${errorLabel}`);
    }
  }

  if (!response.ok && requestUrl !== fallbackUrl) {
    response = await fetch(fallbackUrl, requestInit);
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch ${errorLabel} (${response.status})`);
  }

  return await response.json();
}

export async function fetchPublicPricingPlans(): Promise<PublicPricingResponse> {
  const payload = await fetchJsonWithFallback("/api/public/pricing-plans", "pricing plans");
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

export async function fetchTrialLength(): Promise<number | null> {
  const payload = await fetchJsonWithFallback("/api/platform/settings/trial-length", "trial length");
  return parseTrialLengthPayload(payload);
}
