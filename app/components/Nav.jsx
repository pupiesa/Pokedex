"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

function Nav() {
  const { data: session } = useSession();
  return (
    <nav className="bg-black h-[3rem] flex items-center justify-between px-4 sticky top-0 z-50">
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
        <Link href="/content">
          <Button variant="secondary" size="sm">
            Browse pokemon
          </Button>
        </Link>
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
            <Link href="/favourites">
              <Image
                src="/images/Burger.png"
                alt="burger"
                width={24}
                height={24}
                className="cursor-pointer"
              />
            </Link>
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
