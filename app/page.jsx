import React from 'react';
import './globals.css'; // Ensure this file is imported to apply the custom CSS
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
      <div className={`${jersey20.className} headers`}>Home</div>
      <div>Page</div>
    </>
  );
}

export default Page;