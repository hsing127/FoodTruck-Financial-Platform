// InventoryTable.tsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import InventoryTableRow from "./InventoryTableRow";
import SearchInput from "../Common/SearchInput";
import Pagination from "../Common/Pagination";
import { Upload, Plus, Filter } from "lucide-react";
import { InventoryItem } from "@/app/types/types";

const ROW_HEIGHT = 60;
const BOTTOM_PADDING = 40;

const InventoryTable: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [filteredInventory, setFilteredInventory] = useState<InventoryItem[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const response = await fetch(
          "https://y4frxnym9g.execute-api.ca-central-1.amazonaws.com/dev/data/inventory",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            // Will be changed to reference JSON Tokening to populate unique inventory data per user
            body: JSON.stringify({ email: "wenjiex1@asu.edu" }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch inventory data");
        }

        const data = await response.json();

        // Parse the 'body' field, which contains the actual inventory data as a JSON string
        const parsedBody = JSON.parse(data.body);

        if (parsedBody.inventory && Array.isArray(parsedBody.inventory)) {
          const items = parsedBody.inventory as InventoryItem[];
          setInventoryItems(items);
          setFilteredInventory(items);
        } else {
          console.error("Unexpected data format:", parsedBody);
        }
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchInventoryData();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchInput(term);
    const filtered = inventoryItems.filter(
      (item) =>
        item.Name.toLowerCase().includes(term) ||
        item.AmountUnits.toLowerCase().includes(term)
    );
    setFilteredInventory(filtered);
    setCurrentPage(1);
  };

  const handleItemEdit = (index: number, updatedItem: InventoryItem) => {
    const itemToEdit = filteredInventory[index];

    // Update filteredInventory
    setFilteredInventory((prev) =>
      prev.map((item, idx) => (idx === index ? updatedItem : item))
    );

    // Update inventoryItems
    setInventoryItems((prev) =>
      prev.map((item) => (item.Name === itemToEdit.Name ? updatedItem : item))
    );
  };

  const handleItemDelete = (index: number) => {
    const itemToDelete = filteredInventory[index];

    // Update filteredInventory
    setFilteredInventory((prev) => prev.filter((_, idx) => idx !== index));

    // Update inventoryItems
    setInventoryItems((prev) =>
      prev.filter((item) => item.Name !== itemToDelete.Name)
    );
  };

  const calculateItemsPerPage = () => {
    const viewportHeight = window.innerHeight;
    const availableHeight = viewportHeight - 420 - BOTTOM_PADDING;
    return Math.max(1, Math.floor(availableHeight / ROW_HEIGHT));
  };

  useEffect(() => {
    const handleResize = () => setItemsPerPage(calculateItemsPerPage());
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Pagination calculations
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
                {currentInventory.map((item, idx) => (
                  <InventoryTableRow
                    key={`${item.Name}-${indexOfFirstInventory + idx}`}
                    item={item}
                    index={indexOfFirstInventory + idx}
                    onItemEdit={handleItemEdit}
                    onItemDelete={handleItemDelete}
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
