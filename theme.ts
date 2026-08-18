import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        bistre: {
          50: { value: "#f3efe9" },
          100: { value: "#ddd3c5" },
          300: { value: "#7a5e3c" },
          500: { value: "#261606" },
          700: { value: "#1a0f04" },
          900: { value: "#120a03" },
        },
        cream: {
          400: { value: "#f6f1ea" },
          500: { value: "#efe6dd" },
          600: { value: "#e2d5c6" },
        },
        navy: {
          400: { value: "#15478c" },
          500: { value: "#0b2c5c" },
          600: { value: "#061a3b" },
          700: { value: "#020b1c" },
        },
        aureolin: {
          500: { value: "#fbe311" },
        },
        lime: {
          500: { value: "#d3f00a" },
        },
        butter: {
          500: { value: "#ffefb3" },
        },
        violet: {
          500: { value: "#321847" },
        },
        green: {
          500: { value: "#013e37" },
        },
      },
      fonts: {
        heading: { value: "'Inter', -apple-system, sans-serif" },
        body: { value: "'Inter', -apple-system, sans-serif" },
      },
    },
    semanticTokens: {
      colors: {
        "brand.solid": { value: "{colors.navy.500}" },
        "brand.contrast": { value: "white" },
        "brand.fg": { value: "{colors.navy.500}" },
        "brand.muted": { value: "{colors.navy.400}" },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
