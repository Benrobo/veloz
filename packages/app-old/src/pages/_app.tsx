import { jbEB, jbR, jbSB, ppB, ppEB, ppL, ppReg, ppSB } from "@/config/font";
import DataContextProvider from "@/context/DataContext";
import LayoutContextProvider from "@/context/LayoutContext";
// import ProjectContextProvider from "@/context/ProjectContext";
import "@/styles/globals.css";
import "@radix-ui/themes/styles.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { Theme } from "@radix-ui/themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import Router, { useRouter } from "next/router";
import nProgress from "nprogress";
import "../styles/globals.css";
import "../styles/nprogress.css";
import MiniMenu from "@/components/Navbar/MiniMenu";
import Head from "next/head";
import Seo from "@/components/Seo";
import { Analytics } from "@vercel/analytics/react";

const queryClient = new QueryClient();

// nprogress loader
Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const pathname = router.pathname;

  // prevent the minimenu from showing on protected pages
  const protectedPages = [
    "/dashboard",
    "/kits",
    "/settings",
    "/kits/parent/[parent]",
    "/kits/parent/child/[name]",
  ];

  return (
    <>
      <Head>
        <Seo />
        <script
          defer
          type="text/javascript"
          src="https://api.pirsch.io/pirsch-extended.js"
          id="pirschextendedjs"
          data-code="TLjbfbXrvpqyWi4t8ZrTSPOvgwl3hbd1"
          // data-dev="tryveloz.com"
        ></script>
      </Head>
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
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <DataContextProvider>
            <LayoutContextProvider>
              {/* <ComponentLayout> */}
              <Theme>
                <Component {...pageProps} />

                {!protectedPages.includes(pathname) && <MiniMenu />}
              </Theme>
              {/* </ComponentLayout> */}
              <Toaster />
              <Analytics />
            </LayoutContextProvider>
          </DataContextProvider>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}