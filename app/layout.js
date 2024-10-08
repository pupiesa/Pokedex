
import Nav from "./components/Nav";
import "./globals.css";
import Image from "next/image";
import { Jersey_20 } from "next/font/google";
import Footer from "./components/Footer";

const jersey20 = Jersey_20({
  subsets: ["latin"],
  style: "normal",
  display: "swap",
  weight: "400",
  variable: "--font-jersey20",
});

export const metadata = {
  title: "Pokedex",
  description: "A simple pokedex",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <div className="flex flex-col content-center items-center min-h-screen">
          <Image src="/images/middetop.svg" alt="middetop" width={170} height={105} />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
