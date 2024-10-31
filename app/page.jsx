import React from 'react';
import './globals.css'; 
import { Jersey_20 } from 'next/font/google'

const jersey20 = Jersey_20({
  subsets: ['latin'],
  style: 'normal',
  display: 'swap',
  weight: '400',
  variable: '--font-jersey20',
})
function Page() {
  return (
     
    
    <>
      <div
        className={`w-[85vw] max-w-xl h-20rem bg-[#C7253E] ${jersey20.className}`}>
        <div className={`p-[5%] space-y-5`}>
          <div className={`headers text-center`}>Welcome to the Pokédex!</div>
          <div className="w-[80%] h-[1.8px] bg-white mx-[10%]"></div>
          <div className="text-center paragraphs pt-[0.6rem] sm:xl">Discover the fascinating world of Pokémon right here! The Pokédex is your ultimate guide to all known Pokémon species, offering detailed information about each one,  favorite Pokémon, learn about their unique powers, and dive into their backstories.</div>
          <div className="flex flex-row justify-center w-[100%] contentss">
            <button className="bg-black">Login</button>
            <button className="bg-black">Register</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;