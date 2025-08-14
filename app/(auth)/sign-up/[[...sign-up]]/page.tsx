"use client";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="section">
      <div className="container flex justify-center">
        <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />
      </div>
    </div>
  );
}
