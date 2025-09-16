"use client";
import { useState } from "react";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const login = async (emailOrName, password) => {
    setLoading(true);
    setError("");
    const result = await signIn("credentials", {
      redirect: false,
      identifier: emailOrName,
      password,
    });
    if (result?.error) {
      setError("Login failed: " + result.error);
    }
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    await signOut({ redirect: false });
    setLoading(false);
  };

  // Handle logged in state (only for login mode)
  if (mode === "login" && session?.user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome back!</CardTitle>
            <CardDescription>
              Logged in as{" "}
              <span className="font-semibold">{session.user.name}</span>
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

  const title = "Login to Pokédex";
  const description = "Enter your credentials to access your account";
  const buttonText = loading ? "Logging in..." : "Login";

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
        <div className="space-y-2">
          <Input
            type="text"
            placeholder="Email or Name"
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
        <Button
          onClick={() => login(emailOrName, password)}
          disabled={loading || !emailOrName || !password}
          className="w-full"
        >
          {buttonText}
        </Button>
        <div className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-primary hover:underline">
            Register here
          </Link>
        </div>
      </CardContent>
    </Card>
    // </div>
  );
};

export default AuthForm;
