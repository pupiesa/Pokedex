"use client";
import { Suspense } from "react";
import AuthForm from "@/app/components/AuthForm";
import { useSearchParams } from "next/navigation";

function AuthContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "login";
  return <AuthForm mode={name} />;
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthContent />
    </Suspense>
  );
}
