import { z } from "zod";

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
  trialDays: z.number().int().nullable(),
  ctaLabel: z.string().nullable(),
  ctaUrl: z.string().nullable(),
  features: z.array(z.string()),
});

const publicPricingResponseSchema = z.object({
  plans: z.array(publicPricingPlanSchema),
});

export type PublicPricingPlan = z.infer<typeof publicPricingPlanSchema>;
export type PublicPricingResponse = z.infer<typeof publicPricingResponseSchema>;

export async function fetchPublicPricingPlans(): Promise<PublicPricingResponse> {
  const baseUrl = import.meta.env.VITE_PUBLIC_PRICING_API_BASE_URL?.trim();
  const requestUrl = baseUrl
    ? new URL("/api/public/pricing-plans", baseUrl).toString()
    : "/api/public/pricing-plans";

  const response = await fetch(requestUrl, {
    method: "GET",
    headers: {
      "Accept": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch pricing plans (${response.status})`);
  }

  const payload: unknown = await response.json();
  const parsed = publicPricingResponseSchema.safeParse(payload);
  if (!parsed.success) {
    throw new Error("Invalid pricing response shape");
  }

  return {
    plans: [...parsed.data.plans].sort((a, b) => {
      if (a.displayOrder !== b.displayOrder) return a.displayOrder - b.displayOrder;
      return a.code.localeCompare(b.code);
    }),
  };
}
