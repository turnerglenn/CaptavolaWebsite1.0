import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LayoutDashboard, Receipt, DoorOpen } from "lucide-react";

const FIRM_BENEFITS = [
  {
    icon: LayoutDashboard,
    title: "Multi-client dashboard",
    description: "Every client entity in one view — cap tables, filings, and equity events across your whole book.",
  },
  {
    icon: Receipt,
    title: "Flexible billing",
    description: "Firm-pays or client-pays, decided per client. Volume tiers as your book grows.",
  },
  {
    icon: DoorOpen,
    title: "Client-ready offboarding",
    description: "Clients keep their data and history if they ever leave — no lock-in conversations.",
  },
];

export default function FirmsBand() {
  return (
    <section className="py-16 bg-muted/40" data-testid="section-firms-band">
      <div className="max-w-6xl mx-auto px-6">
        <Card className="p-8 md:p-12">
          <div className="text-center mb-10">
            <p className="text-sm font-medium text-primary uppercase tracking-wide mb-2">Partner Program</p>
            <h2 className="text-3xl font-bold mb-3">
              For Law, Accounting &amp; Corporate-Secretarial Firms
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Manage every client&apos;s cap table under one relationship — one dashboard, one bill,
              per-client pricing with volume tiers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-10">
            {FIRM_BENEFITS.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/partners">
              <Button size="lg" data-testid="button-request-partner-access">
                Request Partner Access
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </section>
  );
}
