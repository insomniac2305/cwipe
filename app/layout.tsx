import type { Metadata } from "next";
import { Schibsted_Grotesk, Suez_One } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { Providers } from "@/app/providers";

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});
const suezOne = Suez_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Cwipe - Movie Matcher",
  description:
    "This app let's you match a movie to watch together by swiping through suggestions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={clsx(schibstedGrotesk.variable, suezOne.variable, "dark")}
    >
      <body className="overflow-hidden">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
