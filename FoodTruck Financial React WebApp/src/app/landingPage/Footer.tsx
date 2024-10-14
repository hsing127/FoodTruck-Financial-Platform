import Insta from "../../assets/icons/insta.svg";
import X from "../../assets/icons/x-social.svg";
import Tiktok from "../../assets/icons/tiktok.svg";
import Youtube from "../../assets/icons/youtube.svg";

export const Footer = () => {
  return (
    <footer className="py-5 bg-customBlack text-customWhite/60 border-t border-customWhite/20">
      <div className="container">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <div className="text-center">
            2024 FoodTrack, Inc. All rights reserved
          </div>
          <div className=""></div>
          <ul className="flex justify-center gap-2.5">
            <li>
              <Insta />
            </li>
            <li>
              <X />
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
};
