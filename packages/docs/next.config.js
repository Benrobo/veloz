const { remarkCodeHike } = require("@code-hike/mdx");

const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  mdxOptions: {
    remarkPlugins: [
      [
        remarkCodeHike,
        {
          theme: "github-dark-dimmed",
          showCopyButton: true,
          lineNumbers: true,
        },
      ],
    ],
  },
});

module.exports = withNextra();
