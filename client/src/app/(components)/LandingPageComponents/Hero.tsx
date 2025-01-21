"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const ArrowWIcon = dynamic(() => import("../../../assets/icons/arrow-w.svg"), {
  ssr: false,
});

export const Hero = React.memo(() => {
  return (
    <div className="bg-customBlack text-customWhite bg-[linear-gradient(to_bottom,#000,#200D42_34%,#4F21A1_65%,#A46EDB_82%)] py-[72px] sm:py-24 relative overflow-clip">
      <div
        className="absolute h-[375px] w-[750px] sm:w-[1536px] sm:h-[768px] lg:w-[2400px] lg:h-[1200px] rounded-[100%] bg-customBlack left-1/2 -translate-x-1/2 border 
      border-[#B48CDE] bg-[radial-gradient(closest-side,#000_82%,#9560EB)] top-[calc(100%-96px)] sm:top-[calc(100%-120px)]"
      ></div>
      <div className="container relative">
        <div className="flex items-center justify-center">
          <a
            href="#"
            className="inline-flex gap-3 border py-1 px-2 rounded-lg border-customWhite/30"
          >
            <span className="light bg-gradient-to-r from-red-500 to-blue-500 text-transparent bg-clip-text [-webkit-background-clip:text]">
              Mobile App is Here
            </span>
            <span className="inline-flex items-center gap-1">
              <span>Go there!</span>
              <ArrowWIcon />
            </span>
          </a>
        </div>
        <div className="flex justify-center">
          <h1 className="text-7xl sm:text-9xl font-bold tracking-tighter text-center mt-8 inline-flex">
            Optimize your food <br /> truck&apos;s financials
          </h1>
        </div>
        <div className="flex justify-center">
          <p className="text-center text-xl mt-8 max-w-md">
            Manage and analyze your expenses, automate receipt processing, and
            maximize your profits with insights tailored for food truck owners.
          </p>
        </div>
        <div className="flex justify-center mt-8">
          <Link href="/login/signup" passHref>
            <motion.button
              className="bg-customWhite text-customBlack py-3 px-5 rounded-lg font-medium"
              whileTap={{ scale: 0.9 }}
            >
              Get Started
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
});

Hero.displayName = "Hero";
