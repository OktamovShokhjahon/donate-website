"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";

export default function GameCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const games = [
    {
      id: 1,
      name: "Z Game",
      image: "/pubg.jpg",
      text: "Donat qilish foydali!",
      bgColor: "bg-zinc-900",
      textColor: "text-white",
    },
    {
      id: 2,
      name: "Mobile Legends",
      image: "/pubg.jpg",
      text: "Almazlar arzon!",
      bgColor: "bg-blue-600",
      textColor: "text-white",
    },
    {
      id: 3,
      name: "Fortnite",
      image: "/pubg.jpg",
      text: "Narxlarni tushiramiz!",
      bgColor: "bg-purple-700",
      textColor: "text-white",
    },
    {
      id: 4,
      name: "Roblox",
      image: "/pubg.jpg",
      text: "Endi arzon!",
      bgColor: "bg-purple-400",
      textColor: "text-white",
    },
    {
      id: 5,
      name: "Game 5",
      image: "/pubg.jpg",
      text: "Keshbek!",
      bgColor: "bg-red-500",
      textColor: "text-white",
    },
    {
      id: 6,
      name: "Game 5",
      image: "/pubg.jpg",
      text: "Keshbek!",
      bgColor: "bg-red-500",
      textColor: "text-white",
    },
    {
      id: 7,
      name: "Game 5",
      image: "/pubg.jpg",
      text: "Keshbek!",
      bgColor: "bg-red-500",
      textColor: "text-white",
    },
  ];

  const visibleItems = 4;
  const totalItems = games.length;

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= totalItems - visibleItems ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${
        currentIndex * (100 / visibleItems)
      }%)`;
    }
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-[50px] relative w-full max-w-7xl mx-auto overflow-hidden">
      {/* <div
        className="flex transition-transform duration-300 ease-out cursor-grab active:cursor-grabbing"
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {games.map((game) => (
          <div
            key={game.id}
            className={cn(
              "flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2",
              "transition-all duration-300"
            )}
          >
            <Link href="#" className="block h-full">
              <div
                className={cn(
                  "relative rounded-lg overflow-hidden h-full",
                  game.bgColor
                )}
              >
                <div className="relative">
                  <Image
                    src={game.image || "/placeholder.svg"}
                    alt={game.name}
                    width={300}
                    height={150}
                    className="w-full h-auto object-cover brightness-50"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className={cn("font-medium", game.textColor)}>
                      {game.text}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div> */}

      {/* <Swiper>
        {games.map((game) => (
          <SwiperSlide key={game.id}>
            <div
              className={cn(
                "flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2",
                "transition-all duration-300"
              )}
            >
              <Link href="#" className="block h-full">
                <div
                  className={cn(
                    "relative rounded-lg overflow-hidden h-full",
                    game.bgColor
                  )}
                >
                  <div className="relative">
                    <Image
                      src={game.image || "/placeholder.svg"}
                      alt={game.name}
                      width={300}
                      height={150}
                      className="w-full h-auto object-cover brightness-50"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className={cn("font-medium", game.textColor)}>
                        {game.text}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper> */}

      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={16}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="cursor-grab active:cursor-grabbing"
      >
        {games.map((game) => (
          <SwiperSlide key={game.id} className="p-2">
            <Link href="#" className="block h-full">
              <div
                className={cn(
                  "relative rounded-lg overflow-hidden h-full",
                  game.bgColor
                )}
              >
                <div className="relative">
                  <Image
                    src={game.image || "/placeholder.svg"}
                    alt={game.name}
                    width={300}
                    height={150}
                    className="w-full h-auto object-cover brightness-50"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className={cn("font-medium", game.textColor)}>
                      {game.text}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
