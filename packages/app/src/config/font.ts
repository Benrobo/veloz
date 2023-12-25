import { Poppins, Fira_Sans, JetBrains_Mono } from "next/font/google";

export const ppReg = Poppins({
  subsets: ["latin", "latin-ext"],
  variable: "--font-ppReg",
  // preload: true,
  weight: ["400"],
});

export const ppL = Poppins({
  subsets: ["latin", "latin-ext"],
  variable: "--font-ppL",
  // preload: false,
  weight: ["300"],
});

// bold poppins
export const ppB = Poppins({
  subsets: ["latin"],
  variable: "--font-ppB",
  // preload: false,
  weight: ["600"],
});

// extra bold
export const ppSB = Poppins({
  subsets: ["latin"],
  variable: "--font-ppSB",
  // preload: false,
  weight: ["600"],
});

export const ppEB = Poppins({
  subsets: ["latin"],
  variable: "--font-ppEB",
  // preload: false,
  weight: ["900"],
});

// Fira code
export const jbR = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbR",
  // preload: false,
  weight: ["300"],
});

export const jbSB = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbSB",
  // preload: false,
  weight: ["400"],
});

export const jbEB = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbEB",
  // preload: false,
  weight: ["800"],
});
