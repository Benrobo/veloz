export const tailwind_directives = `
@tailwind base;
@tailwind components;
@tailwind utilities;
{{hosted_react_font}}
`;

export const postcssConfig = `
export default {
  plugins: {
    tailwindcss: {},
  }
};
`;

// if tailwindcss isn't selected
export const react_app_css = `
/* Add your global styles here, if any */

/* Styles for the provided component */
.flex-container {
  display: flex;
}

.center-screen {
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.background-white {
  background-color: #ffffff;
}

.rounded-card {
  border-radius: 1rem;
}

.shadow-box {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.padding-card {
  padding-left: 4rem;
  padding-right: 4rem;
  padding-top: 3.5rem;
  padding-bottom: 3.5rem;
}

.flex-center {
  display: flex;
  justify-content: center;
}

.emoji {
  font-size: 4em;
}

.text-dark-gray {
  color: #4a5568;
}

.margin-title {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.text-center {
  text-align: center;
}

.text-large {
  font-size: 1.875rem;
}

.font-bold {
  font-weight: 600;
}

.text-gray {
  color: #718096;
}

.width-230 {
  width: 230px;
}

.font-regular {
  font-weight: 400;
}
`;
