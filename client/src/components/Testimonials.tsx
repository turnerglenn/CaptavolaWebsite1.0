import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "Captavola simplified our cap table management completely. What used to take hours in spreadsheets now takes minutes. Our investors love the transparency.",
      author: "Sarah Chen",
      role: "CEO",
      company: "TechStart Inc",
      initials: "SC",
    },
    {
      quote:
        "The investor communication features are game-changing. We can keep all our stakeholders informed without juggling multiple email threads and documents.",
      author: "Michael Torres",
      role: "CFO",
      company: "GrowthVentures",
      initials: "MT",
    },
    {
      quote:
        "Finally, a cap table solution that doesn't require a finance degree to use. Clean, intuitive, and powerful. Exactly what we needed.",
      author: "Emily Rodriguez",
      role: "Founder",
      company: "InnovateLabs",
      initials: "ER",
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Loved by Founders & CFOs
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join hundreds of companies managing their equity with confidence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="p-8 flex flex-col"
              data-testid={`card-testimonial-${index}`}
            >
              <p className="text-foreground mb-6 flex-1 italic">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4">
                <Avatar data-testid={`avatar-${index}`}>
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {testimonial.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
