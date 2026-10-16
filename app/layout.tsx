import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Pinyon_Script } from "next/font/google";
import { BackgroundMusic } from "./components/background-music";
import { wedding } from "./wedding-content";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const pinyon = Pinyon_Script({
  variable: "--font-pinyon",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Wedding of Kian & Trisha | November 20, 2026",
  description: "Join Kian Arbolado and Trisha Amor Geli for their wedding on November 20, 2026. Discover their story, celebration details, and guest information.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} ${cormorant.variable} ${pinyon.variable}`}>
      <body>
        {children}
        <BackgroundMusic {...wedding.music} />
      </body>
    </html>
  );
}
