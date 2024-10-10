import appScreen from "../../assets/teamImage.png";
import Image from "next/image";

export const ProductShowcase = () => {
  return (
    <div className="bg-black text-white bg-gradient-to-b from-black to-[#5D2CA8] sm:py-24 py-[72px]">
      <div className="container">
        <h2 className="text-center text-5xl sm:text-6xl font-bold tracking-tighter">Intuitive Interface</h2>
        <div className="max-w-xl mx-auto">
          <p className="text-xl text-center text-white/70 mt-5">FoodTrack is a comprehensive platform designed to streamline financial
            management for food truck owners. From automating expense tracking to
            providing insightful analytics, FoodTrack helps you focus on what matters most&#8212;running your business.
          </p>
        </div>
        <Image src={appScreen} alt="the Product Screenshot" className="mt-14" />
      </div>
    </div>
  );
};
