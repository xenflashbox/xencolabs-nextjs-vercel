import Link from "next/link";
import { Route } from "next";
import { APPS } from "@/lib/apps";

export default function Page() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="text-3xl font-bold">Our Apps</h1>
        <p className="mt-2 text-gray-700">
          One account. Access everything in the Xenco Labs ecosystem.
        </p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {APPS.map((app) => (
            <div key={app.name} className="card">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{app.name}</h3>
                  <p className="text-sm text-gray-600">{app.subtitle}</p>
                </div>
                <span className="text-xs rounded bg-gray-100 px-2 py-1">{app.subdomain}</span>
              </div>
              <p className="mt-3 text-gray-700">{app.description}</p>
              <div className="mt-4 flex gap-3">
                <a className="btn btn-primary" href={app.href} target="_blank" rel="noreferrer">Open</a>
                <Link className="btn" href={"/sign-in" as Route}>Sign in</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
