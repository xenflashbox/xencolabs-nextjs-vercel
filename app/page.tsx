import Link from "next/link";
import { Route } from "next";

export default function Page() {
  return (
    <section className="section">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Build faster with Xenco Labs
            </h1>
            <p className="mt-4 text-lg text-gray-700">
              A unified home for our AI products — BlogCraft, ReResume, LaunchCraft, and more.
              Sign in once at Xenco Labs to access the entire ecosystem.
            </p>
            <div className="mt-6 flex gap-3">
              <Link href={"/apps" as Route} className="btn btn-primary">Explore Apps</Link>
              <Link href={"/sign-in" as Route} className="btn">Sign in</Link>
            </div>
          </div>
          <div className="card">
            <h3 className="text-xl font-semibold">Edge-ready 🔌</h3>
            <p className="mt-2 text-gray-700">
              This starter is wired for Clerk auth, Vercel Edge Functions, and Neon Postgres.
              It includes a health check at <code className="px-1 rounded bg-gray-100">/api/health</code>.
            </p>
            <ul className="mt-4 list-disc pl-6 text-gray-700">
              <li>Centralized auth domain for satellites</li>
              <li>Protected routes with middleware</li>
              <li>Tailwind & simple UI primitives</li>
              <li>Optional C1 SDK lab page</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
