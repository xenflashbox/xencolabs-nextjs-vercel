"use client";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="section">
      <div className="container flex justify-center">
        <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />
      </div>
    </div>
  );
}
