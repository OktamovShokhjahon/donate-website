"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// Regex patterns
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

interface FormValues {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>();

  const password = watch("password", "");

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    // API chaqiruvini simulyatsiya qilish
    console.log("Forma ma'lumotlari:", data);

    // Haqiqiy ilovada, ma'lumotlarni API ga yuborasiz
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    // Qayta yo'naltirish yoki muvaffaqiyat xabarini ko'rsatish
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Email maydoni */}
      <div>
        <Label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Elektron pochta
        </Label>
        <div className="mt-1">
          <Input
            id="email"
            type="email"
            autoComplete="email"
            className={cn(errors.email && "border-red-500")}
            {...register("email", {
              required: "Elektron pochta kiritish majburiy",
              pattern: {
                value: EMAIL_REGEX,
                message: "Yaroqli elektron pochta manzilini kiriting",
              },
            })}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Foydalanuvchi nomi maydoni */}
      <div>
        <Label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Foydalanuvchi nomi
        </Label>
        <div className="mt-1">
          <Input
            id="username"
            type="text"
            autoComplete="username"
            className={cn(errors.username && "border-red-500")}
            {...register("username", {
              required: "Foydalanuvchi nomini kiritish majburiy",
              minLength: {
                value: 3,
                message:
                  "Foydalanuvchi nomi kamida 3 ta belgidan iborat bo'lishi kerak",
              },
            })}
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-600">
              {errors.username.message}
            </p>
          )}
        </div>
      </div>

      {/* Parol maydoni */}
      <div>
        <Label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Parol
        </Label>
        <div className="mt-1 relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            className={cn(errors.password && "border-red-500", "pr-10")}
            {...register("password", {
              required: "Parolni kiritish majburiy",
              pattern: {
                value: PASSWORD_REGEX,
                message:
                  "Parol kamida 8 ta belgidan iborat bo'lishi va katta harf, kichik harf, raqam va maxsus belgilarni o'z ichiga olishi kerak",
              },
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

      {/* Parolni tasdiqlash maydoni */}
      <div>
        <Label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Parolni tasdiqlang
        </Label>
        <div className="mt-1 relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            className={cn(errors.confirmPassword && "border-red-500", "pr-10")}
            {...register("confirmPassword", {
              required: "Iltimos, parolingizni tasdiqlang",
              validate: (value) => value === password || "Parollar mos kelmadi",
            })}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
          </button>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      {/* Parol talablari */}
      <div className="rounded-md bg-gray-50 p-4">
        <div className="text-sm text-gray-700 font-medium mb-2">
          Parol quyidagilarni o'z ichiga olishi kerak:
        </div>
        <ul className="text-xs text-gray-600 space-y-1 list-disc pl-5">
          <li>Kamida 8 ta belgi</li>
          <li>Kamida bitta katta harf (A-Z)</li>
          <li>Kamida bitta kichik harf (a-z)</li>
          <li>Kamida bitta raqam (0-9)</li>
          <li>Kamida bitta maxsus belgi (@$!%*?&)</li>
        </ul>
      </div>

      {/* Yuborish tugmasi */}
      <div>
        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Hisob yaratilmoqda..." : "Hisob yaratish"}
        </Button>
      </div>
    </form>
  );
}
