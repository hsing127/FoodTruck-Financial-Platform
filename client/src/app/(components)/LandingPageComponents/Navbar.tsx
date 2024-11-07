"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Logo from "./../../../assets/Logo.png";
import MenuIcon from "../../../assets/icons/menu.svg";
import Link from "next/link"; // Using Next.js Link instead of react-router-dom

export const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleScrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsDropdownOpen(false); // Close the dropdown after navigating
    }
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <>
      <div className="bg-customBlack">
        <div className="px-4">
          <div className="py-4 flex items-center justify-between">
            <div className="relative">
              <div className="absolute w-full top-2 bottom-2 bg-[linear-gradient(to_right,#F87BFF,#FB92CF,#FFDD98,#C2F0B1,#2FD8FE)] blur-md"></div>
              <Image
                src={Logo}
                alt="FoodTruck Logo"
                className="h-12 w-12 relative"
              />
            </div>

            {/* Mobile Menu Icon */}
            <div className="border border-customWhite border-opacity-30 h-10 w-10 inline-flex justify-center items-center rounded-lg sm:hidden">
              <button onClick={handleMenuToggle} aria-label="Toggle Menu">
                <MenuIcon className="text-customWhite" />
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="flex gap-6 items-center hidden sm:flex">
              <a
                href="#about"
                className="text-opacity-60 text-customWhite hover:text-opacity-100 transition"
                onClick={() => handleScrollToSection("about")}
              >
                About
              </a>
              <a
                href="#features"
                className="text-opacity-60 text-customWhite hover:text-opacity-100 transition"
                onClick={() => handleScrollToSection("features")}
              >
                Features
              </a>
              <a
                href="#updates"
                className="text-opacity-60 text-customWhite hover:text-opacity-100 transition"
                onClick={() => handleScrollToSection("updates")}
              >
                Updates
              </a>
              <a
                href="#help"
                className="text-opacity-60 text-customWhite hover:text-opacity-100 transition"
                onClick={() => handleScrollToSection("help")}
              >
                Help
              </a>
              <a
                href="#contactUs"
                className="text-opacity-60 text-customWhite hover:text-opacity-100 transition"
                onClick={() => handleScrollToSection("contact")}
              >
                Contact Us
              </a>
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
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                className="sm:hidden bg-customBlack bg-opacity-90 rounded-lg mt-2 py-4"
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {["about", "features", "updates", "help", "contact"].map(
                  (section) => (
                    <motion.div
                      key={section}
                      className="text-customWhite text-center py-2 cursor-pointer hover:text-opacity-80"
                      variants={itemVariants}
                      onClick={() => handleScrollToSection(section)}
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </motion.div>
                  )
                )}
                <Link href="/login/login" passHref>
                  <motion.div
                    className="bg-customWhite text-customBlack text-center py-2 rounded-lg mx-4 mt-2 cursor-pointer"
                    variants={itemVariants}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Login
                  </motion.div>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </>
  );
};
