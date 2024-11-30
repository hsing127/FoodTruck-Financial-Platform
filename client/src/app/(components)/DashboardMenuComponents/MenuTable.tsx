import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Pagination from "../Common/Pagination";
import SearchInput from "../Common/SearchInput";
import { Plus, ArrowUp, ArrowDown, Filter } from "lucide-react";
import { MenuItem } from "@/app/types/types";
import AddMenuItemModal from "./AddMenuItemModal";
import ConfirmModal from "../Common/ConfirmModal";
import useSortLogic from "../Common/SortingLogic";
import { itemVariants, tableVariants } from "../Common/Animations";
import ViewMenuItemDetailsModal from "./ViewMenuIngredientsModal";
import MenuCard from "./MenuCard";

// Constants
const ROW_HEIGHT = 170;
const BOTTOM_PADDING = 40;
const ROWS = 4;
const ITEMS_PER_ROW = 3;
const MIN_ROWS = 2;

interface MenuTableProps {
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
}

const MenuTable: React.FC<MenuTableProps> = ({ menuItems, setMenuItems }) => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredMenu, setFilteredMenu] = useState<MenuItem[]>(menuItems);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(MIN_ROWS * ITEMS_PER_ROW);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [showAddMenuItemModal, setShowAddMenuItemModal] = useState(false);
  const [showEditMenuItemModal, setShowEditMenuItemModal] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(
    null
  );
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [menuItemToDelete, setMenuItemToDelete] = useState<MenuItem | null>(
    null
  );

  // Custom useSortLogic hook
  const { sortField, sortOrder, setSortFieldAndOrder, sortData } =
    useSortLogic<MenuItem>();

  // Handle saving a new menu item
  const handleSaveMenuItem = (menuItem: MenuItem) => {
    const updatedMenu = [...menuItems, menuItem];
    setMenuItems(updatedMenu);

    // Apply current search and sort to the updated menu
    let filtered = updatedMenu;
    if (searchInput !== "") {
      filtered = updatedMenu.filter((item) =>
        item.name.toLowerCase().includes(searchInput)
      );
    }

    const sortedFiltered = sortData(filtered);
    setFilteredMenu(sortedFiltered);
    setCurrentPage(1);
    setIsAnimating(true);
  };

  // Handle updating an existing menu item
  const handleUpdateMenuItem = (updatedMenuItem: MenuItem) => {
    const updatedMenu = menuItems.map((item) =>
      item.id === updatedMenuItem.id ? updatedMenuItem : item
    );
    setMenuItems(updatedMenu);

    // Apply current search and sort to the updated menu
    let filtered = updatedMenu;
    if (searchInput !== "") {
      filtered = updatedMenu.filter((item) =>
        item.name.toLowerCase().includes(searchInput)
      );
    }

    const sortedFiltered = sortData(filtered);
    setFilteredMenu(sortedFiltered);
    setCurrentPage(1);
    setIsAnimating(true);
  };

  // Handle initiating deletion of a menu item
  const initiateDeleteMenuItem = (item: MenuItem) => {
    setMenuItemToDelete(item);
    setIsConfirmModalOpen(true);
  };

  // Handle confirming deletion of a menu item
  const handleConfirmDelete = () => {
    if (menuItemToDelete) {
      const updatedMenu = menuItems.filter(
        (item) => item.id !== menuItemToDelete.id
      );
      setMenuItems(updatedMenu);

      // Apply current search and sort to the updated menu
      let filtered = updatedMenu;
      if (searchInput !== "") {
        filtered = updatedMenu.filter((item) =>
          item.name.toLowerCase().includes(searchInput)
        );
      }

      const sortedFiltered = sortData(filtered);
      setFilteredMenu(sortedFiltered);
      setCurrentPage(1);
      setIsAnimating(true);
      setMenuItemToDelete(null);
      setIsConfirmModalOpen(false);
    }
  };

  // Handle cancelling deletion
  const handleCancelDelete = () => {
    setMenuItemToDelete(null);
    setIsConfirmModalOpen(false);
  };

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
    const handleResize = () => {
      const newItemsPerPage = calculateItemsPerPage();
      setItemsPerPage(newItemsPerPage);

      const newTotalPages = Math.ceil(filteredMenu.length / newItemsPerPage);
      if (currentPage > newTotalPages) {
        setCurrentPage(newTotalPages > 0 ? newTotalPages : 1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [calculateItemsPerPage, filteredMenu.length, currentPage]);

  // Handle search input changes
  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const term = e.target.value.toLowerCase();
      setSearchInput(term);
      let filtered = menuItems;

      if (term !== "") {
        filtered = menuItems.filter((item) =>
          item.name.toLowerCase().includes(term)
        );
      }

      const sortedFiltered = sortData(filtered);
      setFilteredMenu(sortedFiltered);
      setCurrentPage(1);
      setIsAnimating(true);
    },
    [menuItems, sortData]
  );

  // Handle clicking "More Details" on a menu item
  const handleMoreDetailsClick = (menuItem: MenuItem) => {
    setSelectedMenuItem(menuItem);
    setIsDetailsModalOpen(true);
  };

  // Close the ViewMenuItemDetailsModal
  const handleDetailsModalClose = () => {
    setIsDetailsModalOpen(false);
    setSelectedMenuItem(null);
  };

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMenu.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMenu.length / itemsPerPage);

  // Handle page change with animation
  const handlePageChange = (page: number) => {
    setIsAnimating(true);
    setCurrentPage(page);
  };

  // Handle action items from SearchInput
  const handleActionItemClick = (actionType: string, item: string) => {
    if (actionType === "addEntry" && item === "Add Menu Item") {
      setShowAddMenuItemModal(true);
    } else if (actionType === "sort") {
      let field: "name" | "price" | "ingredients" | null = null;
      switch (item) {
        case "Sort by Name":
          field = "name";
          break;
        case "Sort by Price":
          field = "price";
          break;
        case "Sort by Ingredients":
          field = "ingredients";
          break;
        default:
          console.log(`Unknown sort item: ${item}`);
      }

      if (field) {
        setSortFieldAndOrder(field);
      }
    } else {
      console.log(`Action: ${actionType}, Item: ${item}`);
    }
  };

  // Apply sorting whenever sortField or sortOrder changes
  useEffect(() => {
    if (sortField) {
      const sorted = sortData(filteredMenu);
      setFilteredMenu(sorted);
      setCurrentPage(1);
      setIsAnimating(true);
    }
  }, [sortField, sortOrder, sortData, filteredMenu]);

  // Debugging: Log state changes
  useEffect(() => {
    console.log("Sort Field:", sortField);
    console.log("Sort Order:", sortOrder);
    console.log("Filtered Menu Length:", filteredMenu.length);
    console.log("Current Page:", currentPage);
    console.log("Total Pages:", totalPages);
  }, [sortField, sortOrder, filteredMenu.length, currentPage, totalPages]);

  // Update filteredMenu whenever menuItems change
  useEffect(() => {
    let filtered = menuItems;
    if (searchInput !== "") {
      filtered = menuItems.filter((item) =>
        item.name.toLowerCase().includes(searchInput)
      );
    }
    const sortedFiltered = sortData(filtered);
    setFilteredMenu(sortedFiltered);
  }, [menuItems, searchInput, sortData]);

  // Function to duplicate a menu item
  const duplicateMenuItem = useCallback(
    (itemToDuplicate: MenuItem) => {
      const newId = Math.max(0, ...menuItems.map((i) => i.id)) + 1;

      const newItem: MenuItem = {
        ...itemToDuplicate,
        id: newId,
        name: `Copy of ${itemToDuplicate.name}`,
      };

      setMenuItems((prevMenu) => [...prevMenu, newItem]);

      // Apply current search and sort to the updated menu
      let filtered = [...menuItems, newItem];
      if (searchInput !== "") {
        filtered = filtered.filter((item) =>
          item.name.toLowerCase().includes(searchInput)
        );
      }

      const sortedFiltered = sortData(filtered);
      setFilteredMenu(sortedFiltered);
      setCurrentPage(1);
      setIsAnimating(true);
    },
    [menuItems, setMenuItems, searchInput, sortData]
  );

  return (
    <motion.div
      className={`pb-[${BOTTOM_PADDING}px] bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border-gray-700 flex flex-col h-full ${
        isAnimating ? "overflow-hidden" : "overflow-auto"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Page Title and Sort Indicator */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold text-black">Menu Items</h2>
        {sortField && (
          <span className="pt-2 flex items-center text-sm text-black">
            Sorted by {sortField.charAt(0).toUpperCase() + sortField.slice(1)}
            {sortOrder === "asc" ? (
              <ArrowUp size={16} className="ml-1" />
            ) : (
              <ArrowDown size={16} className="ml-1" />
            )}
          </span>
        )}
      </div>

      {/* Search Input */}
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
            type: "sort",
            title: "Sort",
            items: ["Sort by Name", "Sort by Price", "Sort by Ingredients"],
          },
        ]}
        onActionItemClick={handleActionItemClick}
      />

      {/* AddMenuItemModal */}
      <AddMenuItemModal
        isOpen={showAddMenuItemModal}
        onClose={() => setShowAddMenuItemModal(false)}
        onSave={handleSaveMenuItem}
      />

      {/* EditMenuItemModal */}
      {selectedMenuItem && showEditMenuItemModal && (
        <ViewMenuItemDetailsModal
          isOpen={showEditMenuItemModal}
          onClose={() => setShowEditMenuItemModal(false)}
          menuItem={selectedMenuItem}
          onSave={handleUpdateMenuItem}
        />
      )}

      {/* ConfirmModal for Deletion */}
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        title="Confirm Deletion"
        message={
          menuItemToDelete
            ? `Are you sure you want to delete the menu item "${menuItemToDelete.name}"? This action cannot be undone.`
            : ""
        }
        proTip="Pro Tip: Hold down Shift while clicking Delete to bypass this confirmation."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      {/* Conditionally Render No Items Message or Grid of Menu Cards */}
      {filteredMenu.length === 0 ? (
        <p className="text-center text-gray-600 mt-8">
          No menu items found. Add or upload items to get started.
        </p>
      ) : (
        <>
          <motion.div
            className="mb-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 flex-grow"
            variants={tableVariants}
            initial="hidden"
            animate="visible"
            key={currentPage} // To trigger animation on page change
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
                  onEdit={(item) => {
                    setSelectedMenuItem(item);
                    setShowEditMenuItemModal(true);
                  }}
                  onDelete={initiateDeleteMenuItem}
                  duplicateMenuItem={duplicateMenuItem}
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
      <ViewMenuItemDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={handleDetailsModalClose}
        menuItem={selectedMenuItem}
        onSave={handleUpdateMenuItem}
      />
    </motion.div>
  );
};

export default MenuTable;
