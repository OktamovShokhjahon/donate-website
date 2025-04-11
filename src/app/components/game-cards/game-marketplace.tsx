"use client";

import { useState } from "react";
import GameCard from "./game-card";
import FilterTabs from "./filter-tabs";

// Define game data
const games = [
  {
    id: 1,
    title: "Mobile Legends: Bang Bang",
    image: "/mobile-legends.jpg",
    category: "games",
    currency: "Olmoslar",
    background: "bg-gradient-to-b from-orange-400 via-green-300 to-green-500",
    link: "/mobile-legends",
  },
  {
    id: 2,
    title: "PUBG Mobile",
    image: "/pubg-logo.jpg",
    category: "games",
    currency: "UC",
    background: "bg-gradient-to-b from-gray-700 via-gray-600 to-gray-500",
    link: "/pubg-mobile",
  },
  {
    id: 3,
    title: "Free Fire",
    image: "/pubg-logo.jpg",
    category: "games",
    currency: "Olmoslar",
    background: "bg-gradient-to-b from-orange-500 via-orange-400 to-yellow-400",
    link: "/free-fire",
  },
  {
    id: 4,
    title: "Identity V",
    image: "/pubg-logo.jpg",
    category: "games",
    currency: "Muhrlar",
    background: "bg-gradient-to-b from-slate-700 via-slate-600 to-slate-500",
    link: "/identity-v",
  },
  {
    id: 5,
    title: "Genshin Impact",
    image: "/pubg-logo.jpg",
    category: "games",
    currency: "Kristallar",
    background: "bg-gradient-to-b from-purple-400 via-purple-300 to-purple-200",
    link: "/genshin-impact",
  },
  {
    id: 6,
    title: "Steam",
    image: "/pubg-logo.jpg",
    category: "services",
    currency: "",
    background: "bg-gradient-to-b from-purple-800 via-purple-700 to-purple-600",
    link: "/steam",
  },
  {
    id: 7,
    title: "Path of Exile 2",
    image: "/pubg-logo.jpg",
    category: "games",
    currency: "Sferalar",
    background: "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700",
    link: "/path-of-exile-2",
  },
  {
    id: 8,
    title: "Arena Breakout",
    image: "/pubg-logo.jpg",
    category: "games",
    currency: "Obligatsiyalar",
    background: "bg-gradient-to-b from-gray-800 via-gray-700 to-gray-600",
    link: "/arena-breakout",
  },
  {
    id: 9,
    title: "Valorant",
    image: "/pubg-logo.jpg",
    category: "games",
    currency: "Points",
    background: "bg-gradient-to-b from-red-600 via-red-500 to-red-400",
    link: "/valorant",
  },
  {
    id: 10,
    title: "Roblox",
    image: "/pubg-logo.jpg",
    category: "games",
    currency: "Robux",
    background: "bg-gradient-to-b from-red-500 via-red-400 to-red-300",
    link: "/roblox",
  },
  {
    id: 11,
    title: "Discord Nitro",
    image: "/pubg-logo.jpg",
    category: "services",
    currency: "",
    background: "bg-gradient-to-b from-indigo-600 via-indigo-500 to-indigo-400",
    link: "/discord-nitro",
  },
  {
    id: 12,
    title: "Minecraft",
    image: "/pubg-logo.jpg",
    category: "games",
    currency: "Coins",
    background: "bg-gradient-to-b from-green-700 via-green-600 to-green-500",
    link: "/minecraft",
  },
];

// Define filter categories
const filters = [
  { id: "all", label: "Barchasi", icon: "🎮" },
  { id: "games", label: "O'yinlar", icon: "⭐" },
  { id: "services", label: "Xizmatlar", icon: "📦" },
  { id: "software", label: "Dasturlar", icon: "📱" },
];

export default function GameMarketplace() {
  const [activeFilter, setActiveFilter] = useState("all");

  // Filter games based on active filter
  const filteredGames =
    activeFilter === "all"
      ? games
      : games.filter((game) => game.category === activeFilter);

  return (
    <div className="max-w-7xl mx-auto mt-[50px] px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        O&apos;yinlar Do&apos;koni
      </h1>

      {/* Filter tabs */}
      <FilterTabs
        filters={filters}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {/* Game cards grid */}
      <div className="game-cards-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {filteredGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
