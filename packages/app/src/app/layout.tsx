"use client";
import { ppReg, ppB, ppEB, ppSB, ppL, jbEB, jbR, jbSB } from "@/config/font";
import "../styles/globals.css";
import NextAuthProvider from "@/providers/NextAuthProvider";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LayoutContextProvider from "@/context/LayoutContext";
import DataContextProvider from "@/context/DataContext";
import NextTopLoader from "@/components/TopLoader";
import Seo from "@/components/Seo";
import Head from "next/head";
import { PropsWithChildren } from "react";

// tanstack reqct query
const queryClient = new QueryClient();

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className="dark">
      <Seo />
      <Head>
        {/* Pirsch Analytics */}
        <script
          defer
          type="text/javascript"
          src="https://api.pirsch.io/pirsch-extended.js"
          id="pirschextendedjs"
          data-code="m1JWwnX2AnjyV6XJhZQPc6SkEvhepiub"
        ></script>
      </Head>
      <body
        className="h-screen hideScrollBar2 scroll-smooth dark:bg-dark-100 bg-white-100"
        suppressHydrationWarning
      >
        <style jsx global>
          {`
            :root {
              --font-ppReg: ${ppReg.style.fontFamily};
              --font-ppB: ${ppB.style.fontFamily};
              --font-ppEB: ${ppEB.style.fontFamily};
              --font-ppSB: ${ppSB.style.fontFamily};
              --font-ppL: ${ppL.style.fontFamily};
              --font-jbR: ${jbR.style.fontFamily};
              --font-jbSB: ${jbSB.style.fontFamily};
              --font-jbEB: ${jbEB.style.fontFamily};
            }
          `}
        </style>
        <QueryClientProvider client={queryClient}>
          <NextAuthProvider>
            {/* LayoutContext (Needed for protected routes that need shared layout) */}
            <LayoutContextProvider>
              <DataContextProvider>{children}</DataContextProvider>
            </LayoutContextProvider>
            {/* @ts-expect-error */}
            <Toaster />
          </NextAuthProvider>
        </QueryClientProvider>

        {/* Show loading state during page navigation */}
        <NextTopLoader color="#3770fe" showSpinner />
      </body>
    </html>
  );
}
