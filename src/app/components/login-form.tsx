"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface FormValues {
  identifier: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    // API chaqiruvini simulyatsiya qilish
    console.log("Kirish ma'lumotlari:", data);

    // Haqiqiy ilovada, ma'lumotlarni API ga yuborasiz
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    // Qayta yo'naltirish yoki muvaffaqiyat xabarini ko'rsatish
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Foydalanuvchi nomi/Email maydoni */}
      <div>
        <Label
          htmlFor="identifier"
          className="block text-sm font-medium text-gray-700"
        >
          Foydalanuvchi nomi yoki Email
        </Label>
        <div className="mt-1">
          <Input
            id="identifier"
            type="text"
            autoComplete="username email"
            className={cn(errors.identifier && "border-red-500")}
            {...register("identifier", {
              required: "Foydalanuvchi nomi yoki Email kiritilishi shart",
            })}
          />
          {errors.identifier && (
            <p className="mt-1 text-sm text-red-600">
              {errors.identifier.message}
            </p>
          )}
        </div>
      </div>

      {/* Parol maydoni */}
      <div>
        <div className="flex items-center justify-between">
          <Label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Parol
          </Label>
          {/* <div className="text-sm">
            <Link
              href="/forgot-password"
              className="font-medium text-gray-600 hover:text-gray-800"
            >
              Parolni unutdingizmi?
            </Link>
          </div> */}
        </div>
        <div className="mt-1 relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            className={cn(errors.password && "border-red-500", "pr-10")}
            {...register("password", {
              required: "Parol kiritilishi shart",
            })}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
          </button>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      {/* Meni eslab qolish */}
      <div className="flex items-center">
        <div className="flex items-center h-5">
          <Checkbox id="rememberMe" {...register("rememberMe")} />
        </div>
        <div className="ml-3">
          <Label htmlFor="rememberMe" className="text-sm text-gray-700">
            Meni eslab qolish
          </Label>
        </div>
      </div>

      {/* Yuborish tugmasi */}
      <div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Kirish..." : "Kirish"}
        </Button>
      </div>

      {/* Muqobil kirish usullari */}
      {/* <div>
        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Yoki davom eting
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button variant="outline" type="button" className="w-full">
            Google
          </Button>
          <Button variant="outline" type="button" className="w-full">
            Facebook
          </Button>
        </div>
      </div> */}
    </form>
  );
}
