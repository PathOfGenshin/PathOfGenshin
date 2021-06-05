module.exports = {
  mode: "jit",
  purge: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx"],
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
        "g-dark-500": "#606979",
        "g-paper": "#ece5d8",
        "g-paper-dialog": "#e5e2dd",
        "g-paper-dialog-border": "#dacdc0",
        "g-button-focus": "#ffeccb",
        "g-button-focus-ring": "#aba9a8",
        "g-button-hover": "#ffe6b2",
        "g-dark-2": "#d3bc8e",
        "g-dark-1": "#ece5d8",
        "g-dark-0": "#fffdfa",
      },
      textColor: {
        "g-dark-2": "#d3bc8e",
        "g-dark-1": "#ece5d8",
        "g-dark-0": "#fffdfa",
        "g-paper-0": "#3b4255",
        "g-char-selected": "#80fffd",
        "g-char-selected-fill": "#68ddff",
        "g-button-focus": "#a1927d",
        "g-talent-lvlboost": "#00ffff",
      },
      fontFamily: {
        genshin: ["Genshin", "serif"],
      },
      borderWidth: {
        3: "3px",
      },
      maxHeight: {
        38: "9.5rem",
        47: "11.75rem",
      },
      height: {
        7.5: "1.875rem",
        13.5: "3.375rem",
        18: "4.5rem",
        38: "9.5rem",
      },
      maxWidth: {
        82: "20.5rem",
      },
      width: {
        13.5: "3.375rem",
        18: "4.5rem",
        82: "20.5rem",
      },
      lineHeight: {
        7.5: "1.875rem",
      },
      inset: {
        "-8/3r": "-0.66667rem",
      },
      gridTemplateColumns: {
        "auto-icon-6": "repeat(auto-fit, 6rem)",
        "auto-icon-8": "repeat(auto-fit, 8rem)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
