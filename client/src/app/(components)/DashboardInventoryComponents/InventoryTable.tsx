import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import InventoryTableRow from "./InventoryTableRow";
import SearchInput from "../DashboardPurchasesComponents/SearchInput";
import Pagination from "../DashboardPurchasesComponents/Pagination";
import { Upload, Plus, Filter } from "lucide-react";

const ROW_HEIGHT = 60;
const BOTTOM_PADDING = 40;

const InventoryTable: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredInventory, setFilteredInventory] = useState<any[]>([]);
  const [editingInventoryName, setEditingInventoryName] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editedInventory, setEditedInventory] = useState<any>(null);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const response = await fetch("https://y4frxnym9g.execute-api.ca-central-1.amazonaws.com/dev/data/inventory", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          //Will be changed to reference JSON Tokening to populate unique inventory data per user
          body: JSON.stringify({ email: "wenjiex1@asu.edu" }),
        });
        
        if (!response.ok) {
          throw new Error("Failed to fetch inventory data");
        }
        
        const data = await response.json();
  
        // Parse the 'body' field, which contains the actual inventory data as a JSON string
        const parsedBody = JSON.parse(data.body);
  
        if (parsedBody.inventory && Array.isArray(parsedBody.inventory)) {
          setFilteredInventory(parsedBody.inventory);
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
    const filtered = filteredInventory.filter(
      item =>
        item.Name.toLowerCase().includes(term) ||
        item.AmountUnits.toLowerCase().includes(term)
    );
    setFilteredInventory(filtered);
    setCurrentPage(1);
  };

  // Edit button click handler
  const handleEditClick = (inventory: any) => {
    setEditingInventoryName(inventory.Name);
    setEditedInventory({ ...inventory });
  };

  // Save button click handler
  const handleSaveClick = () => {
    setFilteredInventory(prev =>
      prev.map((inventory) =>
        inventory.Name === editingInventoryName ? editedInventory : inventory
      )
    );
    setEditingInventoryName("");
    setEditedInventory(null);
  };

  // Cancel button click handler
  const handleCancelClick = () => {
    setEditingInventoryName("");
    setEditedInventory(null);
  };

  // Input change handler during editing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedInventory((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Delete button click handler
  const handleDeleteClick = (inventoryName: string) => {
    setFilteredInventory((prev) =>
      prev.filter((inventory) => inventory.Name !== inventoryName)
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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={setCurrentPage}
      />
    </motion.div>
  );
};

export default InventoryTable;
