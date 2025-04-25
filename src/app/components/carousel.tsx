"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
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
      name: "Mobile Legends",
      image: "/mobile-legends-carousel.jpg",
      text: "Mobile legends: Bang Bang!",
      bgColor: "bg-zinc-900",
      textColor: "text-white",
      link: "/mobile-legends",
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
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={16}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="cursor-grab active:cursor-grabbing gap-[15px]"
      >
        {games.map((game) => (
          <SwiperSlide key={game.id} className="p-2">
            <Link href={game.link} className="block h-full">
              <div
                className={cn(
                  "relative rounded-lg overflow-hidden w-1/2 h-[50%]",
                  game.bgColor
                )}
              >
                <div className="relative h-[50%] w-full">
                  <img
                    src={game.image || "/placeholder.svg"}
                    alt={game.name}
                    className="w-full"
                    height={200}
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
