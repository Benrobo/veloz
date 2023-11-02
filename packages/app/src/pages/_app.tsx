import { ComponentLayout } from "@/components/Layout";
import { jbR, jbSB, ppB, ppEB, ppL, ppReg, ppSB } from "@/config/font";
import DataContextProvider from "@/context/DataContext";
import LayoutContextProvider from "@/context/LayoutContext";
import ProjectContextProvider from "@/context/ProjectContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

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
            --font-jbR: ${jbR.style.fontFamily};
            --font-jbSB: ${jbSB.style.fontFamily};
          }
        `}
      </style>
      <LayoutContextProvider>
        <DataContextProvider>
          <ProjectContextProvider>
            <ComponentLayout>
              <Component {...pageProps} />
            </ComponentLayout>
            <Toaster />
          </ProjectContextProvider>
        </DataContextProvider>
      </LayoutContextProvider>
    </>
  );
}
