import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MENU_DATA } from "@/app/(components)/DashboardMenuComponents/MenuData";
import Pagination from "../DashboardPurchasesComponents/Pagination";
import SearchInput from "../DashboardPurchasesComponents/SearchInput";
import MenuCard from "../DashboardMenuComponents/MenuCard";
import { Plus, Filter } from "lucide-react";
import MenuItemDetailsModal from "./MenuItemDetailsModal";

const ROW_HEIGHT = 195; // Approximate height of a menu card row
const BOTTOM_PADDING = 70;
const ROWS = 4;
const ITEMS_PER_ROW = 3;

interface Ingredient {
  ingredient: string;
  quantity: number;
  units: string;
  price: string;
}

const MenuTable: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredMenu, setFilteredMenu] = useState(MENU_DATA);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ROWS * ITEMS_PER_ROW);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    []
  );

  // Calculate items per page based on viewport height
  const calculateItemsPerPage = () => {
    const viewportHeight = window.innerHeight;
    const availableHeight = viewportHeight - 420 - BOTTOM_PADDING;
    const maxRows = Math.floor(availableHeight / ROW_HEIGHT);
    const rowsToDisplay = Math.min(maxRows, ROWS);
    return rowsToDisplay * ITEMS_PER_ROW;
  };

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(calculateItemsPerPage());
    };

    // Set items per page initially and add resize event listener
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handle search input changes
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchInput(term);
    const filtered = MENU_DATA.filter((item) =>
      item.name.toLowerCase().includes(term)
    );
    setFilteredMenu(filtered);
    setCurrentPage(1);
    setIsAnimating(true); // Re-trigger animation on search
  };

  // Handle "More Details" click to open the modal with selected ingredients
  const handleMoreDetailsClick = (ingredients: Ingredient[]) => {
    setSelectedIngredients(ingredients);
    setIsModalOpen(true);
  };

  // Close the modal
  const handleModalClose = () => setIsModalOpen(false);

  // Calculate pagination indices
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMenu.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMenu.length / itemsPerPage);

  // Animation variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.05,
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  // Handle page change with animation
  const handlePageChange = (page: number) => {
    setIsAnimating(true); // Trigger animation when changing pages
    setCurrentPage(page);
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
          actions={[
            {
              icon: <Plus size={20} />,
              type: "addEntry",
              title: "Add Menu Item",
              items: ["Add Menu Item"],
            },
            {
              icon: <Filter size={20} />,
              type: "filter",
              title: "Filter",
              items: ["Filter by Date", "Filter by Cost"],
            },
          ]}
        />
      </div>

      {/* Grid of Menu Cards */}
      <motion.div
        className="mb-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 flex-grow"
        initial="hidden"
        animate="show"
        variants={containerVariants}
        onAnimationComplete={() => setIsAnimating(false)} // Reset after animation
        key={currentPage} // Add key to trigger re-render
      >
        {currentItems.map((item) => (
          <motion.div key={item.id} variants={itemVariants}>
            <MenuCard
              item={item}
              handleMoreDetailsClick={handleMoreDetailsClick} // Pass handleMoreDetailsClick to MenuCard
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

      {/* Menu Item Details Modal */}
      <MenuItemDetailsModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        ingredients={selectedIngredients}
        onItemEdit={(index, updatedItem) => {
          setSelectedIngredients((prev) =>
            prev.map((item, idx) => (idx === index ? updatedItem : item))
          );
        }}
        onItemDelete={(index) => {
          setSelectedIngredients((prev) =>
            prev.filter((_, idx) => idx !== index)
          );
        }}
      />
    </motion.div>
  );
};

export default MenuTable;
