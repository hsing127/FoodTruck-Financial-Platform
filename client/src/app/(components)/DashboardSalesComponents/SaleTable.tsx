import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SaleTableRow from "./SaleTableRow";
import SearchInput from "../Common/SearchInput";
import Pagination from "../Common/Pagination";
import { Upload, Plus, Filter, ArrowUp, ArrowDown } from "lucide-react";
import { Sale } from "@/app/types/types";
import { useSalesData } from "./SalesAPI";
import AddSaleEntryModal from "./AddSaleEntryModal";
import UploadLogic, { UploadLogicHandle } from "../Common/UploadLogic";
import useSortLogic from "../Common/SortingLogic";
import { tableVariants } from "../Common/Animations";

// Constants
const ROW_HEIGHT = 60;
const BOTTOM_PADDING = 40;
const MIN_ROWS = 6;

const SaleTable: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const { sales, setSales, loading } = useSalesData("ajwitt2@asu.edu");
  const [filteredSales, setFilteredSales] = useState<Sale[]>([]);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(MIN_ROWS);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use the custom useSortLogic hook
  const { sortField, sortOrder, setSortFieldAndOrder, sortData } =
    useSortLogic<Sale>();

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
    setFilteredSales(sales);
  }, [sales]);

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

    let filtered = sales;

    if (term !== "") {
      filtered = sales.filter(
        (sale) =>
            sale.startDate.includes(term) ||
            sale.endDate.includes(term) ||
            sale.revenue.toLowerCase().includes(term)
      );
    }

    // Update filtered sales without sorting here
    setFilteredSales(filtered);
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

  const handleDeleteClick = (localSaleId: number) => {
    setFilteredSales((prev) =>
      prev.filter((sale) => sale.localSaleId !== localSaleId)
    );
    // Also update the full sales list to keep it in sync
    setSales((prev) =>
      prev.filter((sale) => sale.localSaleId !== localSaleId)
    );
  };

  // Handle item deletion for menuItems
  const handleItemDelete = (saleId: number, itemIndex: number) => {
    setFilteredSales((prev) =>
      prev.map((sale) =>
        sale.localSaleId === saleId
          ? {
              ...sale,
              details: sale.details.filter((_, idx) => idx !== itemIndex),
            }
          : sale
      )
    );
  };

  // Handle action item clicks
  const handleActionItemClick = (actionType: string, item: string) => {
    if (actionType === "addEntry" && item === "Add Sale Entry") {
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
  const indexOfLastSale = currentPage * itemsPerPage;
  const indexOfFirstSale = indexOfLastSale - itemsPerPage;
  const currentSales = filteredSales.slice(
    indexOfFirstSale,
    indexOfLastSale
  );
  const totalPages = Math.ceil(filteredSales.length / itemsPerPage);

  // useEffect to handle sorting whenever sortField or sortOrder changes
  useEffect(() => {
    if (sortField) {
      const sorted = sortData(filteredSales);
      setFilteredSales(sorted);
      setCurrentPage(1);
      setIsAnimating(true);
    }
  }, [sortField, sortOrder, filteredSales, sortData]);  

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
        <h2 className="text-xl font-semibold text-black mb-2">Sale List</h2>
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
                items: ["Add Sale Entry"],
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
          <AddSaleEntryModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
      </div>

      {filteredSales.length === 0 ? (
        <p className="text-center text-gray-600 mt-8">
          You have not uploaded or added any sale data.
        </p>
      ) : (
        <>
          <table className="min-w-full divide-y divide-white">
            <thead>
              <tr>
                <th className="pl-7 text-left w-1/6 py-2 text-xs font-medium text-black uppercase tracking-wider cursor-pointer">
                  Sale ID{" "}
                </th>
                <th
                  className="text-left w-1/6 text-xs font-medium text-black uppercase tracking-wider cursor-pointer"
                  onClick={() =>
                    handleActionItemClick("filter", "Filter by Date")
                  }
                >
                  Start Date{" "}
                  {sortField === "date" ? (
                    sortOrder === "asc" ? (
                      <ArrowUp size={16} className="inline-block ml-1" />
                    ) : (
                      <ArrowDown size={16} className="inline-block ml-1" />
                    )
                  ) : null}
                </th>
                <th className="text-left w-1/6 text-xs font-medium text-black uppercase tracking-wider">
                  Start Time
                </th>
                <th
                  className="text-left w-1/6 text-xs font-medium text-black uppercase tracking-wider cursor-pointer"
                  onClick={() =>
                    handleActionItemClick("filter", "Filter by Date")
                  }
                >
                  End Date{" "}
                  {sortField === "date" ? (
                    sortOrder === "asc" ? (
                      <ArrowUp size={16} className="inline-block ml-1" />
                    ) : (
                      <ArrowDown size={16} className="inline-block ml-1" />
                    )
                  ) : null}
                </th>
                <th className="text-left w-1/6 text-xs font-medium text-black uppercase tracking-wider">
                  End Time
                </th>
                <th
                  className="text-left w-1/6 text-xs font-medium text-black uppercase tracking-wider cursor-pointer"
                  onClick={() =>
                    handleActionItemClick("filter", "Filter by Cost")
                  }
                >
                  Revenue{" "}
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
              {currentSales.map((sale, index) => (
                <SaleTableRow
                  key={sale.localSaleId}
                  sale={sale}
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

export default SaleTable;
