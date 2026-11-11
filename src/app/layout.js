import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/Component/Footer";
import Navbar from "@/Component/Navbar";
import BackToTop from "@/Component/BackToTop";
import AriaAssistant from "@/Component/AriaAssistant";
import ReadingProgress from "@/Component/ReadingProgress";
import GoogleTranslateLoader from "@/Component/GoogleTranslateLoader";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Freevance",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <GoogleTranslateLoader/>
        <ReadingProgress />
        <Navbar />
        {children}
        <Footer />
        <BackToTop />
        <AriaAssistant />
      </body>
    </html>
  );
}
