import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { MENU_DATA } from "@/app/(components)/DashboardMenuComponents/MenuData";
import Pagination from "..//Common/Pagination";
import SearchInput from "../Common/SearchInput";
import MenuCard from "./MenuCard";
import MenuItemDetailsModal from "./MenuItemDetailsModal";
import AddMenuItemModal from "../DashboardMenuComponents/AddMenuItemModel";
import actions from "./Actions"; // Import the actions function
import { Ingredient, MenuItem } from "../../types/types";

const ROW_HEIGHT = 170;
const BOTTOM_PADDING = 40;
const ROWS = 4;
const ITEMS_PER_ROW = 3;
const MIN_ROWS = 2;

const MenuTable: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredMenu, setFilteredMenu] = useState<MenuItem[]>(MENU_DATA);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(MIN_ROWS * ITEMS_PER_ROW);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    []
  );
  const [isAddMenuItemModalOpen, setIsAddMenuItemModalOpen] = useState(false);

  // Functions to open and close the modals
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openAddMenuItemModal = () => setIsAddMenuItemModalOpen(true);
  const closeAddMenuItemModal = () => setIsAddMenuItemModalOpen(false);

  // Get the actions with dependencies
  const actionItems = actions({ openModal: openAddMenuItemModal });

  // Calculate items per page based on viewport height, with a minimum row count
  const calculateItemsPerPage = useCallback(() => {
    const viewportHeight = window.innerHeight;
    const availableHeight = viewportHeight - 420 - BOTTOM_PADDING;
    const rowsToDisplay = Math.min(
      Math.max(MIN_ROWS, Math.floor(availableHeight / ROW_HEIGHT)),
      ROWS
    );
    return rowsToDisplay * ITEMS_PER_ROW;
  }, []);

  useEffect(() => {
    const handleResize = () => setItemsPerPage(calculateItemsPerPage());
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [calculateItemsPerPage]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchInput(term);
    setFilteredMenu(
      MENU_DATA.filter((item) => item.name.toLowerCase().includes(term))
    );
    setCurrentPage(1);
    setIsAnimating(true);
  }, []);

  const handleMoreDetailsClick = (ingredients: Ingredient[]) => {
    setSelectedIngredients(ingredients);
    openModal();
  };

  // Close the modal
  const handleModalClose = () => closeModal();

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMenu.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMenu.length / itemsPerPage);

  // Animation variants for staggered animation
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  // Handle page change with animation
  const handlePageChange = (page: number) => {
    setIsAnimating(true);
    setCurrentPage(page);
  };

  // Handlers for editing ingredients in the modal
  const handleItemEdit = (index: number, updatedItem: Ingredient) => {
    setSelectedIngredients((prev) =>
      prev.map((item, idx) => (idx === index ? updatedItem : item))
    );
  };

  const handleItemDelete = (index: number) => {
    setSelectedIngredients((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleItemAdd = (newItem: Ingredient) => {
    setSelectedIngredients((prev) => [...prev, newItem]);
  };

  return (
    <motion.div
      className={`pb-[${BOTTOM_PADDING}px] bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border-gray-700 flex flex-col h-full ${
        isAnimating ? "overflow-hidden" : "overflow-auto"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Page Title and Search Input */}
      <div>
        <h2 className="text-xl font-semibold text-black mb-2">Menu Items</h2>
        <SearchInput
          searchInput={searchInput}
          handleSearch={handleSearch}
          actions={actionItems} // Use the actionItems here
        />
      </div>

      {/* Conditionally Render No Items Message or Grid of Menu Cards */}
      {filteredMenu.length === 0 ? (
        <p className="text-center text-gray-600 mt-8">
          No menu items found. Add or upload items to get started.
        </p>
      ) : (
        <>
          <motion.div
            className="mb-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 flex-grow"
            initial="hidden"
            animate="show"
            key={currentPage}
          >
            {currentItems.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                initial="hidden"
                animate="show"
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <MenuCard
                  item={item}
                  handleMoreDetailsClick={handleMoreDetailsClick}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={handlePageChange}
          />
        </>
      )}

      {/* Menu Item Details Modal */}
      <MenuItemDetailsModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        ingredients={selectedIngredients}
        onItemEdit={handleItemEdit}
        onItemDelete={handleItemDelete}
        onItemAdd={handleItemAdd}
      />

      {/* Add Menu Item Modal */}
      <AddMenuItemModal
        isOpen={isAddMenuItemModalOpen}
        onClose={closeAddMenuItemModal}
        // Pass any additional props needed for adding a menu item
      />
    </motion.div>
  );
};

export default MenuTable;
