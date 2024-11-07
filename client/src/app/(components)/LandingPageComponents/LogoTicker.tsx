"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import React from "react";

const texts = [
  "A Common Voice to Government",
  "Access to Information & Training",
  "Market Development and Research",
  "Promotion, Branding and Visibility",
  "Benefits and Group Purchasing",
  "Networking & News You Can Use",
];

export const LogoTicker = React.memo(() => {
  const tickerRef = useRef<HTMLDivElement>(null);
  const [tickerWidth, setTickerWidth] = useState(0);

  // Efficiently calculate the ticker width
  const calculateTickerWidth = useCallback(() => {
    if (tickerRef.current) {
      setTickerWidth(tickerRef.current.scrollWidth);
    }
  }, []);

  useEffect(() => {
    calculateTickerWidth();
    window.addEventListener("resize", calculateTickerWidth);
    return () => window.removeEventListener("resize", calculateTickerWidth);
  }, [calculateTickerWidth]);

  return (
    <div className="bg-customBlack text-customWhite py-[72px] sm:py-24">
      <div className="container">
        <h2 className="text-xl text-center text-customWhite/70">
          Sponsored by Food Truck Association Of Canada
        </h2>
        <h2 className="text-lg text-center text-customWhite/70 mt-2">
          How we support the industry:
        </h2>
        <div className="overflow-hidden mt-9 relative">
          <motion.div
            ref={tickerRef}
            initial={{ translateX: 0 }}
            animate={{ translateX: -tickerWidth / 2 }}
            transition={{
              duration: tickerWidth / 200,
              ease: "linear",
              repeat: Infinity,
            }}
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
});

LogoTicker.displayName = "LogoTicker";
