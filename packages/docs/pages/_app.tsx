import Head from "next/head";
import {
  ppReg,
  ppB,
  ppEB,
  ppSB,
  ppL,
  blEB,
  poppins,
  blReg,
  blSB,
} from "../config/font";
import "../style/global.css";
import "@code-hike/mdx/styles";
import Seo from "../components/seo";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <Seo />
        <style jsx global>
          {`
            :root {
              --font-ppReg: ${ppReg.style.fontFamily};
              --font-ppB: ${ppB.style.fontFamily};
              --font-ppEB: ${ppEB.style.fontFamily};
              --font-ppSB: ${ppSB.style.fontFamily};
              --font-ppL: ${ppL.style.fontFamily};
              --font-blEB: ${blEB.style.fontFamily};
              --font-blReg: ${blReg.style.fontFamily};
              --font-blSB: ${blSB.style.fontFamily};
            }
          `}
        </style>
      </Head>
      <div className={ppReg.className}>
        <Component {...pageProps} />
      </div>
    </>
  );
}
