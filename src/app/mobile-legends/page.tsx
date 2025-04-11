"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  CheckCircle,
  CheckIcon,
  ChevronDown,
  ChevronUp,
  ClockIcon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type PriceItem = {
  id: number;
  title: string;
  price: number;
  subtitle: string;
  badges: Array<"orange" | "pink">;
};

function MobileLegendsPage() {
  const initialItemsToShow = 6;
  const [showAll, setShowAll] = useState(false);

  const priceItems: PriceItem[] = [
    {
      id: 1,
      title: "Сумеречный пропуск",
      price: 1159,
      subtitle: "",
      badges: ["orange"],
    },
    {
      id: 2,
      title: "Недельный пропуск",
      price: 237,
      subtitle: "",
      badges: ["orange", "pink"],
    },
    { id: 3, title: "8 алмазов", price: 16, subtitle: "", badges: [] },
    { id: 4, title: "32+3 алмазов", price: 71, subtitle: "", badges: [] },
    { id: 5, title: "80+8 алмазов", price: 181, subtitle: "", badges: [] },
    { id: 6, title: "120+12 алмазов", price: 273, subtitle: "", badges: [] },
    { id: 7, title: "239+25 алмазов", price: 549, subtitle: "", badges: [] },
    { id: 8, title: "396+44 алмазов", price: 799, subtitle: "", badges: [] },
    {
      id: 9,
      title: "800+88 алмазов",
      price: 1599,
      subtitle: "",
      badges: ["orange"],
    },
    {
      id: 10,
      title: "1600+176 алмазов",
      price: 3199,
      subtitle: "",
      badges: ["orange", "pink"],
    },
    {
      id: 11,
      title: "4000+440 алмазов",
      price: 7999,
      subtitle: "",
      badges: ["orange"],
    },
    {
      id: 12,
      title: "8000+880 алмазов",
      price: 15999,
      subtitle: "",
      badges: ["orange", "pink"],
    },
  ];

  const displayedItems = showAll
    ? priceItems
    : priceItems.slice(0, initialItemsToShow);

  return (
    <div className="w-full bg-gray-100 py-2 sm:py-4 px-2 sm:px-4">
      <div className="sm-container max-w-5xl mx-auto">
        <div className="max-w-4xl mx-auto p-4">
          <div className="rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0 flex flex-col items-center md:items-start">
                  <div className="w-[180px] h-[180px] rounded-lg overflow-hidden">
                    <Image
                      src="/mobile-legends.webp"
                      alt="Mobile Legends"
                      width={180}
                      height={180}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
                    Mobile Legends uchun arzon olmoslar
                  </h1>

                  <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full mb-4 w-fit">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      Rasmiy to&apos;ldirish
                    </span>
                  </div>

                  <p className="text-slate-700 mb-4">
                    Mobile Legends-da ID orqali olmoslarni tezkor
                    to&apos;ldirish. Har qanday o&apos;tish va birinchi xaridni
                    ikki baravar oshirish.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-lg">
                  <div className="flex-shrink-0 w-10 h-10">
                    <Image
                      src="/diamond.webp"
                      alt="Diamond"
                      width={40}
                      height={40}
                      className="w-full h-auto"
                    />
                  </div>
                  <p className="text-sm text-slate-600">
                    Olmoslar - Mobile Legends Bang Bang o&apos;yinidagi premium
                    valyuta bo&apos;lib, qahramonlarni sotib olish va yangi
                    kostyumlarni ochish uchun zarur.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    🎟️
                    <p className="text-sm font-medium">
                      Telegram kanalimizga obuna bo&apos;lib 5% keshbekga ega
                      bo&apos;ling
                    </p>
                  </div>
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 rounded-full">
                    Kirish
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-[30px]">
            {displayedItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <Image
                      src="/character.webp"
                      alt={item.title}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{item.title}</h3>
                    <p className="font-bold">{item.price} ₽</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {item.badges.includes("orange") && (
                    <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white">
                      <span className="sr-only">Orange badge</span>
                      <span className="text-xs">!</span>
                    </div>
                  )}
                  {item.badges.includes("pink") && (
                    <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center text-white">
                      <span className="sr-only">Pink badge</span>
                      <span className="text-xs">%</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Button
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="rounded-full px-6 py-2 flex items-center gap-2"
            >
              {showAll ? (
                <>
                  Kamroq ko&apos;rsatish <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Hammasini ko&apos;rsatish <ChevronDown className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>

          <div className="w-full max-w-xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-sm mt-[30px]">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="playerId"
                    className="text-gray-800 font-medium text-sm sm:text-base"
                  >
                    O&apos;yinchi ID
                  </label>
                  <a
                    href="#"
                    className="text-gray-600 text-xs sm:text-sm hover:underline"
                  >
                    Qayerdan topish mumkin?
                  </a>
                </div>
                <Input
                  id="playerId"
                  placeholder="000000000"
                  className="w-full border-gray-200"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="serverId"
                  className="text-gray-800 font-medium text-sm sm:text-base"
                >
                  Server ID
                </label>
                <Input
                  id="serverId"
                  placeholder="0000"
                  className="w-full border-gray-200"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 py-2 sm:py-3">
                <div className="flex items-center gap-1 sm:gap-2">
                  <CheckIcon className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">
                    Barcha mintaqalar mavjud
                  </span>
                  <span className="text-blue-500 font-bold ml-1 text-xs sm:text-sm">
                    🇷🇺🌎🇮🇩
                  </span>
                </div>

                <div className="flex items-center gap-1 sm:gap-2">
                  <CheckIcon className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">
                    To&apos;liq xavfsiz
                  </span>
                  <span className="text-blue-500 ml-1">🔒</span>
                </div>

                <div className="flex items-center gap-1 sm:gap-2">
                  <CheckIcon className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">Arzon narxlar</span>
                  <span className="text-green-500 ml-1">💰</span>
                </div>

                <div className="flex items-center gap-1 sm:gap-2">
                  <CheckIcon className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">
                    Kun bo&apos;yi ishlaymiz
                  </span>
                  <ClockIcon className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600 ml-1 flex-shrink-0" />
                </div>

                <div className="flex items-center gap-1 sm:gap-2">
                  <CheckIcon className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">
                    Keshbek va bonuslar
                  </span>
                  <span className="text-orange-500 ml-1">🔥</span>
                </div>

                <div className="flex items-center gap-1 sm:gap-2">
                  ⚡️
                  <span className="text-xs sm:text-sm">
                    Darhol yetkazib berish
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 p-3 sm:p-4 rounded-md">
                <div className="flex items-start gap-2">
                  <Checkbox id="terms" className="mt-1" />
                  <label
                    htmlFor="terms"
                    className="text-xs sm:text-sm text-gray-600"
                  >
                    Men mintaqaviy cheklovlar bilan tanishdim va tushundimki,
                    Rossiya hisoblarida faqat &quot;Rossiya&quot; mintaqasi
                    ishlaydi. Men kerakli mintaqani tanlaganimni va qaytarish
                    faqat sayt balansiga mumkinligini tasdiqlayman.
                  </label>
                </div>
              </div>

              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 sm:py-6 text-base sm:text-lg">
                Sotib olish
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileLegendsPage;
