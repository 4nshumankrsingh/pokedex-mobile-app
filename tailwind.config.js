/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Pokédex brand colors
        "pokedex-red": "#E53E3E",
        "pokedex-red-dark": "#D32F2F",
        "pokedex-blue": "#4C7DF0",
        "pokedex-blue-dark": "#2563EB",
        "pokedex-green": "#16A34A",
        "pokedex-yellow": "#FFCC33",

        // Digital screen colors
        "screen-bg": "#13141C",
        "screen-text": "#4ADE80",
        "screen-border": "#1E40AF",
        "bg-dark": "#09090B",
        "bg-card": "#1A1D29",
        "bg-input": "#262A3D",
        "pokedex-panel": "#13141C",
        "pokedex-border": "#1E40AF",
        "type-normal": "#8E9B92",
        "type-fire": "#E8772E",
        "type-water": "#3B5FE0",
        "type-electric": "#FFD500",
        "type-grass": "#36A832",
        "type-ice": "#5CE0E0",
        "type-fighting": "#A8201D",
        "type-poison": "#B340B3",
        "type-ground": "#E0B82E",
        "type-flying": "#8FA3E8",
        "type-psychic": "#E0508C",
        "type-bug": "#8C9B2E",
        "type-rock": "#A88A1D",
        "type-ghost": "#6B4FA0",
        "type-dragon": "#7C2EE0",
        "type-dark": "#4A372E",
        "type-steel": "#9099A8",
        "type-fairy": "#E08FC4",
      },
      fontFamily: {
        digital: ["Orbitron"],
        mono: ["RobotoMono_400Regular"],
        "mono-medium": ["RobotoMono_500Medium"],
        "mono-semibold": ["RobotoMono_600SemiBold"],
        "mono-bold": ["RobotoMono_700Bold"],
      },
    },
  },
  plugins: [],
};
