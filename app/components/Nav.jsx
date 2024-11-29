import React from 'react';
import Image from 'next/image';

function Nav() {
  return (
    <nav className="bg-black h-[3rem] flex items-center justify-between px-4">
    <Image
      src="/images/topleft.svg"
      alt="topleft"
      layout='fixed'
      width={24}
      height={24}
      className="mr-4"
      
    />
  <div className="">
    <Image
      src="/images/Burger.png"
      alt="burger"
      width={24}
      height={24}
    />
  </div>
</nav>

  );
}

export default Nav;