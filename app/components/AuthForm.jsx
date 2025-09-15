"use client";
import { useState } from "react";
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
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      setLoggedInUser(data.user);
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

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      setSuccess(true);
      // Redirect to login after successful registration
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      setError("Registration failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      // TODO: Implement server-side session/JWT invalidation later
      setLoggedInUser(null);
    } catch (error) {
      setError("Logout failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle logged in state (only for login mode)
  if (mode === "login" && loggedInUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome back!</CardTitle>
            <CardDescription>
              Logged in as{" "}
              <span className="font-semibold">{loggedInUser.name}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={logout}
              disabled={loading}
              variant="destructive"
              className="w-full"
            >
              {loading ? "Logging out..." : "Logout"}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Handle registration success state
  if (mode === "register" && success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
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
            <Button onClick={() => router.push("/login")} className="w-full">
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
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
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          </div>
        )}

        <div className="space-y-2">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          onClick={isLogin ? () => login(email, password) : register}
          disabled={
            loading ||
            !email ||
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
