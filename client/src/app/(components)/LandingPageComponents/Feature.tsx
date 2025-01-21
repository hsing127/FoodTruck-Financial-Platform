"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import React from "react";

const EcosystemIcon = dynamic(
  () => import("../../../assets/icons/ecosystem.svg"),
  { ssr: false }
);

export const Feature = React.memo(
  ({ title, description }: { title: string; description: string }) => {
    const offsetX = useMotionValue(-100);
    const offsetY = useMotionValue(-100);
    const maskImg = useMotionTemplate`radial-gradient(100px 100px at ${offsetX}px ${offsetY}px, black, transparent)`;
    const border = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const updateMouse = (e: MouseEvent) => {
        if (!border.current) return;
        const rect = border.current.getBoundingClientRect();
        offsetX.set(e.x - rect.x);
        offsetY.set(e.y - rect.y);
      };

      window.addEventListener("mousemove", updateMouse);
      return () => window.removeEventListener("mousemove", updateMouse);
    }, [offsetX, offsetY]);

    return (
      <div
        key={title}
        className="border border-customWhite/30 px-5 py-10 text-center rounded-xl sm:flex-1 max-w-sm mx-auto relative"
      >
        <motion.div
          className="light absolute inset-0 border-2 border-purple-400 rounded-xl"
          style={{ maskImage: maskImg, WebkitMaskImage: maskImg }}
          ref={border}
        ></motion.div>
        <div className="inline-flex h-14 w-14 bg-customWhite text-customBlack justify-center items-center rounded-lg">
          <EcosystemIcon />
        </div>
        <h3 className="mt-6 font-bold">{title}</h3>
        <p className="mt-2 text-customWhite/70">{description}</p>
      </div>
    );
  }
);

Feature.displayName = "Feature";
