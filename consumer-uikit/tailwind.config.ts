import twPreset from "@lucasslivero/uikit/tailwind-preset";
import type { Config } from "tailwindcss";

const config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  corePlugins: {
    preflight: false,
  },
  presets: [twPreset],
} satisfies Config;

export default config;
