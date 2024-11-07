"use client";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react"; // Importing Menu icon from Lucide

import Logo from "../../../assets/Logo.png";
import React from "react";

export const Navbar = React.memo(() => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Toggle dropdown menu open/close
  const handleMenuToggle = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  // Smooth scroll to section and close dropdown
  const handleScrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsDropdownOpen(false);
    }
  };

  // Animation variants for dropdown
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, staggerChildren: 0.1 },
    },
  };

  return (
    <div className="bg-customBlack">
      <div className="px-4">
        <div className="py-4 flex items-center justify-between">
          {/* Logo with gradient effect */}
          <div className="relative">
            <div className="absolute w-full top-2 bottom-2 bg-gradient-to-r from-[#F87BFF] to-[#2FD8FE] blur-md"></div>
            <Image src={Logo} alt="FoodTruck Logo" className="h-12 w-12 relative" priority />
          </div>

          {/* Mobile Menu Icon using Lucide */}
          <button
            onClick={handleMenuToggle}
            aria-label="Toggle Menu"
            className="border border-customWhite border-opacity-30 h-10 w-10 flex justify-center items-center rounded-lg sm:hidden"
          >
            <Menu className="text-customWhite" size={24} />
          </button>

          {/* Desktop Navigation */}
          <nav className="flex gap-6 items-center hidden sm:flex">
            {["about", "features", "updates", "help", "contactUs"].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className="text-opacity-60 text-customWhite hover:text-opacity-100 transition"
                onClick={() => handleScrollToSection(section)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
            <Link href="/login/login" passHref>
              <motion.button
                className="bg-customWhite text-customBlack py-2 px-4 rounded-lg"
                whileTap={{ scale: 0.9 }}
              >
                Login
              </motion.button>
            </Link>
          </nav>
        </div>

        {/* Mobile Dropdown Menu */}
        {isDropdownOpen && (
          <motion.div
            className="sm:hidden bg-customBlack bg-opacity-90 rounded-lg mt-2 py-4"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {["about", "features", "updates", "help", "contactUs"].map((section) => (
              <motion.div
                key={section}
                className="text-customWhite text-center py-2 cursor-pointer hover:text-opacity-80"
                onClick={() => handleScrollToSection(section)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </motion.div>
            ))}
            <Link href="/login/login" passHref>
              <motion.div
                className="bg-customWhite text-customBlack text-center py-2 rounded-lg mx-4 mt-2 cursor-pointer"
                onClick={() => setIsDropdownOpen(false)}
              >
                Login
              </motion.div>
            </Link>
          </motion.div>
        )}
      </div>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
});

Navbar.displayName = "Navbar";
