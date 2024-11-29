import React from 'react'
import Image from 'next/image'
function Footer() {
  return (
    <div  className="bg-black min-h-[3rem] flex flex-row justify-between items-center paragraphs px-4
    ">
      <div>Pokedex @api by pokeapi.co</div>
      <div>
      <Image 
      src="/images/gitIcon.svg" 
      alt="gitIcon" 
      width={24} 
      height={24}
      />
      </div>
    </div>
  )
}

export default Footer