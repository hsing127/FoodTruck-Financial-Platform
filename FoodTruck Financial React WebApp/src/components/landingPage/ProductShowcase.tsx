"use client";
import appScreen from "../../assets/teamImage.png";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export const ProductShowcase = () => {
  const appImg = useRef<HTMLImageElement>(null);
  const { scrollYProgress } = useScroll({
    target: appImg,
    offset: ["start end", "end end"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.8], [45, 0]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0.05, 1]);

  return (
    <div className="bg-black overflow-hidden text-white bg-gradient-to-b from-black to-[#5D2CA8] sm:py-24 py-[72px]">
      <div className="container relative">
        <h2 className="text-center text-5xl sm:text-6xl font-bold tracking-tighter">
          Intuitive Interface
        </h2>
        <div className="max-w-xl mx-auto">
          <p className="text-xl text-center text-white/70 mt-5">
            FoodTrack is a comprehensive platform designed to streamline
            financial management for food truck owners. From automating expense
            tracking to providing insightful analytics, FoodTrack helps you
            focus on what matters most&#8212;running your business.
          </p>
        </div>
        <motion.div
          style={{
            willChange: "transform, opacity",
            opacity: rotateY,
            rotateX: rotateX,
            transformPerspective: "800px",
          }}
        >
          <Image
            src={appScreen}
            priority
            alt="the Product Screenshot"
            className="mt-14"
            ref={appImg}
          />
        </motion.div>
      </div>
    </div>
  );
};
