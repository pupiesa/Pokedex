"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import Image from "next/image";

export default function Background({ children }) {
  const pathname = usePathname();

  // Determine the background variant based on route
  const bgVariant = useMemo(() => {
    if (pathname === "/content") return "secondary";
    return "primary";
  }, [pathname]);

  return (
    <div
      className="relative flex flex-col content-center items-center flex-grow pb-[1.5rem] bg-theme-bg-primary data-[variant=secondary]:bg-theme-bg-secondary"
      data-variant={bgVariant}
    >
      <div className="absolute inset-0 bg-ball bg-repeat opacity-[0.02]"></div>
      <div className="relative z-10 flex flex-col justify-center items-center">
        <Image
          src="/images/middetop.svg"
          alt="middetop"
          width={170}
          height={105}
        />
        {children}
      </div>
    </div>
  );
}
