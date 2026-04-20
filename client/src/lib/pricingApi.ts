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
    plans: [...parsed.data.plans].sort((a, b) => {
      if (a.displayOrder !== b.displayOrder) return a.displayOrder - b.displayOrder;
      return a.code.localeCompare(b.code);
    }),
  };
}
