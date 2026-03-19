// import { Geist, Geist_Mono } from "next/font/google";
// // import "./globals.css";
// import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "@/scss/main.scss";
// import "@/scss/res.scss";

// import { ToastContainer } from "react-toastify";
// import { GlobalProvider } from "@/context/GlobalContext";
// import Script from "next/script";
// import FaviconUpdater from "@/components/FaviconUpdater";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata = {
//   title: "Breakout",
//   description: "Breakout",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       {/* Google Tag Manager Script */}
//       <Script
//         async
//         src="https://www.googletagmanager.com/gtag/js?id=G-6XBND8CS7Q"
//       />

//       <Script id="google-analytics">
//         {`
//           window.dataLayer = window.dataLayer || [];
//   function gtag(){dataLayer.push(arguments);}
//   gtag('js', new Date());
//   gtag('config', 'G-6XBND8CS7Q');
//         `}
//       </Script>
//       <body className={`${geistSans.variable} ${geistMono.variable}`}>
//         <GlobalProvider>
//         <FaviconUpdater />
//           <ToastContainer />
//           {children}
//         </GlobalProvider>
//       </body>
//     </html>
//   );
// }

import { Geist, Geist_Mono } from "next/font/google";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "@/scss/main.scss";
import "@/scss/res.scss";

import { ToastContainer } from "react-toastify";
import { GlobalProvider } from "@/context/GlobalContext";
import Script from "next/script";
import FaviconUpdater from "@/components/FaviconUpdater";

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
      <head>
        {/* ✅ Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-NJTFSXM3');
            `,
          }}
        />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* ✅ GTM NoScript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <GlobalProvider>
          <FaviconUpdater />
          <ToastContainer />
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}