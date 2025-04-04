import GameCarousel from "./components/carousel";
import GameMarketplace from "./components/game-cards/game-marketplace";

function page() {
  return (
    <div>
      <GameCarousel />
      <GameMarketplace />
    </div>
  );
}

export default page;
