"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import axios from "axios";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface User {
  username: string;
  email: string;
  balance: number;
}

function Page() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = Cookies.get("token");
  const router = useRouter();

  if (!token) {
    router.push("/login");
  }

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/login");
  };

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://asspay.up.railway.app/auth/me", {
          headers: {
            Authorization: token,
          },
        });
        if (res.data.message) {
          setError(res.data.message);
        } else {
          setUser({
            username: res.data.username,
            email: res.data.email,
            balance: res.data.balance,
          });
        }
      } catch (error) {
        setError("Foydalanuvchi ma&apos;lumotlarini olishda xatolik yuz berdi");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md">
          <p className="font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Boshqaruv paneli
            </h1>
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="flex items-center gap-2"
            >
              <LogOut size={18} />
              Chiqish
            </Button>
          </div>

          {user && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                  <h2 className="text-xl font-semibold text-blue-900 mb-4">
                    Foydalanuvchi ma&apos;lumotlari
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="text-blue-700 font-medium w-24">
                        Login:
                      </span>
                      <span className="text-gray-800">{user.username}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-blue-700 font-medium w-24">
                        Email:
                      </span>
                      <span className="text-gray-800">{user.email}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                  <h2 className="text-xl font-semibold text-green-900 mb-4">
                    Hisob balansi
                  </h2>
                  <div className="flex items-center">
                    <span className="text-3xl font-bold text-green-700">
                      ${user.balance}
                    </span>
                    <span className="ml-2 text-green-600">USD</span>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                <h2 className="text-xl font-semibold text-purple-900 mb-4">
                  So'nggi faoliyat
                </h2>
                <p className="text-gray-600">Hech qanday faoliyat yo&apos;q</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
