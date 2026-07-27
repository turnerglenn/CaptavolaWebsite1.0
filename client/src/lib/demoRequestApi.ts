// Demo-request submission to the Captavola app's public API.
// Same base-URL + fallback strategy as partnerInquiryApi.ts: prefer the
// configured app host (VITE_PUBLIC_PRICING_API_BASE_URL), fall back to
// same-origin (the marketing site itself has no backend to fall back to,
// but this keeps the request shape identical to the other public forms).

export type DemoRequestPayload = {
  name: string;
  email: string;
  company?: string | null;
  message?: string | null;
  /** Honeypot — must always be submitted empty. */
  website?: string;
};

export async function submitDemoRequest(payload: DemoRequestPayload): Promise<void> {
  const API_BASE = import.meta.env.VITE_PUBLIC_PRICING_API_BASE_URL;
  const path = "/api/public/demo-requests";
  const requestUrl = API_BASE?.trim() ? new URL(path, API_BASE).toString() : path;
  const requestInit: RequestInit = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...payload, website: payload.website ?? "" }),
  };

  let response: Response;
  try {
    response = await fetch(requestUrl, requestInit);
  } catch {
    if (requestUrl !== path) {
      response = await fetch(path, requestInit);
    } else {
      throw new Error("Unable to submit your request. Please try again.");
    }
  }

  if (!response.ok && requestUrl !== path) {
    response = await fetch(path, requestInit);
  }

  if (!response.ok) {
    const body = await response.json().catch(() => null) as { message?: string } | null;
    throw new Error(body?.message ?? "Unable to submit your request. Please try again.");
  }
}
