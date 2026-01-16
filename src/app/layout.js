import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "@/scss/main.scss";
import "@/scss/res.scss";

import { ToastContainer } from "react-toastify";
import { GlobalProvider } from "@/context/GlobalContext";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Breakout",
  description: "Breakout",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Google Tag Manager Script */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-6XBND8CS7Q"
      />

      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-6XBND8CS7Q');
        `}
      </Script>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <GlobalProvider>
          <ToastContainer />
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}
