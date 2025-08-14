import { auth, currentUser } from "@clerk/nextjs/server";

export default async function Page() {
  try {
    // Get authentication information with error handling
    const { userId } = auth();
    
    // If auth doesn't throw but doesn't return a userId, handle explicitly
    if (!userId) {
      throw new Error("Authentication required");
    }
    
    // Get user information
    const user = await currentUser();
    
    // Ensure we have a user
    if (!user) {
      throw new Error("User information not available");
    }

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
  } catch (error) {
    // This error will be caught by the error boundary
    console.error("Dashboard error:", error);
    throw error;
  }
}
