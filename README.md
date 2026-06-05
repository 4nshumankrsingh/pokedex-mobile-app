# Pokédex Mobile App

A React Native mobile application built with Expo, TypeScript, and NativeWind, powered by PokéAPI. This project is a mobile extension of my existing Pokédex web application, rebuilt from the ground up as a native mobile experience with a custom UI system, animated navigation, and a fully typed API layer.

## About The Project

This app allows users to:

- Browse and search all Pokémon by name or ID
- View detailed Pokémon information — stats, types, abilities, height, weight, evolution chains, moves, and more
- Browse Pokémon by type with damage relation charts
- Explore moves, items, generations, regions, natures, and other game data
- Experience a clean, Pokédex-themed mobile UI with custom animations and haptic feedback

All data is fetched in real-time from PokéAPI with React Query handling caching, background refetching, and loading states.

## Existing Web Version

I previously built a Pokédex website using Next.js 15.

👉 [Pokédex Web App](https://pokedex-two-gold.vercel.app)  
👉 [Web App Repository](https://github.com/4nshumankrsingh/pokedex)

## Tech Stack

- **Framework:** React Native, Expo SDK 54
- **Language:** TypeScript
- **Routing:** Expo Router v6 (file-based)
- **Styling:** NativeWind v4 (Tailwind CSS for React Native)
- **State Management:** Zustand
- **Server State & Caching:** TanStack React Query v5
- **Animations:** React Native Reanimated v3
- **Icons:** Lucide React Native, Expo Vector Icons
- **Images:** Expo Image
- **Fonts:** Share Tech Mono, Nunito (via expo-font)
- **Lists:** FlashList (@shopify/flash-list)
- **API:** PokéAPI (https://pokeapi.co)

## Installation

Clone the repository:

```bash
git clone https://github.com/4nshumankrsingh/pokedex-mobile-app.git
```

Navigate into the project directory:

```bash
cd pokedex-mobile-app
```

Install dependencies:

```bash
npm install
```

Download the following fonts and place them in `assets/fonts/`:

- `ShareTechMono-Regular.ttf` — [Google Fonts](https://fonts.google.com/specimen/Share+Tech+Mono)
- `Nunito-Regular.ttf`, `Nunito-SemiBold.ttf`, `Nunito-Bold.ttf` — [Google Fonts](https://fonts.google.com/specimen/Nunito)

## Running The App

Start the Expo development server:

```bash
npx expo start
```

Scan the QR code using the Expo Go app on your phone, or run on an emulator:

```bash
npx expo start --android
npx expo start --ios
```

## Current Progress

### Completed

**Foundation & Configuration**
Project scaffolding with Expo Router, TypeScript, NativeWind v4, React Query, and Zustand. Pokémon type color palette, UI color constants, font references, and all PokeAPI endpoint builders centralised in `constants/`.

**Loading Screen**
Animated entry screen using the Pokédex loading image with a Reanimated progress bar, pulsing text, and a fade-out transition into the main app.

**Navigation Shell**
Custom animated tab bar with five tabs — Pokédex, Types, Moves, Items, and More — featuring Lucide icons, haptic feedback on tab press, and an animated active indicator.

**API Layer**
Fully typed TypeScript interfaces for all PokeAPI response shapes across Pokémon, evolution chains, moves, types, abilities, items, and miscellaneous game data. Typed fetch functions and React Query hooks covering all 30+ API endpoints.

### In Progress / Upcoming

- **Pokédex Tab** — Search by name or ID with autocomplete, type filter, random Pokémon button, and full Pokémon detail view with stats, abilities, evolution chain, moves, and flavor text
- **Types Tab** — All 18 type cards with damage relation charts and Pokémon listings per type
- **Moves Tab** — Paginated move browser with detail screens covering power, accuracy, PP, and contest data
- **Items Tab** — Item browser with fling effect data and detail screens
- **More Tab** — Grid menu linking to generations, regions, natures, growth rates, characteristics, and other game data
- **Skeleton loaders** — Shimmer loading states across all list and detail screens
- **Error and empty states** — Graceful handling of failed API calls
- **FlashList optimisation** — High-performance lists for Pokémon and move browsers
- **EAS Build configuration** — Production build setup for Android and iOS

## API Reference

This project uses [PokéAPI](https://pokeapi.co/) — a free, open REST API for Pokémon data. No authentication required.

## Contributing

Contributions, suggestions, and feedback are welcome. Feel free to open an issue or submit a pull request.
