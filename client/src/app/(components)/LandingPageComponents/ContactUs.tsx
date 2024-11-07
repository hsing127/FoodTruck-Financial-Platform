"use client";
import emoji from "../../../assets/images/emojistar.png";
import helix from "../../../assets/images/helix2.png";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const ContactUs = () => {
  const containRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containRef,
    offset: ["start end", "end end"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <div
      className="bg-customBlack text-customWhite py-[72px] sm:py-24 text-center"
      ref={containRef}
      id="contactUs"
    >
      customWhite
      <div className="container max-w-xl relative">
        <motion.div style={{ translateY }}>
          <Image
            src={helix}
            alt=""
            className="absolute top-12 left-[calc(100%+36px)]"
          />
        </motion.div>
        <motion.div style={{ translateY }}>
          <Image
            src={emoji}
            alt=""
            className="absolute -top-[80px] right-[calc(100%+12px)]"
          />
        </motion.div>

        <h2 className="font-bold text-5xl tracking-tighter sm:text-6xl">
          Contact Us!
        </h2>
        <p className="text-xl text-customWhite/70 mt-5">
          Feel free to contact us with any issues!
        </p>
        <form className="mt-10 flex flex-col gap-2.5 max-w-sm mx-auto sm:flex-row">
          <input
            className="h-12 bg-customWhite/20 rounded-lg px-5 font-medium placeholder:text-[#9CA3AF] sm:flex-1"
            type="email"
            placeholder="your@email.com"
          />
          <button className="bg-customWhite text-customBlack h-12 rounded-lg max-w-sm mx-auto sm:flex-row px-5">
            Contact Us
          </button>
        </form>
      </div>
    </div>
  );
};
