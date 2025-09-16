"use client";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AuthForm = ({ mode = "login" }) => {
  const { data: session } = useSession();
  const [emailOrName, setEmailOrName] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  // Handle redirect when session changes
  useEffect(() => {
    if (mode === "login" && session?.user) {
      router.push("/content");
    }
  }, [session, mode, router]);

  const login = async (emailOrName, password) => {
    try {
      setLoading(true);
      setError("");
      const result = await signIn("credentials", {
        redirect: false,
        identifier: emailOrName,
        password,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        // After successful login, the session will update automatically
        // and the useEffect hook will handle the redirect
        router.refresh();
      }
    } catch (error) {
      setError("Login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const register = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!name || !emailOrName || !password) {
      setError("All fields are required");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailOrName, name, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      setSuccess(true);
      setTimeout(() => {
        router.push("/auth?name=login");
      }, 2000);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle registration success state
  if (mode === "register" && success) {
    return (
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-green-600">
              Registration Successful!
            </CardTitle>
            <CardDescription>
              Your account has been created successfully. Redirecting to
              login...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/auth")} className="w-full">
              Go to Login
            </Button>
          </CardContent>
        </Card>
    );
  }

  const isLogin = mode === "login";
  const title = isLogin ? "Login to Pokédex" : "Create Account";
  const description = isLogin
    ? "Enter your credentials to access your account"
    : "Join the Pokédex community";
  const buttonText = isLogin
    ? loading
      ? "Logging in..."
      : "Login"
    : loading
    ? "Creating Account..."
    : "Create Account";
  const linkText = isLogin
    ? "Don't have an account?"
    : "Already have an account?";
  const linkHref = isLogin ? "/auth?name=register" : "/auth?name=login";
  const linkLabel = isLogin ? "Register here" : "Login here";

  return (
    // <div className="flex flex-col items-center justify-center min-h-screen bg-[#C7253E] p-4">
    <Card className="w-full max-w-md mx-10 bg-[#C7253E]">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!isLogin && (
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          </div>
        )}

        <div className="space-y-2">
          <Input
            type="text"
            placeholder="Email or Username"
            value={emailOrName}
            onChange={(e) => setEmailOrName(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>

        {!isLogin && (
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
            />
          </div>
        )}

        <Button
          onClick={isLogin ? () => login(emailOrName, password) : register}
          disabled={
            loading ||
            !emailOrName ||
            !password ||
            (!isLogin && (!name || !confirmPassword))
          }
          className="w-full"
        >
          {buttonText}
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          {linkText}{" "}
          <Link href={linkHref} className="text-primary hover:underline">
            {linkLabel}
          </Link>
        </div>
      </CardContent>
    </Card>
    // </div>
  );
};

export default AuthForm;
