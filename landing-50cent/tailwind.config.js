// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: [
  //   "./app/*.{js,jsx,ts,tsx}",
  //   "./app/**/*.{js,jsx,ts,tsx}",
  //   "./components/*.{js,jsx,ts,tsx}",
  //   "./components/**/*.{js,jsx,ts,tsx}",
  // ],
  // content: [
  //   "./app/**/*.{js,jsx,ts,tsx}",
  //   "./components/**/*.{js,jsx,ts,tsx}"
  // ], 
  safelist: [
    'bg-green-500',
    'test-xyz', 
    'focus:ring-red-400'
    // любые другие «пропадающие» классы
  ], 
  content: {
    files: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
    extract: {
      DEFAULT: (text) => text.match(/[\w-\/:\[\]]+/g) || [],
    },
  },
  // extract: {
  //   // для всех типов файлов используем «жирную» регулярку, которая
  //   // точно выцепит строки вроде "absolute", "bg-black/50"
  //   DEFAULT: (text) => {
  //     return text.match(/[\w-/:\[\]]+/g) || [];
  //   }
  // },
   
  theme: {
    extend: {
      colors: {
        primary:   "#000000",
        accent:    "#C2954A",
        danger:    "#E02424",
        lightGray: "#F5F5F5",
        darkGray:  "#333333",
        dark: "#1E1E1E"
      },
      fontFamily: {
        heading: ["Montserrat", "sans-serif"],
        body:    ["Oswald",    "sans-serif"],
        bebas: ['var(--font-bebas)', 'sans-serif'], 
        roboto: ['var(--font-roboto)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
