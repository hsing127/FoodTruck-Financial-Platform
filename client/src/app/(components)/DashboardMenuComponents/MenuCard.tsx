import React from "react";
import { ChevronRight } from "lucide-react";
import Dropdown from "../Common/Dropdown";
import { MenuItem } from "@/app/types/types";

interface MenuCardProps {
  item: MenuItem;
  handleMoreDetailsClick: (menuItem: MenuItem) => void;
  onEdit: (item: MenuItem) => void;
  onDelete: (item: MenuItem) => void;
}

const MenuCard: React.FC<MenuCardProps> = React.memo(
  ({ item, handleMoreDetailsClick, onEdit, onDelete }) => {
    // Define the dropdown options
    const dropdownOptions = ["Edit", "Delete"];

    // Handle selection from dropdown
    const handleDropdownSelect = (option: string) => {
      if (option === "Edit") {
        onEdit(item);
      } else if (option === "Delete") {
        onDelete(item);
      }
    };

    return (
      <div className="relative p-4 border border-gray-300 bg-white rounded-xl shadow-md overflow-hidden flex flex-col items-center text-center">
        <div className="absolute top-2 right-2">
          <Dropdown
            options={dropdownOptions}
            selected=""
            onSelect={handleDropdownSelect}
          />
        </div>

        {/* Menu Item Image */}
        <div className="text-[#8B5CF6] pt-2">{item.image}</div>

        {/* Menu Item Price */}
        <p className="text-lg font-medium text-gray-600 mt-4">{item.price}</p>

        {/* Menu Item Name */}
        <h3 className="text-sm font-medium text-black">{item.name}</h3>

        {/* Button to View Details */}
        <button
          className="mb-2 text-sm text-blue-500 font-medium inline-flex items-center hover:text-blue-700 transition-colors duration-300"
          onClick={() => handleMoreDetailsClick(item)}
        >
          View Details <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    );
  }
);

MenuCard.displayName = "MenuCard";
export default MenuCard;
