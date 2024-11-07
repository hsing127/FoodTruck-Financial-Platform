import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import InventoryTableRow from "./InventoryTableRow";
import SearchInput from "../DashboardPurchasesComponents/SearchInput";
import Pagination from "../DashboardPurchasesComponents/Pagination";
import { INVENTORY_DATA } from "@/app/(components)/DashboardInventoryComponents/InventoryData";
import { Upload, Plus, Filter } from "lucide-react";

// Approximate height of a single row (including padding/margins)
const ROW_HEIGHT = 60;
const BOTTOM_PADDING = 40;

const InventoryTable: React.FC = () => {
  // State hooks to manage search input, filtered data, and editing
  const [searchInput, setSearchInput] = useState("");
  const [filteredInventory, setFilteredInventory] = useState(INVENTORY_DATA);
  const [editingInventoryName, setEditingInventoryName] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editedInventory, setEditedInventory] = useState<any>(null);
  const [itemsPerPage, setItemsPerPage] = useState(8); // Initial items per page

  const calculateItemsPerPage = () => {
    const viewportHeight = window.innerHeight;
    const availableHeight = viewportHeight - 420 - BOTTOM_PADDING;
    const items = Math.floor(availableHeight / ROW_HEIGHT);
    return items > 0 ? items : 1; // Ensure at least one item per page
  };

  // Update items per page when the component mounts or when the window resizes
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
    const filtered = INVENTORY_DATA.filter(
      (inventory) =>
        inventory.Name.toLowerCase().includes(term) ||
        inventory.AmountUnits.toLowerCase().includes(term)
    );
    setFilteredInventory(filtered);
    setCurrentPage(1);
  };

  // Handle edit button click
  const handleEditClick = (inventory: any) => {
    setEditingInventoryName(inventory.Name);
    setEditedInventory({ ...inventory });
  };

  // Handle save button click
  const handleSaveClick = () => {
    setFilteredInventory((prev) =>
      prev.map((inventory) =>
        inventory.Name === editingInventoryName ? editedInventory : inventory
      )
    );
    setEditingInventoryName("");
    setEditedInventory(null);
  };

  // Handle cancel button click
  const handleCancelClick = () => {
    setEditingInventoryName("");
    setEditedInventory(null);
  };

  // Handle input changes during editing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedInventory((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle delete button click
  const handleDeleteClick = (inventoryName: string) => {
    setFilteredInventory((prev) =>
      prev.filter((inventory) => inventory.Name !== inventoryName)
    );
  };

  // Calculate pagination indices
  const indexOfLastInventory = currentPage * itemsPerPage;
  const indexOfFirstInventory = indexOfLastInventory - itemsPerPage;
  const currentInventory = filteredInventory.slice(
    indexOfFirstInventory,
    indexOfLastInventory
  );
  const totalPages = Math.ceil(filteredInventory.length / itemsPerPage);

  return (
    <motion.div
      className={`pb-[${BOTTOM_PADDING}px] bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border-gray-700 flex flex-col h-full`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-black mb-2">Inventory:</h2>

        {/* Search Input */}
        <div className="w-full">
          <SearchInput
            searchInput={searchInput}
            handleSearch={handleSearch}
            actions={[
              {
                icon: <Upload size={20} />,
                type: "upload",
                title: "Upload File",
                items: [
                  "Upload Image",
                  "Upload Document",
                  "Upload Spreadsheet",
                ],
              },
              {
                icon: <Plus size={20} />,
                type: "addEntry",
                title: "Add Entry",
                items: ["Add Manual Entry", "Add Expense"],
              },
              {
                icon: <Filter size={20} />,
                type: "filter",
                title: "Filter",
                items: [
                  "Filter by Date",
                  "Filter by Cost",
                  "Filter by Location",
                ],
              },
            ]}
          />
        </div>
      </div>

      {/* Conditionally Render No Items Message or Inventory Table */}
      {filteredInventory.length === 0 ? (
        <p className="text-center text-gray-600 mt-8">
          No inventory items found. Add or upload items to get started.
        </p>
      ) : (
        <>
          {/* Table to display inventory data */}
          <div className="flex-grow overflow-y-auto">
            <table className="min-w-full divide-y divide-white">
              <thead>
                <tr>
                  <th className="pl-7 text-left w-1/3 py-2 text-xs font-medium text-black uppercase tracking-wider">
                    Ingredient Name
                  </th>
                  <th className="text-left w-1/3 text-xs font-medium text-black uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="text-left w-1/3 text-xs font-medium text-black uppercase tracking-wider">
                    Units
                  </th>
                  <th className="pr-6 w-[100px] text-left text-xs font-medium text-black uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white">
                {/* Map through currentInventory and render each row */}
                {currentInventory.map((inventory) => (
                  <InventoryTableRow
                    key={inventory.Name}
                    inventory={inventory}
                    editingInventoryName={editingInventoryName}
                    handleEditClick={handleEditClick}
                    handleSaveClick={handleSaveClick}
                    handleCancelClick={handleCancelClick}
                    handleInputChange={handleInputChange}
                    editedInventory={editedInventory}
                    handleDeleteClick={handleDeleteClick}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={setCurrentPage}
          />
        </>
      )}
    </motion.div>
  );
};

export default InventoryTable;
