import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import { Brand } from "./components/theme";

const config: DocsThemeConfig = {
  logo: <Brand />,
  project: {
    link: "https://github.com/shuding/nextra-docs-template",
  },
  chat: {
    link: "https://discord.com",
  },
  docsRepositoryBase: "https://github.com/veloz-org",
  footer: {
    text: "Veloz",
    component: <Footer />,
  },
  components: {
    Footer,
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
