import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      backgroundColor: {
        primary: "#003A49",
        secondaryBrandColorSecondary: "#003A49",
        grey: "#E6E6E6",
        neutral: "#EDF2E1",
      },
      textColor: {
        black: " #000",
        grey: "#E6E6E6",
        functionalColorsSuccess: "#17d05b",
        white: "#FFFFFF",
      },

      tint: {
        tintColorsTint100: "#979992",
        tintColorsTint200: "#6F7269",
        tintColorsTint300: "#5C5F54",
      },

      shade: {
        shadeColorsShade100: "#1A2600",
        shadeColorsShade200: "#151E00",
        shadeColorsShade300: "#0D1300",
      },

      neutral: {
        neutralColors100: "#F9FAF7",
        neutralColors200: "#F3F5EE",
        neutralColors300: "#EFF2E6",
        neutralColors400: "#EDF2E1",
      },
      functional: {
        functionalColorsDanger: "#F30039",
        functionalColorsSuccess: "#17d05b",
        functionalColorsInfo: "#4272DD",

        functionalLightColorsDanger100: "#FDCCD7",
        functionalLightColorsDanger200: "#FBB3C4",

        functionalLightColorsSuccess100: "#D1F6DE",
        functionalLightColorsSuccess200: "#B9F1CE",

        functionalLightColorsInfo100: "#D9E3F8",
        functionalLightColorsInfo200: "#C6D5F5",

        functionalLightColorsWarning: "#FFBD66",
        functionalLightColorsWarning100: "#FFF2E0",
        functionalLightColorsWarning200: "#FFEBD1",
      },
    },
  },
  daisyui: {
    themes: ["light"],
  },
  plugins: [require("daisyui")],
};
export default config;
