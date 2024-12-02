import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import Dropdown from "../Common/Dropdown";
import { MenuItem } from "@/app/types/types";
import ContextMenu from "../Common/ContextMenu"; 

interface MenuCardProps {
  item: MenuItem;
  handleMoreDetailsClick: (menuItem: MenuItem) => void;
  onEdit: (item: MenuItem) => void;
  onDelete: (item: MenuItem) => void;
  duplicateMenuItem: (item: MenuItem) => void; 
}

const MenuCard: React.FC<MenuCardProps> = React.memo(
  ({ item, handleMoreDetailsClick, onEdit, onDelete, duplicateMenuItem }) => {
    const dropdownOptions = ["Edit", "Delete", "Duplicate"];

    // State for context menu
    const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({
      x: 0,
      y: 0,
    });

    // Handle selection from dropdown
    const handleDropdownSelect = (option: string) => {
      if (option === "Edit") {
        onEdit(item);
      } else if (option === "Delete") {
        onDelete(item);
      } else if (option === "Duplicate") {
        duplicateMenuItem(item);
      }
    };

    // Handle right-click to open context menu
    const handleContextMenu = (e: React.MouseEvent) => {
      e.preventDefault();
      setIsContextMenuOpen(true);
      setContextMenuPosition({ x: e.clientX, y: e.clientY });
    };

    // Handle selection from context menu
    const handleContextMenuSelect = (option: string, e: React.MouseEvent) => {
      if (option === "Edit") {
        onEdit(item);
      } else if (option === "Delete") {
        onDelete(item);
      } else if (option === "Duplicate") {
        duplicateMenuItem(item);
      }
      setIsContextMenuOpen(false);
    };

    // Close context menu
    const handleCloseContextMenu = () => {
      setIsContextMenuOpen(false);
    };

    return (
      <>
        <div
          className="relative p-4 border border-gray-300 bg-white rounded-xl shadow-md overflow-hidden flex flex-col items-center text-center cursor-pointer"
          onContextMenu={handleContextMenu} // Add right-click handler
        >
          {/* Dropdown Menu */}
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

        {/* Context Menu */}
        {isContextMenuOpen && (
          <ContextMenu
            options={dropdownOptions}
            position={contextMenuPosition}
            onSelect={handleContextMenuSelect}
            onClose={handleCloseContextMenu}
          />
        )}
      </>
    );
  }
);

MenuCard.displayName = "MenuCard";
export default MenuCard;
