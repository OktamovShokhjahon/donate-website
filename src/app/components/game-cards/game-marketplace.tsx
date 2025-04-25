"use client";

import { useState } from "react";
import GameCard from "./game-card";
import FilterTabs from "./filter-tabs";

// Define game data
const games = [
  {
    id: 1,
    title: "Mobile Legends:\nBang Bang",
    image: "/mobile-legends.jpg",
    category: "games",
    currency: "Olmoslar",
    background: "bg-gradient-to-b from-orange-400 via-green-300 to-green-500",
    link: "/mobile-legends",
  },
];

// Define filter categories
const filters = [
  { id: "games", label: "O'yinlar", icon: "⭐" },
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
