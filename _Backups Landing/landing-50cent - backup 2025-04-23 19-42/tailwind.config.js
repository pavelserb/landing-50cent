/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,jsx,ts,tsx}",
      "./components/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {
          colors: {
            primary:   "#000000",
            accent:    "#C2954A",
            danger:    "#E02424",
            lightGray: "#F5F5F5",
            darkGray:  "#333333",
          },
          fontFamily: {
            heading: ["Montserrat", "sans-serif"],
            body:    ["Oswald",    "sans-serif"],
          },
        },
      },
      plugins: [],
  }
  