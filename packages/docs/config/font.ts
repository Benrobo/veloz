import { Poppins, Bricolage_Grotesque } from "next/font/google";

export const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["300", "400", "600", "700", "900", "100", "200", "500"],
});

export const ppReg = Poppins({
  subsets: ["latin"],
  variable: "--font-ppReg",
  display: "swap",
  weight: ["400"],
});

export const ppL = Poppins({
  subsets: ["latin"],
  variable: "--font-ppL",
  display: "swap",
  weight: ["300"],
});

// bold poppins
export const ppB = Poppins({
  subsets: ["latin"],
  variable: "--font-ppB",
  display: "swap",
  weight: ["600"],
});

// extra bold
export const ppSB = Poppins({
  subsets: ["latin"],
  variable: "--font-ppSB",
  display: "swap",
  weight: ["600"],
});

export const ppEB = Poppins({
  subsets: ["latin"],
  variable: "--font-ppEB",
  display: "swap",
  weight: ["900"],
});

// bricolage font
export const blEB = Bricolage_Grotesque({
  variable: "--font-blEB",
  display: "swap",
  weight: ["800"],
  subsets: ["latin", "latin-ext"],
});

export const blReg = Bricolage_Grotesque({
  variable: "--font-blEB",
  display: "swap",
  weight: ["400"],
  subsets: ["latin", "latin-ext"],
});

export const blSB = Bricolage_Grotesque({
  variable: "--font-blSB",
  display: "swap",
  weight: ["600"],
  subsets: ["latin", "latin-ext"],
});
