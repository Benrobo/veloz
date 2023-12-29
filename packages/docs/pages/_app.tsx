import { ppReg, ppB, ppEB, ppSB, ppL, blEB } from "../config/font";
import "../style/global.css";

export default function MyApp({ Component, pageProps }) {
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
            --font-blEB: ${blEB.style.fontFamily};
          }
        `}
      </style>
      <div className={"font-ppReg"}>
        <Component {...pageProps} />
      </div>
    </>
  );
}
