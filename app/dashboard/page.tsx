import { auth, currentUser } from "@clerk/nextjs/server";

export default async function Page() {
  // With the updated middleware, these calls should succeed
  // The middleware will redirect to sign-in if not authenticated
  const { userId } = auth();
  const user = await currentUser();

  return (
    <section className="section">
      <div className="container">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-2 text-gray-700">Welcome{user?.firstName ? `, ${user.firstName}` : ""}!</p>

        <div className="mt-8 card">
          <h3 className="text-xl font-semibold">Account</h3>
          <div className="mt-3 text-gray-700">
            <div><strong>User ID:</strong> {userId}</div>
            <div><strong>Email:</strong> {user?.emailAddresses?.[0]?.emailAddress ?? "—"}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
