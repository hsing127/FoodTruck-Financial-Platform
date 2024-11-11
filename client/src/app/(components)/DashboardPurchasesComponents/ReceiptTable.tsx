import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ReceiptTableHeader from "./ReceiptTableHeader";
import ReceiptTableContent from "./ReceiptTableContent";
import Actions from "./Actions";

// Constants
const ROW_HEIGHT = 60;
const BOTTOM_PADDING = 40;
const MIN_ROWS = 6;

const ReceiptTable: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const [receipts, setReceipts] = useState<any[]>([]); // Full data fetched from API
  const [filteredReceipts, setFilteredReceipts] = useState<any[]>([]);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [editingReceiptId, setEditingReceiptId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [editedReceipt, setEditedReceipt] = useState<any>(null);
  const [itemsPerPage, setItemsPerPage] = useState(MIN_ROWS);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Functions to open and close the modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Fetch receipts data from AWS Lambda on component mount
  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const response = await fetch(
          "https://y4frxnym9g.execute-api.ca-central-1.amazonaws.com/dev/data/purchases",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: "ajwitt2@asu.edu" }),
          }
        );

        const data = await response.json();

        let purchasesData;
        if (typeof data.body === "string") {
          purchasesData = JSON.parse(data.body);
        } else {
          purchasesData = data.body;
        }

        // Assign localReceiptId sequentially to each purchase item and format date/time
        const receiptsWithId = purchasesData.purchases.map(
          (receipt: any, index: number) => {
            const dateObj = new Date(receipt.date);
            return {
              ...receipt,
              localReceiptId: index + 1001, // Start at 1 and increment
              date: dateObj.toLocaleDateString(), // Format date
              time: dateObj.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }), // Format time
            };
          }
        );

        setReceipts(receiptsWithId); // Store original data
        setFilteredReceipts(receiptsWithId); // Initialize filtered data
      } catch (error) {
        console.error("Error fetching receipts:", error);
      }
    };

    fetchReceipts();
  }, []);

  // Calculate number of items per page based on viewport height
  const calculateItemsPerPage = () => {
    const viewportHeight = window.innerHeight;
    const availableHeight = viewportHeight - 420 - BOTTOM_PADDING;
    const calculatedRows = Math.floor(availableHeight / ROW_HEIGHT);
    return Math.max(calculatedRows, MIN_ROWS); // min 6 rows
  };

  // Set items per page and add window resize listener
  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(calculateItemsPerPage());
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handle search input changes
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchInput(term);

    if (term === "") {
      // Reset to original receipts if search is cleared
      setFilteredReceipts(receipts);
    } else {
      const filtered = receipts.filter(
        (receipt) =>
          receipt.location.toLowerCase().includes(term) ||
          receipt.date.includes(term) ||
          receipt.cost.toLowerCase().includes(term)
      );
      setFilteredReceipts(filtered);
    }

    setCurrentPage(1);
    setIsAnimating(true); // Trigger animation on search
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
    setEditingReceiptId(receipt.localReceiptId);
    setEditedReceipt({ ...receipt });
  };

  // Handle save button click
  const handleSaveClick = () => {
    setFilteredReceipts((prev) =>
      prev.map((receipt) =>
        receipt.localReceiptId === editingReceiptId ? editedReceipt : receipt
      )
    );

    // Also update the full receipts list to keep it in sync
    setReceipts((prev) =>
      prev.map((receipt) =>
        receipt.localReceiptId === editingReceiptId ? editedReceipt : receipt
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
  const handleDeleteClick = (localReceiptId: number) => {
    setFilteredReceipts((prev) =>
      prev.filter((receipt) => receipt.localReceiptId !== localReceiptId)
    );

    // Also update the full receipts list to keep it in sync
    setReceipts((prev) =>
      prev.filter((receipt) => receipt.localReceiptId !== localReceiptId)
    );
  };

  // Handle item deletion for ingredients
  const handleItemDelete = (receiptId: number, itemIndex: number) => {
    setFilteredReceipts((prev) =>
      prev.map((receipt) =>
        receipt.localReceiptId === receiptId
          ? {
              ...receipt,
              details: receipt.details.filter(
                (_: any, idx: number) => idx !== itemIndex
              ),
            }
          : receipt
      )
    );
  };

  // Get the actions with dependencies
  const actionItems = Actions({ openModal });

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
      className={`pb-[${BOTTOM_PADDING}px] bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border-gray-700 flex flex-col h-full ${
        isAnimating ? "overflow-hidden" : "overflow-y-auto"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <ReceiptTableHeader
        searchInput={searchInput}
        handleSearch={handleSearch}
        actions={actionItems}
        isModalOpen={isModalOpen}
        openModal={openModal}
        closeModal={closeModal}
      />

      {filteredReceipts.length === 0 ? (
        <p className="text-center text-gray-600 mt-8">
          You have not uploaded or added any receipt data.
        </p>
      ) : (
        <ReceiptTableContent
          filteredReceipts={filteredReceipts}
          currentReceipts={currentReceipts}
          currentPage={currentPage}
          totalPages={totalPages}
          editingReceiptId={editingReceiptId}
          handleEditClick={handleEditClick}
          handleSaveClick={handleSaveClick}
          handleCancelClick={handleCancelClick}
          handleInputChange={handleInputChange}
          editedReceipt={editedReceipt}
          handleDeleteClick={handleDeleteClick}
          handleItemDelete={handleItemDelete}
          isRowExpanded={isRowExpanded}
          toggleRow={toggleRow}
          setIsAnimating={setIsAnimating}
          setCurrentPage={setCurrentPage}
        />
      )}
    </motion.div>
  );
};

export default ReceiptTable;
