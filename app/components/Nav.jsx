import React from "react";
import Image from "next/image";
import Link from "next/link";

function Nav() {
  return (
    <nav className="bg-black h-[3rem] flex items-center justify-between px-4">
      <Link href="/">
        <Image
          src="/images/topleft.svg"
          alt="topleft"
          width={24}
          height={24}
          className="mr-4"
        />
      </Link>
      <div className="flex items-center space-x-4">
        <Image src="/images/Burger.png" alt="burger" width={24} height={24} />
      </div>
    </nav>
  );
}

export default Nav;
