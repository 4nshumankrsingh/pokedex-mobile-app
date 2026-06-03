/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Pokédex UI
        "pokedex-red": "#CC0000",
        "pokedex-dark-red": "#990000",
        "pokedex-screen": "#1a1a2e",
        "pokedex-panel": "#16213e",
        "pokedex-border": "#0f3460",
        "bg-dark": "#0d0d1a",
        "bg-card": "#1e1e30",
        "bg-input": "#2a2a3e",
        // Type colors
        "type-normal": "#A8A878",
        "type-fire": "#F08030",
        "type-water": "#6890F0",
        "type-electric": "#F8D030",
        "type-grass": "#78C850",
        "type-ice": "#98D8D8",
        "type-fighting": "#C03028",
        "type-poison": "#A040A0",
        "type-ground": "#E0C068",
        "type-flying": "#A890F0",
        "type-psychic": "#F85888",
        "type-bug": "#A8B820",
        "type-rock": "#B8A038",
        "type-ghost": "#705898",
        "type-dragon": "#7038F8",
        "type-dark": "#705848",
        "type-steel": "#B8B8D0",
        "type-fairy": "#EE99AC",
      },
      fontFamily: {
        mono: ["ShareTechMono"],
        sans: ["Nunito_400Regular"],
        semibold: ["Nunito_600SemiBold"],
        bold: ["Nunito_700Bold"],
      },
    },
  },
  plugins: [],
};
