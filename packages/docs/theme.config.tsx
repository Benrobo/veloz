import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import { Brand } from "./components/theme";
import { RenderSidebarIcon } from "./components/sideBar";

const config: DocsThemeConfig = {
  logo: <Brand />,
  project: {
    link: null,
  },
  chat: {
    link: "https://discord.com",
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
      if (title.toLowerCase() === "zeus") {
        return <RenderSidebarIcon title={title} />;
      }
      return title;
    },
  },
  useNextSeoProps() {
    return {
      titleTemplate: "%s – Veloz Doc",
    };
  },
};

export default config;

function Footer() {
  return (
    <div className="w-full bg-red-200">
      <p>Footer</p>
    </div>
  );
}
