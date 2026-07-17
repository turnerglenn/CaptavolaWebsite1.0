import type { Express, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistSubmissionSchema } from "@shared/schema";

async function proxySoftwareApiJson(path: string, errorLabel: string, debugLabel: string, res: Response) {
  const debugPricingProxy = process.env.DEBUG_PRICING_PROXY === "1";
  const baseUrlRaw = process.env.SOFTWARE_PUBLIC_API_BASE_URL?.trim();
  if (!baseUrlRaw) {
    return res.status(500).json({ message: "SOFTWARE_PUBLIC_API_BASE_URL is not configured" });
  }

  let baseUrl: URL;
  try {
    baseUrl = new URL(baseUrlRaw);
  } catch {
    return res.status(500).json({ message: "SOFTWARE_PUBLIC_API_BASE_URL is invalid" });
  }

  const upstream = new URL(path, baseUrl);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    if (debugPricingProxy) {
      console.info(`[${debugLabel}] upstream url:`, upstream.toString());
    }
    const upstreamRes = await fetch(upstream.toString(), {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
      signal: controller.signal,
    });
    const text = await upstreamRes.text();
    if (debugPricingProxy) {
      console.info(`[${debugLabel}] upstream status:`, upstreamRes.status);
      console.info(`[${debugLabel}] upstream raw body:`, text.slice(0, 1000));
    }
    if (!upstreamRes.ok) {
      return res.status(502).json({
        message: `Failed to load ${errorLabel} from software API`,
        upstreamStatus: upstreamRes.status,
      });
    }

    let payload: unknown;
    try {
      payload = JSON.parse(text);
    } catch {
      return res.status(502).json({ message: "Software API returned invalid JSON" });
    }

    res.setHeader("Cache-Control", "public, max-age=60");
    return res.json(payload);
  } catch (error) {
    if (debugPricingProxy) {
      console.error(`[${debugLabel}] upstream fetch error:`, error);
    }
    if (error instanceof Error && error.name === "AbortError") {
      return res.status(504).json({ message: `Software ${errorLabel} API request timed out` });
    }
    return res.status(502).json({ message: `Unable to reach software ${errorLabel} API` });
  } finally {
    clearTimeout(timeout);
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/public/pricing-plans", async (_req, res) => {
    return proxySoftwareApiJson("/api/public/pricing-plans", "pricing plans", "pricing-proxy", res);
  });

  app.get("/api/platform/settings/trial-length", async (_req, res) => {
    return proxySoftwareApiJson(
      "/api/platform/settings/trial-length",
      "trial length",
      "trial-length-proxy",
      res,
    );
  });

  app.post("/api/waitlist", async (req, res) => {
    try {
      const validatedData = insertWaitlistSubmissionSchema.parse(req.body);
      const submission = await storage.createWaitlistSubmission(validatedData);
      res.status(201).json(submission);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/waitlist", async (req, res) => {
    try {
      const submissions = await storage.getAllWaitlistSubmissions();
      res.json(submissions);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
