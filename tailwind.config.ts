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
        primary: "#0c0c0c",
        skyBlue: "#BBD7EC",
        border: "#687680",
        bg: "#292929",
        fade: "#434343",
        offWhite: "#e1e1e1",
      },
    },
  },
  plugins: [],
};
export default config;
