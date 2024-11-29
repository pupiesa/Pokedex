"use client";

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from "next/image";
export default function Background({ children }) {
  const pathname = usePathname();
  const [bgColor, setBgColor] = useState("#E85C0D");

  useEffect(() => {
    if (pathname === "/") {
      setBgColor("#E85C0D");
    } else if (pathname === "/login") {
      setBgColor("#E85C0D");
    } else if(pathname === "/content") {
      setBgColor("#821131");
    } else {
      setBgColor("#E85C0D");
    }
  }, [pathname]);

  return (
    <div className={`relative flex flex-col content-center items-center flex-grow pb-[1.5rem]`} style={{ backgroundColor: bgColor }}>
          <div className="absolute inset-0 bg-ball bg-repeat opacity-[0.02]"></div>
          <div className="relative z-10 flex flex-col justify-center items-center">
            <Image src="/images/middetop.svg" alt="middetop" width={170} height={105} />
            {children}
          </div>
        </div>
   
  );
}
