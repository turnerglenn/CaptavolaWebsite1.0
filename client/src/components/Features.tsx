import { Card } from "@/components/ui/card";
import { Shield, Users, TrendingUp, FileText, Bell, Lock } from "lucide-react";
import capTableImage from "@assets/generated_images/Cap_table_dashboard_screenshot_d447c923.png";
import communicationImage from "@assets/generated_images/Email_tracking_dashboard_interface_996856a1.png";
import transactionImage from "@assets/generated_images/Blurred_transaction_interface_with_binary_46a38d7a.png";

export default function Features() {
  const mainFeatures = [
    {
      title: "Cap Table Management",
      description:
        "Visualize ownership structure at a glance. Track equity distribution, vesting schedules, and dilution scenarios with elegant, easy-to-understand dashboards.",
      image: capTableImage,
      reverse: false,
    },
    {
      title: "Investor Communications",
      description:
        "Keep stakeholders informed with streamlined communication tools. Send updates, share reports, and maintain transparency with your investor community.",
      image: communicationImage,
      reverse: true,
    },
    {
      title: "Transaction Tracking",
      description:
        "Record and monitor all equity transactions in one secure location. From initial investments to secondary sales, maintain a complete audit trail.",
      image: transactionImage,
      reverse: false,
    },
  ];

  const benefits = [
    {
      icon: Users,
      title: "Flexible Stakeholder Management",
      description: "Manage investors, employees, and advisors with ease. Scale your cap table as your company grows.",
    },
    {
      icon: TrendingUp,
      title: "Real-Time Analytics",
      description: "Instant insights into ownership percentages, valuations, and dilution modeling.",
    },
    {
      icon: FileText,
      title: "Document Management",
      description: "Store and share investment agreements, board resolutions, and compliance documents.",
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Automated alerts for vesting milestones, filing deadlines, and important updates.",
    },
    {
      icon: Lock,
      title: "Role-Based Access",
      description: "Control who sees what with granular permission settings for every stakeholder.",
    },
    {
      icon: Shield,
      title: "Data Protection",
      description: "Your sensitive equity data protected with enterprise-level encryption and security.",
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Everything You Need to Manage Equity
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built for growing companies that need professional cap table
            management without the complexity or cost of enterprise solutions.
          </p>
        </div>

        <div className="space-y-24 mb-24">
          {mainFeatures.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                feature.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
              } gap-12 items-center`}
              data-testid={`feature-${index}`}
            >
              <div className="flex-1">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="rounded-md border shadow-lg w-full"
                  data-testid={`img-feature-${index}`}
                />
              </div>
              <div className="flex-1 space-y-4">
                <h3 className="font-display text-3xl font-bold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-lg text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="p-8 hover-elevate"
              data-testid={`card-benefit-${index}`}
            >
              <benefit.icon className="w-10 h-10 text-primary mb-4" />
              <h4 className="font-semibold text-xl text-foreground mb-2">
                {benefit.title}
              </h4>
              <p className="text-muted-foreground">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
