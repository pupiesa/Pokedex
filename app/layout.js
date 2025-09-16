import Background from "@/app/lib/bgHeader";
import Nav from "./components/Nav";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import AuthProvider from "./components/AuthProvider";
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`relative flex flex-col min-h-screen ${jersey20.className}`}
      >
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Nav />
            <Background>
              <div className="flex justify-center">{children}</div>
            </Background>
            <Footer />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
