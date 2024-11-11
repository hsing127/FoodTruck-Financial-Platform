import React from "react";
import { ChevronRight } from "lucide-react";
import { Ingredient, MenuItem } from "../../types/types";

interface MenuCardProps {
  item: MenuItem;
  handleMoreDetailsClick: (ingredients: Ingredient[]) => void;
}

// MenuCard component, memoized for performance optimization
const MenuCard: React.FC<MenuCardProps> = React.memo(
  ({ item, handleMoreDetailsClick }) => (
    <div className="p-4 border border-gray-300 bg-white rounded-xl shadow-md overflow-hidden flex flex-col items-center text-center">
      <div className="text-[#8B5CF6] pt-2">{item.image}</div>
      <p className="text-lg font-medium text-gray-600 mt-4">{item.price}</p>
      <h3 className="text-lg font-medium text-black">{item.name}</h3>
      {/* Button to trigger the view details action */}
      <button
        className="mb-2 text-sm text-blue-500 font-medium inline-flex items-center hover:text-blue-700 transition-colors duration-300"
        onClick={() => handleMoreDetailsClick(item.ingredients)}
      >
        View Details <ChevronRight className="w-4 h-4 ml-1" />
      </button>
    </div>
  )
);
MenuCard.displayName = "MenuCard";
export default MenuCard;
