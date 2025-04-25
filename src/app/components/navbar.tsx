"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState<number>(0);

  const router = useRouter();

  // useEffect(() => {
  //   window.location.reload();
  // }, []);

  useEffect(() => {
    const getUser = (token: string) => {
      axios
        .get("https://api.fastdonate.su/auth/me", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          if (res.data.username) {
            setUser(res.data.username);
            setBalance(res.data.balance);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const checkAuth = () => {
      const token = Cookies.get("token");

      if (token) {
        getUser(token);
      }

      setIsLoggedIn(!!token);
    };

    checkAuth();
  }, []);

  const handleNavigation = (path: string) => {
    setIsMenuOpen(false);
    router.push(path);
  };

  function formatNumberWithSpaces(number: number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className="flex items-center"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              className="mr-2 h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src="/logo.png" alt="" />
            </motion.div>
          </Link>
        </motion.div>

        <div className="flex  items-center gap-[10px]">
          {!isLoggedIn ? (
            <motion.button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 cursor-pointer" />
              ) : (
                <Menu className="h-6 w-6 cursor-pointer" />
              )}
              <span className="sr-only">Toggle menu</span>
            </motion.button>
          ) : (
            <>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="pointer"
              >
                <Button
                  className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white"
                  onClick={() => handleNavigation("/dashboard")}
                >
                  {user}
                </Button>
              </motion.div>
              <div>
                <span className="flex items-center gap-[5px]">
                  {formatNumberWithSpaces(balance)}
                  <img width={20} height={20} src="/coin.png" alt="" />
                </span>
              </div>
            </>
          )}
        </div>

        <motion.div
          className="hidden md:flex items-center space-x-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center space-x-2">
            {isLoggedIn ? (
              <>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="pointer"
                >
                  <Button
                    className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white"
                    onClick={() => handleNavigation("/dashboard")}
                  >
                    {user}
                  </Button>
                </motion.div>
                <div>
                  <span className="flex items-center gap-[5px]">
                    {formatNumberWithSpaces(balance)}
                    <img width={20} height={20} src="/coin.png" alt="" />
                  </span>
                </div>
              </>
            ) : (
              <>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white"
                    onClick={() => handleNavigation("/login")}
                  >
                    Login
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white"
                    onClick={() => handleNavigation("/register")}
                  >
                    Register
                  </Button>
                </motion.div>
              </>
            )}
          </div>
        </motion.div>

        {/* Mobile menu - shown when isMenuOpen is true */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="absolute top-16 left-0 right-0 bg-white border-b shadow-lg md:hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-4">
                <div className="flex flex-col space-y-2">
                  {isLoggedIn ? (
                    <div className="flex items-center justify-between">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="pointer"
                      >
                        <Button
                          className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white"
                          onClick={() => handleNavigation("/dashboard")}
                        >
                          {user}
                        </Button>
                      </motion.div>
                      <div>
                        <span className="flex items-center gap-[5px]">
                          {formatNumberWithSpaces(balance)}{" "}
                          <img src="/coin.png" width={20} height={20} alt="" />
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white"
                          onClick={() => handleNavigation("/login")}
                        >
                          Login
                        </Button>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white"
                          onClick={() => handleNavigation("/register")}
                        >
                          Register
                        </Button>
                      </motion.div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
