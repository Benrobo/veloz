import { Poppins, Bricolage_Grotesque } from "next/font/google";

export const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "600", "700", "900", "100", "200", "500"],
});

export const ppReg = Poppins({
  subsets: ["latin"],
  variable: "--font-ppReg",
  weight: ["400"],
});

export const ppL = Poppins({
  subsets: ["latin"],
  variable: "--font-ppL",
  weight: ["300"],
});

// bold poppins
export const ppB = Poppins({
  subsets: ["latin"],
  variable: "--font-ppB",
  weight: ["600"],
});

// extra bold
export const ppSB = Poppins({
  subsets: ["latin"],
  variable: "--font-ppSB",
  weight: ["600"],
});

export const ppEB = Poppins({
  subsets: ["latin"],
  variable: "--font-ppEB",
  weight: ["900"],
});

// bricolage font
export const blEB = Bricolage_Grotesque({
  variable: "--font-blEB",
  weight: ["800"],
  subsets: ["latin", "latin-ext"],
});
