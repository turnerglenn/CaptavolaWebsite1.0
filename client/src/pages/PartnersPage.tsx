import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle2 } from "lucide-react";
import { submitPartnerInquiry, type PartnerInquiryPayload } from "@/lib/partnerInquiryApi";

const FIRM_TYPES: Array<{ value: PartnerInquiryPayload["firmType"]; label: string }> = [
  { value: "law_firm", label: "Law firm" },
  { value: "accounting_firm", label: "Accounting firm" },
  { value: "corp_secretarial", label: "Corporate secretarial" },
  { value: "other", label: "Other" },
];

export default function PartnersPage() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firmName: "",
    firmType: "law_firm" as PartnerInquiryPayload["firmType"],
    contactName: "",
    contactEmail: "",
    clientCountEstimate: "",
    message: "",
    website: "", // honeypot — stays empty for humans
  });

  useEffect(() => {
    document.title = "For Firms - Captavola Cap Table Management";
    window.scrollTo(0, 0);
  }, []);

  const submitMutation = useMutation({
    mutationFn: async () => submitPartnerInquiry({
      firmName: formData.firmName,
      firmType: formData.firmType,
      contactName: formData.contactName,
      contactEmail: formData.contactEmail,
      clientCountEstimate: formData.clientCountEstimate || null,
      message: formData.message || null,
      website: formData.website,
    }),
    onSuccess: () => setSubmitted(true),
    onError: (error: any) => {
      toast({
        title: "Submission failed",
        description: error?.message ?? "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const canSubmit = formData.firmName.trim().length >= 2
    && formData.contactName.trim().length >= 2
    && formData.contactEmail.includes("@")
    && !submitMutation.isPending;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-sm font-medium text-primary uppercase tracking-wide mb-2">Partner Program</p>
            <h1 className="text-4xl font-bold mb-4">
              Cap table management for your whole client book
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Law, accounting, and corporate-secretarial firms use Captavola to manage every
              client&apos;s equity in one place — with per-client billing that fits how your firm
              works, and volume pricing as your book grows.
            </p>
          </div>

          <Card className="p-8">
            {submitted ? (
              <div className="text-center py-8" data-testid="partner-inquiry-success">
                <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">Your request is in</h2>
                <p className="text-muted-foreground">
                  Thanks — our partnerships team will reach out at{" "}
                  <span className="font-medium text-foreground">{formData.contactEmail}</span>{" "}
                  within one business day.
                </p>
              </div>
            ) : (
              <form
                className="space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (canSubmit) submitMutation.mutate();
                }}
              >
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="firm-name">Firm name</Label>
                    <Input
                      id="firm-name"
                      value={formData.firmName}
                      onChange={(e) => setFormData({ ...formData, firmName: e.target.value })}
                      placeholder="Wilson & Cole LLP"
                      required
                      data-testid="input-partner-firm-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="firm-type">Firm type</Label>
                    <select
                      id="firm-type"
                      className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                      value={formData.firmType}
                      onChange={(e) => setFormData({
                        ...formData,
                        firmType: e.target.value as PartnerInquiryPayload["firmType"],
                      })}
                      data-testid="select-partner-firm-type"
                    >
                      {FIRM_TYPES.map((type) => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Your name</Label>
                    <Input
                      id="contact-name"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      placeholder="Dana Wilson"
                      required
                      data-testid="input-partner-contact-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Work email</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      placeholder="dana@wilsoncole.com"
                      required
                      data-testid="input-partner-contact-email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="client-count">How many client companies? <span className="text-muted-foreground font-normal">(optional)</span></Label>
                  <Input
                    id="client-count"
                    value={formData.clientCountEstimate}
                    onChange={(e) => setFormData({ ...formData, clientCountEstimate: e.target.value })}
                    placeholder="e.g. 25–50"
                    data-testid="input-partner-client-count"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Anything we should know? <span className="text-muted-foreground font-normal">(optional)</span></Label>
                  <Textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your practice and what you're looking for."
                    data-testid="input-partner-message"
                  />
                </div>

                {/* Honeypot: hidden from humans, bots fill it and get dropped */}
                <div className="absolute -left-[9999px] top-auto" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={!canSubmit}
                  data-testid="button-submit-partner-inquiry"
                >
                  {submitMutation.isPending ? "Submitting…" : "Request Partner Access"}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Partner pricing is tailored to your firm — no credit card required to get started.
                </p>
              </form>
            )}
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
