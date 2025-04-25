"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  CheckCircle,
  CheckIcon,
  // ChevronDown,
  // ChevronUp,
  ClockIcon,
  Star,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

type PriceItem = {
  id: number;
  name: string;
  price: number;
  subtitle: string;
  badges: Array<"orange" | "pink">;
};

type ChoosedItem = {
  id: string;
};

type Resp = {
  message: string;
};

function MobileLegendsPage() {
  // const [showAll, setShowAll] = useState(false);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [playerId, setPlayerId] = useState<string | undefined>(undefined);
  const [serverId, setServerId] = useState<string | undefined>(undefined);
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [priceItems, setPriceItems] = useState<PriceItem[]>([]);
  const [extraItems, setExtraItems] = useState<PriceItem[]>([]);
  const [choosedItems, setChoosedItems] = useState<ChoosedItem[]>([]);
  const [userLog, setUserlog] = useState<string[]>([]);
  const [isTutorial, setIsTutorial] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    setToken(Cookies.get("token"));
  }, []);

  const baseUrl = "https://api.fastdonate.su";

  useEffect(() => {
    console.log(priceItems);

    async function fetchPrices() {
      try {
        const extras: PriceItem[] = [];
        const regular: PriceItem[] = [];
        const res = await axios.get(`${baseUrl}/merchant/price_list`);
        if (res.data.prices) {
          res.data.prices.forEach((item: PriceItem) => {
            if (item.name.includes("| extra")) {
              const replaced: string = item.name.replace("| extra", "");
              const updated = replaced.replace(
                /(\D+)(\d+)\+\d+/,
                (_, prefix, firstNumber) => {
                  return `${prefix}${firstNumber}+${firstNumber}`;
                }
              );
              item.name = updated;
              extras.push(item);
            } else {
              regular.push(item);
            }
          });
        } else {
          setPriceItems([]);
        }
        setExtraItems(extras);
        setPriceItems(regular);
      } catch (err) {
        console.log(err);
      }
    }

    fetchPrices();
  }, []);

  useEffect(() => {
    const fetchUsername = async () => {
      if (playerId && serverId) {
        try {
          const res = await axios.get(
            `https://api.isan.eu.org/nickname/ml?id=${playerId}&zone=${serverId}`
          );
          console.log(res.data);
          if (res.data.name) {
            setUsername(`username: ${res.data.name}`);
          } else {
            setUsername("Foydalanuvchi topilmadi");
          }
        } catch (err) {
          const error = err as AxiosError;
          if (error?.response?.status === 404) {
            setUsername("Foydalanuvchi topilmadi");
          } else {
            setUsername("Kechirasiz qandaydir xatolik yuz berdi");
          }
        }
      }
    };

    fetchUsername();
  }, [playerId, serverId]);

  function handleChoose(id: number) {
    const strId = String(id);

    const isAlreadyChosen = choosedItems.some((item) => item.id === strId);

    if (isAlreadyChosen) {
      setChoosedItems((prev) => prev.filter((item) => item.id !== strId));
    } else {
      setChoosedItems((prev) => [...prev, { id: strId }]);
    }
  }

  function isChoosen(id: number) {
    const strId = String(id);

    const isAlreadyChosen = choosedItems.some((item) => item.id === strId);

    return isAlreadyChosen;
  }

  const displayedItems = priceItems;

  async function handleSubmit() {
    if (playerId && serverId && choosedItems.length > 0 && token) {
      try {
        const products: string[] = [];

        choosedItems.forEach((item) => products.push(item.id));

        const res = await axios.post(
          `${baseUrl}/merchant/buy`,
          {
            products,
            user_id: playerId,
            server_id: serverId,
          },
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        if (res.data.data) {
          res.data.data.forEach((item: Resp) => {
            setUserlog((prev) => [...prev, item.message]);
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

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
                    Mobile Legends hisobingizga ID orqali olmoslarni tez va oson
                    to‘ldiring. Xaridlaringizni tezda amalga oshiring va sizni
                    kutayotgan keshbekni qo‘lga kiriting!
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

                {!token && (
                  <div className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      🎟️
                      <p className="text-sm font-medium">
                        Telegram kanalimizga obuna bo&apos;lib 5% keshbekga ega
                        bo&apos;ling
                      </p>
                    </div>
                    <Button
                      onClick={() => router.push("/login")}
                      className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-8 rounded-full"
                    >
                      Kirish
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-[30px]">
            {extraItems.map((item) => (
              <div
                key={item.id}
                className={`relative cursor-pointer transition rounded-lg shadow-sm  p-4 flex items-center justify-between ${
                  isChoosen(item.id)
                    ? "bg-[#eee]"
                    : "border border-gray-300 bg-white"
                }`}
                onClick={() => handleChoose(item.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <Image
                      src="/character.webp"
                      alt={item.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <p className="font-bold flex items-center gap-[5px]">
                      {item.price}{" "}
                      <Image width={20} height={20} src="/coin.png" alt="" />
                    </p>
                  </div>
                </div>

                <Star
                  fill="yellow"
                  stroke="yellow"
                  className="absolute top-[-10px] right-[-10px] -rotate-90 animate-customPulse"
                />
              </div>
            ))}
          </div>

          <div className="w-full h-[1px] my-[20px] bg-[#333]"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-[30px]">
            {displayedItems.map((item) => (
              <div
                key={item.id}
                className={`cursor-pointer transition rounded-lg shadow-sm  p-4 flex items-center justify-between ${
                  isChoosen(item.id)
                    ? "bg-[#eee]"
                    : "border border-gray-300 bg-white"
                }`}
                onClick={() => handleChoose(item.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <Image
                      src="/character.webp"
                      alt={item.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <p className="font-bold flex items-center gap-[5px]">
                      {item.price}{" "}
                      <Image width={20} height={20} src="/coin.png" alt="" />
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full max-w-xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-sm mt-[30px]">
            <div className="space-y-4">
              <div className="flex items-center gap-[20px]">
                <div className="space-y-2 w-1/2">
                  <div className="flex justify-between items-center relative">
                    <label
                      htmlFor="playerId"
                      className="text-gray-800 font-medium text-sm sm:text-base"
                    >
                      O&apos;yinchi ID
                    </label>
                    <a
                      // href="#"
                      onClick={() => setIsTutorial(!isTutorial)}
                      className="cursor-pointer text-gray-600 text-xs sm:text-sm hover:underline"
                    >
                      Qayerdan topish mumkin?
                    </a>

                    {isTutorial && (
                      <img
                        src="/how-to.jpg"
                        className="absolute right-[-250px] top-[-80px]"
                        alt=""
                      />
                    )}
                  </div>
                  <Input
                    id="playerId"
                    placeholder="000000000"
                    className="w-full border-gray-200"
                    onChange={(e) => {
                      setPlayerId(e.target.value);
                    }}
                  />
                </div>

                <div className="space-y-2 w-1/2 flex flex-col">
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
                    onChange={(e) => {
                      setServerId(e.target.value);
                    }}
                  />
                </div>
              </div>

              {username && (
                <div>
                  <p>{username}</p>
                </div>
              )}

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

              {userLog && (
                <div>
                  {userLog.map((log) => {
                    return <p key={Math.random()}>{log}</p>;
                  })}
                </div>
              )}

              <Button
                disabled={token ? false : true}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 sm:py-6 text-base sm:text-lg"
                onClick={handleSubmit}
              >
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
