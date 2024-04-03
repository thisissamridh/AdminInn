import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "media",
  content: [
    "node_modules/flowbite-react/lib/esm/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {

  },
  plugins: [
    require("flowbite/plugin")
  ],
};
export default config;
