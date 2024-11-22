/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",

  darkMode: "class",
  content: ["./src/**/*.{tsx,html}"],
  plugins: [],
  theme: {
    extend: {
      boxShadow: {
        button_hover: "0px 0px 6px 0px rgba(198, 231, 255, 0.5)",
        form_shadow: " 0px 0px 4px 0px rgba(0, 0, 0, 0.25)"
      },
      colors: {
        text: {
          primary: "#333333",
          gray: "rgba(51, 51, 51, 0.5)",
          accent: "#288DD5"
        },
        card: {
          blue: "#C6E7FF",
          red: "#FC8972",
          yellow: "#FEEE91",
          purple: "#CDC1FF",
          green: "#D0E8C5",
          gray: "#A6AEBF"
        },
        background: {
          page: "#FDFEFF",
          sidebar: "#ECEFF6",
          grey: "#F7F8FB",
          dark_grey: "#B7B7B7",
          blue: "#BFDEF5",
          dark_blue: "#436B88"
        },
        accent: "#288DD5",
        error: "#FC8972",
        successful: "#76925D"
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"]
      }
    }
  }
}
