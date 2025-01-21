"use client";
import dynamic from "next/dynamic";
import React from "react";

// Disable SSR for these SVG icons.
const Insta = dynamic(() => import("../../../assets/icons/insta.svg"), {
  ssr: false,
});
const Pinterest = dynamic(() => import("../../../assets/icons/pinterest.svg"), {
  ssr: false,
});
const Tiktok = dynamic(() => import("../../../assets/icons/tiktok.svg"), {
  ssr: false,
});
const Youtube = dynamic(() => import("../../../assets/icons/youtube.svg"), {
  ssr: false,
});

export const Footer = React.memo(() => {
  return (
    <footer className="py-5 bg-customBlack text-customWhite/60 border-t border-customWhite/20">
      <div className="container">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <div className="text-center">
            2024 FoodTrack, Inc. All rights reserved
          </div>
          <ul className="flex justify-center gap-2.5">
            <li>
              <Insta />
            </li>
            <li>
              <Pinterest />
            </li>
            <li>
              <Tiktok />
            </li>
            <li>
              <Youtube />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
