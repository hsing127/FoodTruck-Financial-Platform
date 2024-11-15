import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ReceiptTableRow from "./ReceiptTableRow";
import SearchInput from "../Common/SearchInput";
import Pagination from "../Common/Pagination";
import { Upload, Plus, Filter, ArrowUp, ArrowDown } from "lucide-react";
import { Receipt } from "@/app/types/types";
import { useReceiptsData } from "./ReceiptAPI";
import AddReceiptEntryModal from "./AddReceiptEntryModal";
import UploadLogic, { UploadLogicHandle } from "../Common/UploadLogic";
import useSortLogic from "../Common/SortingLogic";
import { tableVariants } from "../Common/Animations";

// Constants
const ROW_HEIGHT = 60;
const BOTTOM_PADDING = 40;
const MIN_ROWS = 6;

const ReceiptTable: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const { receipts, setReceipts, loading } = useReceiptsData("ajwitt2@asu.edu");
  const [filteredReceipts, setFilteredReceipts] = useState<Receipt[]>([]);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(MIN_ROWS);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use the custom useSortLogic hook
  const { sortField, sortOrder, setSortFieldAndOrder, sortData } =
    useSortLogic<Receipt>();

  // Ref for UploadLogic
  const uploadLogicRef = useRef<UploadLogicHandle>(null);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setFilteredReceipts(receipts);
  }, [receipts]);

  const calculateItemsPerPage = () => {
    const viewportHeight = window.innerHeight;
    const availableHeight = viewportHeight - 420 - BOTTOM_PADDING;
    const calculatedRows = Math.floor(availableHeight / ROW_HEIGHT);
    return Math.max(calculatedRows, MIN_ROWS);
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

    let filtered = receipts;

    if (term !== "") {
      filtered = receipts.filter(
        (receipt) =>
          receipt.location.toLowerCase().includes(term) ||
          receipt.date.includes(term) ||
          receipt.cost.toLowerCase().includes(term)
      );
    }

    // Update filtered receipts without sorting here
    setFilteredReceipts(filtered);
    setCurrentPage(1);
    setIsAnimating(true);
  };

  // Toggle the row expansion state
  const toggleRow = (id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  // Check if a row is expanded
  const isRowExpanded = (id: number) => expandedRows.includes(id);

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
              details: receipt.details.filter((_, idx) => idx !== itemIndex),
            }
          : receipt
      )
    );
  };

  // Handle action item clicks
  const handleActionItemClick = (actionType: string, item: string) => {
    if (actionType === "addEntry" && item === "Add Receipt Entry") {
      openModal();
    } else if (actionType === "upload") {
      switch (item) {
        case "Upload Image":
          uploadLogicRef.current?.triggerImageUpload();
          break;
        case "Upload Document":
          uploadLogicRef.current?.triggerDocumentUpload();
          break;
        case "Upload Spreadsheet":
          uploadLogicRef.current?.triggerSpreadsheetUpload();
          break;
        default:
          console.log(`Unknown upload item: ${item}`);
      }
    } else if (actionType === "filter") {
      let field: "date" | "cost" | "location" | null = null;
      switch (item) {
        case "Filter by Date":
          field = "date";
          break;
        case "Filter by Cost":
          field = "cost";
          break;
        case "Filter by Location":
          field = "location";
          break;
        default:
          console.log(`Unknown filter item: ${item}`);
      }

      if (field) {
        setSortFieldAndOrder(field);
      }
    } else {
      console.log(`Action: ${actionType}, Item: ${item}`);
    }
  };

  // Handle file uploads from UploadLogic
  const handleFileUpload = (fileType: string, file: File) => {
    console.log(`Uploaded ${fileType}:`, file);
  };

  // Calculate pagination indices
  const indexOfLastReceipt = currentPage * itemsPerPage;
  const indexOfFirstReceipt = indexOfLastReceipt - itemsPerPage;
  const currentReceipts = filteredReceipts.slice(
    indexOfFirstReceipt,
    indexOfLastReceipt
  );
  const totalPages = Math.ceil(filteredReceipts.length / itemsPerPage);

  // useEffect to handle sorting whenever sortField or sortOrder changes
  useEffect(() => {
    if (sortField) {
      const sorted = sortData(filteredReceipts);
      setFilteredReceipts(sorted);
      setCurrentPage(1);
      setIsAnimating(true);
    }
  }, [sortField, sortOrder]);

  return (
    <motion.div
      className={`pb-[${BOTTOM_PADDING}px] bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border-gray-700 flex flex-col h-full ${
        isAnimating ? "overflow-hidden" : "overflow-y-auto"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-black mb-2">Receipt List</h2>
        <div className="w-full">
          <SearchInput
            searchInput={searchInput}
            handleSearch={handleSearch}
            actions={[
              {
                icon: <Upload size={20} />,
                type: "upload",
                title: "Upload",
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
                items: ["Add Receipt Entry"],
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
            onActionItemClick={handleActionItemClick}
          />

          {/* UploadLogic handles all file uploads */}
          <UploadLogic ref={uploadLogicRef} onFileUpload={handleFileUpload} />

          {/* Use isModalOpen to conditionally render the modal */}
          <AddReceiptEntryModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
      </div>

      {filteredReceipts.length === 0 ? (
        <p className="text-center text-gray-600 mt-8">
          You have not uploaded or added any receipt data.
        </p>
      ) : (
        <>
          <table className="min-w-full divide-y divide-white">
            <thead>
              <tr>
                <th className="pl-7 text-left w-1/5 py-2 text-xs font-medium text-black uppercase tracking-wider cursor-pointer">
                  Receipt ID{" "}
                </th>
                <th
                  className="text-left w-1/5 text-xs font-medium text-black uppercase tracking-wider cursor-pointer"
                  onClick={() =>
                    handleActionItemClick("filter", "Filter by Location")
                  }
                >
                  Location{" "}
                  {sortField === "location" ? (
                    sortOrder === "asc" ? (
                      <ArrowUp size={16} className="inline-block ml-1" />
                    ) : (
                      <ArrowDown size={16} className="inline-block ml-1" />
                    )
                  ) : null}
                </th>
                <th
                  className="text-left w-1/5 text-xs font-medium text-black uppercase tracking-wider cursor-pointer"
                  onClick={() =>
                    handleActionItemClick("filter", "Filter by Date")
                  }
                >
                  Date{" "}
                  {sortField === "date" ? (
                    sortOrder === "asc" ? (
                      <ArrowUp size={16} className="inline-block ml-1" />
                    ) : (
                      <ArrowDown size={16} className="inline-block ml-1" />
                    )
                  ) : null}
                </th>
                <th className="text-left w-1/5 text-xs font-medium text-black uppercase tracking-wider">
                  Time
                </th>
                <th
                  className="text-left w-1/5 text-xs font-medium text-black uppercase tracking-wider cursor-pointer"
                  onClick={() =>
                    handleActionItemClick("filter", "Filter by Cost")
                  }
                >
                  Cost{" "}
                  {sortField === "cost" ? (
                    sortOrder === "asc" ? (
                      <ArrowUp size={16} className="inline-block ml-1" />
                    ) : (
                      <ArrowDown size={16} className="inline-block ml-1" />
                    )
                  ) : null}
                </th>
                <th className="w-[100px] text-left text-xs font-medium text-black uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <motion.tbody
              variants={tableVariants}
              initial="hidden"
              animate="visible"
              onAnimationComplete={() => setIsAnimating(false)}
              key={currentPage}
            >
              {currentReceipts.map((receipt, index) => (
                <ReceiptTableRow
                  key={receipt.localReceiptId}
                  receipt={receipt}
                  isRowExpanded={isRowExpanded}
                  toggleRow={toggleRow}
                  handleDeleteClick={handleDeleteClick}
                  index={index}
                  setIsAnimating={setIsAnimating}
                  onItemDelete={handleItemDelete}
                />
              ))}
            </motion.tbody>
          </table>

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

export default ReceiptTable;
