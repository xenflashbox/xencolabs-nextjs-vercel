import Link from "next/link";
import { Route } from "next";

export default function Page() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="text-3xl font-bold">Services</h1>
        <p className="mt-2 text-gray-700">
          Managed services powered by our AI tools, with human oversight.
        </p>

        <div className="mt-8 grid md:grid-cols-2 gap-6 max-w-3xl">
          <div className="card">
            <h3 className="text-xl font-semibold">Self-Serve Apps</h3>
            <p className="mt-2 text-gray-700">
              Use our tools directly. Sign up, configure, and run your own workflows.
            </p>
            <Link href={"/" as Route} className="btn btn-primary mt-6">
              Explore Apps
            </Link>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold">Managed Services</h3>
            <p className="mt-2 text-gray-700">
              We handle everything for you. Strategic planning, execution, and optimization.
            </p>
            <Link href={"/contact" as Route} className="btn btn-primary mt-6">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
