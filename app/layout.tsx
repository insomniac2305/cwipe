import clsx from "clsx";
import type { Metadata } from "next";
import { Schibsted_Grotesk, Suez_One } from "next/font/google";
import "@/app/globals.css";
import { Providers } from "@/app/providers";

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  adjustFontFallback: false,
});
const suezOne = Suez_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Cwipe - Movie Matcher",
  description: "Find a movie to watch together by swiping through suggestions.",
  openGraph: {
    title: "Cwipe - Movie Matcher",
    description:
      "Find a movie to watch together by swiping through suggestions.",
    url: "https://cwipe.vercel.app",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={clsx(
        schibstedGrotesk.variable,
        suezOne.variable,
        "overscroll-y-none dark",
      )}
    >
      <body className="overscroll-y-none">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
