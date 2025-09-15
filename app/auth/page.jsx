"use client";
import AuthForm from "@/app/components/AuthForm";
import { useSearchParams } from "next/navigation";

const LoginPage = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  console.log("Name parameter:", name);

  return <AuthForm mode={name} />;
};

export default LoginPage;
