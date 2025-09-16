import React from "react";
import RootLayout from "./layout";
import "./globals.css";
import { Card, CardHeader, CardTitle, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import Link from "next/link";

function Page({ className }) {
  return (
    <>
      <Card className="w-[85vw] max-w-xl bg-[#C7253E] border-none text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome to the Pokédex!</CardTitle>
          <div className="w-[80%] h-[1.8px] bg-white mx-auto"></div>
        </CardHeader>
        <CardContent className="space-y-5">
          <p className="text-center text-lg">
            Discover the fascinating world of Pokémon right here! The Pokédex is
            your ultimate guide to all known Pokémon species, offering detailed
            information about each one, favorite Pokémon, learn about their
            unique powers, and dive into their backstories.
          </p>
          <div className="flex flex-col items-center space-y-2">
            <div className="flex flex-row justify-center w-full space-x-5">
              <Link href="/auth">
                <Button className="bg-black hover:bg-[#27292b] text-white">
                  Login
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-black hover:bg-[#27292b] text-white">
                  Register
                </Button>
              </Link>
            </div>
            <a
              href="/content"
              className="text-blue-300 underline underline-offset-1 hover:text-blue-400"
            >
              Continue without login
            </a>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default function page() {
  return <Page />;
}
