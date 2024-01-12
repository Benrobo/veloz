import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import { Brand } from "./components/theme";
import { RenderSidebarIcon } from "./components/sideBar";
import Footer from "./components/footer";
import siteConfig from "./config/site";
import Seo from "./components/seo";

const config: DocsThemeConfig = {
  logo: <Brand />,
  project: {
    link: null,
  },
  chat: {
    link: siteConfig.social.discord,
  },
  feedback: {
    content: null,
  },
  editLink: {
    component: null,
  },
  footer: {
    text: "Veloz",
    component: <Footer />,
  },
  components: {
    Footer,
  },
  darkMode: false,
  nextThemes: {
    defaultTheme: "dark",
    forcedTheme: "dark",
  },
  sidebar: {
    titleComponent({ title, type }) {
      return <RenderSidebarIcon title={title} type={type} />;
    },
    toggleButton: true,
  },
  head: <Seo />,
  useNextSeoProps() {
    return {
      titleTemplate: "%s – Veloz Doc",
      title: siteConfig.headline,
      description: siteConfig.description,
      openGraph: {
        title: siteConfig.headline,
        description: siteConfig.description,
        type: "website",
        site_name: "Veloz",
      },
      twitter: {
        handle: "@tryveloz",
        site: "@tryveloz",
        cardType: "summary_large_image",
      },
    };
  },
};

export default config;
