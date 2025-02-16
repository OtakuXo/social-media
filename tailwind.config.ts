import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#edf0f9",
        foreground: "#171717",
        color1: "#ebb1a3",
        color2: "#0073b6",
        color3: "#a6432d",
        color4: "#f9fcff ",
      },
    },
  },
  plugins: [],
};
export default config;
