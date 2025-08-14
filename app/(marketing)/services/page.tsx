export default function Page() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="text-3xl font-bold">Services</h1>
        <p className="mt-2 text-gray-700">Managed AI + SEO packages from Xenco Labs.</p>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Basic SEO",
              price: "$299–399/mo",
              features: [
                "Technical SEO setup",
                "Keyword research & plan",
                "Monthly reporting",
                "Schema & WP basics"
              ]
            },
            {
              title: "Standard AI Automation",
              price: "$699–999/mo",
              features: [
                "AI content workflows",
                "Google/Meta adapters",
                "Blog + newsletter",
                "Automation playbooks"
              ]
            },
            {
              title: "Premium Full-Service",
              price: "Custom",
              features: [
                "Strategy + ops",
                "Custom agents & tools",
                "Editorial management",
                "Quarterly growth audits"
              ]
            }
          ].map((pkg) => (
            <div key={pkg.title} className="card">
              <h3 className="text-xl font-semibold">{pkg.title}</h3>
              <p className="mt-1 text-gray-600">{pkg.price}</p>
              <ul className="mt-4 list-disc pl-6 text-gray-700">
                {pkg.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <a href="/sign-in" className="btn btn-primary mt-6">Get started</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
