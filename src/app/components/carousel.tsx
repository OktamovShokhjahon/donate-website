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
      image: "/mobile-legends-carousel.jpg",
      text: "Mobile legends: Bang Bang!",
      bgColor: "bg-zinc-900",
      textColor: "text-white",
      link: "/z-game",
    },
    // {
    //   id: 2,
    //   name: "Mobile Legends",
    //   image: "/mobile-legends.jpg",
    //   text: "Almazlar arzon!",
    //   bgColor: "bg-blue-600",
    //   textColor: "text-white",
    //   link: "/mobile-legends",
    // },
    // {
    //   id: 3,
    //   name: "Fortnite",
    //   image: "/pubg.jpg",
    //   text: "Narxlarni tushiramiz!",
    //   bgColor: "bg-purple-700",
    //   textColor: "text-white",
    //   link: "/fortnite",
    // },
    // {
    //   id: 4,
    //   name: "Roblox",
    //   image: "/pubg.jpg",
    //   text: "Endi arzon!",
    //   bgColor: "bg-purple-400",
    //   textColor: "text-white",
    //   link: "/roblox",
    // },
    // {
    //   id: 5,
    //   name: "Game 5",
    //   image: "/pubg.jpg",
    //   text: "Keshbek!",
    //   bgColor: "bg-red-500",
    //   textColor: "text-white",
    //   link: "/game-5",
    // },
    // {
    //   id: 6,
    //   name: "Game 5",
    //   image: "/pubg.jpg",
    //   text: "Keshbek!",
    //   bgColor: "bg-red-500",
    //   textColor: "text-white",
    //   link: "/game-6",
    // },
    // {
    //   id: 7,
    //   name: "Game 5",
    //   image: "/pubg.jpg",
    //   text: "Keshbek!",
    //   bgColor: "bg-red-500",
    //   textColor: "text-white",
    //   link: "/game-7",
    // },
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
        loop={true}
        className="cursor-grab active:cursor-grabbing gap-[15px]"
      >
        {games.map((game) => (
          <SwiperSlide key={game.id} className="p-2">
            <Link href={game.link} className="block h-full">
              <div
                className={cn(
                  "relative rounded-lg overflow-hidden w-[500px] h-[280px]",
                  game.bgColor
                )}
              >
                <div className="relative h-full w-full">
                  <Image
                    src={game.image || "/placeholder.svg"}
                    alt={game.name}
                    width={500}
                    height={200}
                    // className="w-full h-full object-cover brightness-50"
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
