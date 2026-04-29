import { Space_Grotesk, Syne } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata = {
  title: "LOLLY AGENCY | OnlyFans Management Agency",
  description:
    "LOLLY AGENCY is a hyper-modern OnlyFans management agency handling growth, chat operations, and fan relationships 24/7.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${syne.variable}`}>{children}</body>
    </html>
  );
}
