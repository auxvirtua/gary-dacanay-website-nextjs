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
        "gold": "hsl(45,90%,70%)",
        "gold-dark": "hsl(45,90%,40%)",
        "gold-light": "hsl(45,90%,80%)",
      },
    },
  },
  plugins: [],
};
export default config;
