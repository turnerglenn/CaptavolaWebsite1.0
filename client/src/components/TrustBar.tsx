export default function TrustBar() {
  const companies = [
    "TechCorp",
    "InnovateLabs",
    "GrowthVentures",
    "StartupHub",
    "ScaleWorks",
    "VisionTech",
  ];

  return (
    <section className="py-12 border-b">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-sm text-muted-foreground mb-8">
          Trusted by forward-thinking companies
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {companies.map((company) => (
            <div
              key={company}
              className="text-center text-muted-foreground/60 font-semibold text-lg"
              data-testid={`text-company-${company.toLowerCase()}`}
            >
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
