import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ReceiptTableRow from "./ReceiptTableRow";
import SearchInput from "./SearchInput";
import Pagination from "./Pagination";
import { RECEIPT_DATA } from "@/app/(components)/DashboardPurchasesComponents/ReceiptData";

// Approximate height of a single row (including padding/margins)
const ROW_HEIGHT = 60;

const ReceiptTable: React.FC = () => {
  // State hooks to manage search input, filtered data, expanded rows, and editing
  const [searchInput, setSearchInput] = useState("");
  const [filteredReceipts, setFilteredReceipts] = useState(RECEIPT_DATA);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [editingReceiptId, setEditingReceiptId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [editedReceipt, setEditedReceipt] = useState<any>(null);
  const [itemsPerPage, setItemsPerPage] = useState(8); // Initial items per page

  // Function to calculate items per page based on viewport height
  const calculateItemsPerPage = () => {
    const viewportHeight = window.innerHeight;
    const tableHeight = viewportHeight * 0.5; 
    const items = Math.floor(tableHeight / ROW_HEIGHT);
    return items;
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
    const filtered = RECEIPT_DATA.filter(
      (receipt) =>
        receipt.location.toLowerCase().includes(term) ||
        receipt.date.includes(term) ||
        receipt.cost.toLowerCase().includes(term)
    );
    setFilteredReceipts(filtered);
    setCurrentPage(1);
  };

  // Toggle the row expansion state
  const toggleRow = (id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  // Check if a row is expanded
  const isRowExpanded = (id: number) => expandedRows.includes(id);

  // Handle edit button click
  const handleEditClick = (receipt: any) => {
    setEditingReceiptId(receipt.receiptId);
    setEditedReceipt({ ...receipt });
  };

  // Handle save button click
  const handleSaveClick = () => {
    setFilteredReceipts((prev) =>
      prev.map((receipt) =>
        receipt.receiptId === editingReceiptId ? editedReceipt : receipt
      )
    );
    setEditingReceiptId(null);
    setEditedReceipt(null);
  };

  // Handle cancel button click
  const handleCancelClick = () => {
    setEditingReceiptId(null);
    setEditedReceipt(null);
  };

  // Handle input changes during editing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedReceipt((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle delete button click
  const handleDeleteClick = (receiptId: number) => {
    setFilteredReceipts((prev) =>
      prev.filter((receipt) => receipt.receiptId !== receiptId)
    );
  };

  // Calculate pagination indices
  const indexOfLastReceipt = currentPage * itemsPerPage;
  const indexOfFirstReceipt = indexOfLastReceipt - itemsPerPage;
  const currentReceipts = filteredReceipts.slice(
    indexOfFirstReceipt,
    indexOfLastReceipt
  );
  const totalPages = Math.ceil(filteredReceipts.length / itemsPerPage);

  return (
    <motion.div
      className="bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-black mb-4">Receipt List</h2>

        {/* Search Input */}
        <div className="w-full">
          <SearchInput searchInput={searchInput} handleSearch={handleSearch} />
        </div>
      </div>

      {/* Table to display receipt data */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white">
          <thead>
            <tr>
              <th className="pl-7 text-left w-1/5 py-2 text-xs font-medium text-black uppercase tracking-wider">
                Receipt ID
              </th>
              <th className="text-left w-1/5 text-xs font-medium text-black uppercase tracking-wider">
                Location
              </th>
              <th className="text-left w-1/5 text-xs font-medium text-black uppercase tracking-wider">
                Date
              </th>
              <th className="text-left w-1/5 text-xs font-medium text-black uppercase tracking-wider">
                Time
              </th>
              <th className="text-left w-1/5 text-xs font-medium text-black uppercase tracking-wider">
                Cost
              </th>
              <th className="pr-6 w-[100px] text-left text-xs font-medium text-black uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white">
            {/* Map through currentReceipts and render each row */}
            {currentReceipts.map((receipt) => (
              <ReceiptTableRow
                key={receipt.receiptId}
                receipt={receipt}
                isRowExpanded={isRowExpanded}
                toggleRow={toggleRow}
                editingReceiptId={editingReceiptId}
                handleEditClick={handleEditClick}
                handleSaveClick={handleSaveClick}
                handleCancelClick={handleCancelClick}
                handleInputChange={handleInputChange}
                editedReceipt={editedReceipt}
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

export default ReceiptTable;
