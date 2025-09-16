"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

function Nav() {
  const { data: session } = useSession();
  return (
    <nav className="bg-black h-[3rem] flex items-center justify-between px-4">
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/images/topleft.svg"
            alt="topleft"
            width={24}
            height={24}
            className="mr-4"
          />
        </Link>
        {session?.user?.name && (
          <span className="text-white">{session.user.name}</span>
        )}
      </div>
      <div className="flex items-center space-x-4">
        {session ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-white">
              Welcome, {session.user.name}
            </span>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Logout
            </Button>
            <Image
              src="/images/Burger.png"
              alt="burger"
              width={24}
              height={24}
              className="cursor-pointer"
            />
          </div>
        ) : (
          <Link href="/auth">
            <Button variant="secondary" size="sm">
              Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Nav;
