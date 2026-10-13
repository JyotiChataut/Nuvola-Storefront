/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: "#FFFDF9",
          soft: "#F7F4EE",
          strong: "#EDEAD3",
        },
        ink: {
          DEFAULT: "#1A1A17",
          body: "#3D3D37",
          muted: "#605E56",
          soft: "#807D73",
        },
        forest: {
          DEFAULT: "#2D6A4F",
          hover: "#1B4332",
          disabled: "#749A86",
        },
        sage: {
          DEFAULT: "#6B8F71",
          light: "#D4E2D4",
        },
        hairline: {
          DEFAULT: "#D5D1C7",
          soft: "#E8E4DB",
          strong: "#7A7668",
        },
        terracotta: {
          DEFAULT: "#8B4F21",
        },
        vermilion: {
          DEFAULT: "#C4301C",
        },
        amber: {
          DEFAULT: "#8B6914",
        },
      },
      borderRadius: {
        sm: "6px",
        md: "8px",
        lg: "12px",
      },
      boxShadow: {
        raised:
          "0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px -1px rgba(0, 0, 0, 0.08)",
        overlay:
          "0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.08)",
        lift: "0 4px 10px -3px rgba(26, 26, 23, 0.12), 0 2px 4px -2px rgba(26, 26, 23, 0.08)",
        "lift-lg":
          "0 16px 32px -12px rgba(26, 26, 23, 0.18), 0 6px 14px -8px rgba(26, 26, 23, 0.10)",
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      fontSize: {
        "display-xl": [
          "32px",
          { lineHeight: "1.20", letterSpacing: "-0.02em" },
        ],
        "display-lg": [
          "24px",
          { lineHeight: "1.25", letterSpacing: "-0.01em" },
        ],
        "display-md": ["20px", { lineHeight: "1.30", letterSpacing: "0" }],
        "title-md": ["16px", { lineHeight: "1.35", letterSpacing: "0" }],
        "title-sm": ["14px", { lineHeight: "1.40", letterSpacing: "0" }],
        "price-lg": ["24px", { lineHeight: "1.20", letterSpacing: "-0.01em" }],
        "price-md": ["16px", { lineHeight: "1.25", letterSpacing: "0" }],
        "body-md": ["16px", { lineHeight: "1.50", letterSpacing: "0" }],
        "body-sm": ["14px", { lineHeight: "1.43", letterSpacing: "0" }],
        caption: ["12px", { lineHeight: "1.33", letterSpacing: "0" }],
        badge: ["11px", { lineHeight: "1.18", letterSpacing: "0.02em" }],
      },
    },
  },
  plugins: [],
};
