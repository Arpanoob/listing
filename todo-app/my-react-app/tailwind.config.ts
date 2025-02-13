import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        customRed: "red", // Use a valid key instead of "q"
      },
    },
  },
  plugins: [],
};

export default config;
