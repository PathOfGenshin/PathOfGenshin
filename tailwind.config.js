module.exports = {
  purge: ["./src/**/*.js", "./src/**/*.ts", "./src/**/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "g-quality-5": "#bd6932",
        "g-quality-5-dark": "#915229",
        "g-char": "#719954",
        "g-char-selected-fill": "#68ddff",
        "g-char-selected": "#80fffd",
        "g-dark-900": "#1c1c22",
        "g-dark-800": "#2a2a33",
        "g-dark-750": "#363640",
        "g-dark-700": "#43434f",
        "g-dark-600": "#4a5366",
        "g-paper": "#ece5d8",
        "g-cons-electro": "#44295b",
      },
      textColor: {
        "g-dark-2": "#d3bc8e",
        "g-dark-1": "#ece5d8",
        "g-dark-0": "#fffdfa",
        "g-paper-0": "#39444f",
        "g-talent-lvlboost": "#00ffff"
      },
      fontFamily: {
        genshin: ["Genshin", "sans-serif"],
      },
      maxHeight: {
        38: "9.5rem",
      },
      height: {
        18: "4.5rem",
        38: "9.5rem",
      },
      maxWidth: {
        82: "20.5rem",
      },
      width: {
        18: "4.5rem",
        82: "20.5rem",
      },
      letterSpacing: {
        card: "-0.0375em",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
