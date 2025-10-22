import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroImage from "@assets/generated_images/Professional_boardroom_meeting_scene_960fcdcc.png";

export default function Hero() {
  return (
    <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <Badge
          variant="secondary"
          className="mb-6 bg-primary/20 text-primary-foreground border-primary/30 backdrop-blur-sm"
          data-testid="badge-soc2"
        >
          SOC 2 Compliant
        </Badge>

        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Give Every Stakeholder
          <br />
          <span className="text-primary-foreground">A Seat at the Table</span>
        </h1>

        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Lightweight cap table management for pre-IPO businesses. Track
          ownership, communicate with investors, and manage equity transactions
          with confidence.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground border border-primary-border min-w-48"
            data-testid="button-start-trial"
            onClick={() => console.log("Start free trial clicked")}
          >
            Start Free Trial
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="min-w-48 bg-background/10 backdrop-blur-sm border-white/30 text-white hover:bg-background/20"
            data-testid="button-schedule-demo"
            onClick={() => console.log("Schedule demo clicked")}
          >
            Schedule Demo
          </Button>
        </div>

        <p className="mt-8 text-sm text-white/70">
          Trusted by 500+ growing companies
        </p>
      </div>
    </section>
  );
}
