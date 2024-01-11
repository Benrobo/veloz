import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import { Brand } from "./components/theme";
import { RenderSidebarIcon } from "./components/sideBar";
import Footer from "./components/footer";
import siteConfig from "./config/site";

const config: DocsThemeConfig = {
  logo: <Brand />,
  project: {
    link: null,
  },
  chat: {
    link: siteConfig.social.discord,
  },
  // docsRepositoryBase: "",
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
  useNextSeoProps() {
    return {
      titleTemplate: "%s – Veloz Doc",
    };
  },
};

export default config;
