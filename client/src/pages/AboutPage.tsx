import { useEffect } from "react";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { Target, Users, Shield } from "lucide-react";

export default function AboutPage() {
  useEffect(() => {
    document.title = "About - Captavola Cap Table Management";
  }, []);

  const values = [
    {
      icon: Target,
      title: "Simplicity First",
      description:
        "Cap table management shouldn't require a finance degree. We build tools that are powerful yet intuitive.",
    },
    {
      icon: Users,
      title: "Stakeholder Transparency",
      description:
        "Every investor, employee, and advisor deserves a seat at the table. We make equity visibility accessible to all.",
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description:
        "Your equity data is sensitive. We treat it with the highest standards of security and compliance.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <div className="py-20 bg-muted/30">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-6">
              A Seat at the Table
              <br />
              For Every Stakeholder
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Captavola was born from a simple belief: equity management should be
              transparent, accessible, and stress-free for growing companies.
            </p>
          </div>
        </div>

        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                The name "Captavola" comes from the Italian word "tavola,"
                meaning table. We believe that every stakeholder in your
                company—whether they're an early investor, a key employee with
                options, or a strategic advisor—deserves a seat at your table.
              </p>
              <p>
                Too many growing companies struggle with outdated spreadsheets,
                expensive enterprise software, or fragmented communication with
                their stakeholders. We built Captavola to bridge that gap: a
                professional cap table management solution that's accessible,
                affordable, and built specifically for pre-IPO businesses.
              </p>
              <p>
                Our team has experienced the challenges of equity management
                firsthand, from both the founder's desk and the investor's side of
                the table. We know what works, what doesn't, and what truly
                matters when you're focused on growing your business.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-display text-3xl font-bold text-foreground mb-12 text-center">
              Our Values
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <Card
                  key={index}
                  className="p-8 text-center"
                  data-testid={`card-value-${index}`}
                >
                  <value.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-xl text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
