import Image from "next/image";
import Logo from "./../../../assets/Logo.png";
import MenuIcon from "../../../assets/icons/menu.svg";
import Link from "next/link"; // Using Next.js Link instead of react-router-dom

export const Navbar = () => {
  return (
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
          <div className="border border-customWhite border-opacity-30 h-10 w-10 inline-flex justify-center items-center rounded-lg sm:hidden">
            <MenuIcon className="text-customWhite" />
          </div>
          <nav className="flex gap-6 items-center hidden sm:flex">
            <a
              href="#"
              className="text-opacity-60 text-customWhite hover:text-opacity-100 transition"
            >
              About
            </a>
            <a
              href="#"
              className="text-opacity-60 text-customWhite hover:text-opacity-100 transition"
            >
              Features
            </a>
            <a
              href="#"
              className="text-opacity-60 text-customWhite hover:text-opacity-100 transition"
            >
              Updates
            </a>
            <a
              href="#"
              className="text-opacity-60 text-customWhite hover:text-opacity-100 transition"
            >
              Help
            </a>
            <a
              href="#"
              className="text-opacity-60 text-customWhite hover:text-opacity-100 transition"
            >
              Contact Us
            </a>
            <Link href="/login/signup">
              <button className="bg-customWhite text-customBlack py-2 px-4 rounded-lg">
                Create Account
              </button>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};
