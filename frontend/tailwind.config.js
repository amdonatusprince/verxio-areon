// import type { Config } from "tailwindcss";

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "dashboard-header":
          "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)",
        card: "0px 2px 4px -2px rgba(16, 24, 40, 0.06), 0px 4px 8px -2px rgba(16, 24, 40, 0.10)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        // "post-hero-img": "url('/src/assets/post-bg-img.png')",
        // 'settings-hero-img': "url('/src/assets/settings-hero.png')",
      },
      fontFamily: {
        // lato: "var(--lato)",
        // poppins: "var(--poppins)",
        inter: "var(--inter)",
      },
      colors: {
        primary: "#0D0E32",
        secondary: "#F4801D",
        white: "#FBFBFE",
        black: "#101128",
        error: "#EF4444",
        grey: "#636488",
        "gray-300": "#9595B2",
        "gray-500": "#636488",
        "gray-700": "#3C3D53",
        "green-400": "#B5D558",
      },
      boxShadowColor: {
        primary: "0px 2px 18px 0px rgba(0, 0, 0, 0.05)",
      },
      customScrollbar: {
        "scrollbar-width": "none", // For Firefox and some other browsers
        "::-webkit-scrollbar": {
          width: "0", // For webkit browsers (Chrome, Safari)
        },
        "::-webkit-scrollbar-thumb": {
          background: "transparent", // For webkit browsers (Chrome, Safari)
        },
      },
    },
  },
  plugins: [],
};
export default config;
