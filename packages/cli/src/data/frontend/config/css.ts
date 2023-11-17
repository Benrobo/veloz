export const tailwind_directives = `
{{hosted_react_font}}
@tailwind base;
@tailwind components;
@tailwind utilities;
`;

export const postcssConfig = `
export default {
  plugins: {
    tailwindcss: {},
  }
};
`;
