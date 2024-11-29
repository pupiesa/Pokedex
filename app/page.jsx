import React from 'react';
import RootLayout from "./layout";
import './globals.css'; 
import { Jersey_20 } from 'next/font/google'

const jersey20 = Jersey_20({
  subsets: ['latin'],
  style: 'normal',
  display: 'swap',
  weight: '400',
  variable: '--font-jersey20',
})
function Page({ className }) {
  return (
    <>
      <div className={`w-[85vw] max-w-xl h-20rem rounded-lg bg-[#C7253E]`}>
        <div className={`p-[5%] space-y-5 mb-0.5`}>
          <div className={`headers text-center`}>Welcome to the Pokédex!</div>
          <div className="w-[80%] h-[1.8px] bg-white mx-[10%]"></div>
          <div className="text-center paragraphs pt-[0.3rem] sm:xl">
            Discover the fascinating world of Pokémon right here! The Pokédex is your ultimate guide to all known Pokémon species, offering detailed information about each one, favorite Pokémon, learn about their unique powers, and dive into their backstories.
          </div>
          <div className="flex-col flex items-center contentss space-y-2">
            <div className="flex flex-row justify-center w-[100%] space-x-5 contentss">
              <button className="bg-black px-6 rounded-lg hover:bg-[#27292b]">Login</button>
              <button className="bg-black px-6 py-1.5 hover:bg-[#27292b] rounded-lg">Register</button>
            </div>
            <a href="/content" className='text-blue-300 underline underline-offset-1'>Continue without login</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default function page() {
  return <Page />;
}