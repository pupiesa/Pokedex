import React from 'react';
import Image from 'next/image';

function Nav() {
  return (
    <div className="bg-black h-[5vh] flex items-center">
        <Image
          src="/images/topleft.svg"
          alt="topleft"
          layout="fill"
          objectFit="cover"
          className="max-w-[24px] max-h-[24px] fixed"
        />
    </div>
  );
}

export default Nav;