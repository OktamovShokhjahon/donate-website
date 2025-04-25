import Image from "next/image";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface GameCardProps {
  game: {
    id: number;
    title: string;
    image: string;
    currency: string;
    background: string;
    link: string;
  };
}

export default function GameCard({ game }: GameCardProps) {
  const router = useRouter();

  return (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden transition-transform hover:scale-105",
        game.background
      )}
      onClick={() => router.push(game.link)}
    >
      <div className="p-4 pt-12 pb-16 flex flex-col items-center">
        {/* Game image */}
        <div className="relative w-48 h-48 bg-white rounded-3xl overflow-hidden mb-4 shadow-lg">
          <Image
            src={game.image || `/placeholder.svg?height=192&width=192`}
            alt={game.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Currency badge */}
        {game.currency && (
          <div className="absolute bottom-4 left-4 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
            <span className="mr-1">💎</span>
            {game.currency}
          </div>
        )}

        {/* Game title */}
        <h3 className="text-center font-medium text-[25px] text-white mt-2">
          {game.title}
        </h3>
      </div>
    </div>
  );
}
