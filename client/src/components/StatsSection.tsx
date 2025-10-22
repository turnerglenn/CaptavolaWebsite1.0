export default function StatsSection() {
  const stats = [
    { value: "500+", label: "Companies Trust Us" },
    { value: "$2.5B", label: "Assets Under Management" },
    { value: "10K+", label: "Active Stakeholders" },
    { value: "99.9%", label: "Uptime Guarantee" },
  ];

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center" data-testid={`stat-${index}`}>
              <p className="font-display text-4xl md:text-5xl font-bold mb-2">
                {stat.value}
              </p>
              <p className="text-sm opacity-90">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
