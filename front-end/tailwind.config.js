/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'caveat': ['var(--font-caveat)', 'Caveat', 'cursive'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          bg: "var(--card-bg)",
          fg: "var(--card-fg)",
          muted: "var(--card-muted)",
        },
      },
    },
  },
  plugins: [],
}