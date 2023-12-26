import { Poppins, Fira_Sans, JetBrains_Mono } from "next/font/google";

export const ppReg = Poppins({
  subsets: ["latin", "latin-ext"],
  variable: "--font-ppReg",
  display: "swap",
  weight: ["500"],
});

export const ppL = Poppins({
  subsets: ["latin", "latin-ext"],
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

// Fira code
export const jbR = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbR",
  display: "swap",
  weight: ["300"],
});

export const jbSB = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbSB",
  display: "swap",
  weight: ["400"],
});

export const jbEB = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbEB",
  display: "swap",
  weight: ["800"],
});
