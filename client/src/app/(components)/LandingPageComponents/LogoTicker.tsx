"use client";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const texts = [
  "A Common Voice to Government",
  "Access to Information & Training",
  "Market Development and Research",
  "Promotion, Branding and Visibility",
  "Benefits and Group Purchasing",
  "Networking & News You Can Use",
];

export const LogoTicker = () => {
  const tickerRef = useRef<HTMLDivElement>(null);
  const [tickerWidth, setTickerWidth] = useState(0);

  useEffect(() => {
    if (tickerRef.current) {
      setTickerWidth(tickerRef.current.scrollWidth);
    }
  }, []);

  return (
    <div className="bg-customBlack text-customWhite py-[72px] sm:py-24">
      <div className="container">
        <h2 className="text-xl text-center text-customWhite/70">
          Sponsored by Food Truck Association Of Canada
        </h2>
        <h2 className="text-lg text-center text-customWhite/70">
          How we support the industry:
        </h2>
        <div
          className="overflow-hidden mt-9 before:content-[''] after:content-[''] before:absolute before:z-10 after:absolute before:h-full 
        after:h-full before:w-5 after:w-5 relative after:right-0 before:left-0 before:top-0 after:top-0 
        before:bg-[linear-gradient(to_right,#000,rgb(0,0,0,0))] after:bg-[linear-gradient(to_left,#000,rgb(0,0,0,0))]"
        >
          <motion.div
            ref={tickerRef}
            initial={{ translateX: 0 }}
            animate={{ translateX: -tickerWidth / 2 }}
            transition={{
              duration: tickerWidth / 200,
              ease: "linear",
              repeat: Infinity,
            }} // Adjust the speed based on width
            className="flex gap-16 flex-none pr-16"
          >
            {texts.concat(texts).map((text, index) => (
              <div key={index} className="flex-none text-center">
                <p className="text-lg">{text}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
