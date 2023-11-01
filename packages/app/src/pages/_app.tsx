import { ComponentLayout } from "@/components/Layout";
import { ppB, ppEB, ppL, ppReg, ppSB } from "@/config/font";
import DataContextProvider from "@/context/DataContext";
import LayoutContextProvider from "@/context/LayoutContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-ppReg: ${ppReg.style.fontFamily};
            --font-ppB: ${ppB.style.fontFamily};
            --font-ppEB: ${ppEB.style.fontFamily};
            --font-ppSB: ${ppSB.style.fontFamily};
            --font-ppL: ${ppL.style.fontFamily};
          }
        `}
      </style>
      <LayoutContextProvider>
        <DataContextProvider>
          <ComponentLayout>
            <Component {...pageProps} />
          </ComponentLayout>
        </DataContextProvider>
      </LayoutContextProvider>
    </>
  );
}
