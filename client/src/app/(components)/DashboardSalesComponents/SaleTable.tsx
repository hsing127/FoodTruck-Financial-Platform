import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { motion } from "framer-motion";
import SaleTableRow from "./SaleTableRow";
import SearchInput from "../Common/SearchInput";
import Pagination from "../Common/Pagination";
import { Upload, Plus, Filter, ArrowUp, ArrowDown } from "lucide-react";
import { Sale } from "@/app/types/types";
import AddSaleEntryModal from "./AddSaleEntryModal";
import UploadLogic, { UploadLogicHandle } from "../Common/UploadLogic";
import useSortLogic from "../Common/SortingLogic";
import { tableVariants } from "../Common/Animations";

// Constants
const ROW_HEIGHT = 60;
const BOTTOM_PADDING = 40;
const MIN_ROWS = 6;

// Action Types
enum ActionType {
  UPLOAD = "upload",
  ADD_ENTRY = "addEntry",
  FILTER = "filter",
}

// Filter Fields
type FilterField = "startDate" | "endDate" | "revenue";

interface SaleTableProps {
  sales: Sale[];
  setSales: React.Dispatch<React.SetStateAction<Sale[]>>;
}

const SaleTable: React.FC<SaleTableProps> = ({ sales, setSales }) => {
  const [searchInput, setSearchInput] = useState("");
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
  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  // Function to close the modal
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const calculateItemsPerPage = useCallback(() => {
    const viewportHeight = window.innerHeight;
    const availableHeight = viewportHeight - 420 - BOTTOM_PADDING;
    const calculatedRows = Math.floor(availableHeight / ROW_HEIGHT);
    return Math.max(calculatedRows, MIN_ROWS);
  }, []);

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
  }, [calculateItemsPerPage]);

  // Handle search input changes
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value.toLowerCase());
    setCurrentPage(1);
  }, []);

  // Toggle the row expansion state
  const toggleRow = useCallback((id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  }, []);

  // Check if a row is expanded
  const isRowExpanded = useCallback(
    (id: number) => expandedRows.includes(id),
    [expandedRows]
  );

  const handleDeleteClick = useCallback(
    (localSaleId: number) => {
      setSales((prev) =>
        prev.filter((sale) => sale.localSaleId !== localSaleId)
      );
    },
    [setSales]
  );

  // Handle item deletion for sale items
  const handleItemDelete = useCallback(
    (saleId: number, itemIndex: number) => {
      setSales((prev) =>
        prev.map((sale) =>
          sale.localSaleId === saleId
            ? {
              ...sale,
              details: sale.details.filter((_, idx) => idx !== itemIndex),
            }
            : sale
        )
      );
    },
    [setSales]
  );

  // Handle action item clicks
  const handleActionItemClick = useCallback(
    (actionType: string, item: string) => {
      let enumActionType: ActionType | null = null;

      switch (actionType) {
        case "upload":
          enumActionType = ActionType.UPLOAD;
          break;
        case "addEntry":
          enumActionType = ActionType.ADD_ENTRY;
          break;
        case "filter":
          enumActionType = ActionType.FILTER;
          break;
        default:
          console.warn(`Unknown action type: ${actionType}`);
      }

      if (!enumActionType) return;

      if (
        enumActionType === ActionType.ADD_ENTRY &&
        item === "Add Sale Entry"
      ) {
        openModal();
      } else if (enumActionType === ActionType.UPLOAD) {
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
            console.warn(`Unknown upload item: ${item}`);
        }
      } else if (enumActionType === ActionType.FILTER) {
        let field: FilterField | null = null;
        switch (item) {
          case "Filter by StartDate":
            field = "startDate";
            break;
          case "Filter by EndDate":
            field = "endDate";
            break;
          case "Filter by Revenue":
            field = "revenue";
            break;
          default:
            console.warn(`Unknown filter item: ${item}`);
        }

        if (field) {
          setSortFieldAndOrder(field);
        }
      } else {
        console.warn(`Unhandled action: ${enumActionType}, Item: ${item}`);
      }
    },
    [openModal, setSortFieldAndOrder]
  );

  // Handle file uploads from UploadLogic
  const handleFileUpload = useCallback((fileType: string, file: File) => {
    console.log(`Uploaded ${fileType}:`, file);
    // Implement actual upload logic here
  }, []);

  // Derive filtered sales based on search input
  const filteredSales = useMemo(() => {
    if (!searchInput) return sales;

    return sales.filter(
      (sale) =>
        sale.startDate.toLowerCase().includes(searchInput) ||
        sale.endDate.toLowerCase().includes(searchInput) ||
        sale.revenue.toLowerCase().includes(searchInput)
    );
  }, [sales, searchInput]);

  // Derive sorted sales based on sortField and sortOrder
  const sortedSales = useMemo(() => {
    if (!sortField) return filteredSales;
    return sortData(filteredSales);
  }, [filteredSales, sortField, sortData]);

  // Calculate pagination indices
  const indexOfLastSale = currentPage * itemsPerPage;
  const indexOfFirstSale = indexOfLastSale - itemsPerPage;
  const currentSales = useMemo(
    () => sortedSales.slice(indexOfFirstSale, indexOfLastSale),
    [sortedSales, indexOfFirstSale, indexOfLastSale]
  );
  const totalPages = Math.ceil(sortedSales.length / itemsPerPage);

  // Reset animations when sortedSales change
  useEffect(() => {
    if (sortField) {
      setCurrentPage(1);
      setIsAnimating(true);
    }
  }, [sortField, sortOrder, sortData]);

  return (
    <motion.div
      className={`pb-[${BOTTOM_PADDING}px] bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border-gray-700 flex flex-col h-full ${isAnimating ? "overflow-hidden" : "overflow-y-auto"
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
                type: ActionType.UPLOAD,
                title: "Upload",
                items: [
                  "Upload Image",
                  "Upload Document",
                  "Upload Spreadsheet",
                ],
              },
              {
                icon: <Plus size={20} />,
                type: ActionType.ADD_ENTRY,
                title: "Add Entry",
                items: ["Add Sale Entry"],
              },
              {
                icon: <Filter size={20} />,
                type: ActionType.FILTER,
                title: "Filter",
                items: [
                  "Filter by StartDate",
                  "Filter by EndDate",
                  "Filter by Revenue",
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

      {sortedSales.length === 0 ? (
        <p className="text-center text-gray-600 mt-8">
          You have not uploaded or added any sale data.
        </p>
      ) : (
        <>
          <table className="min-w-full divide-y divide-white">
            <thead>
              <tr>
                <th className="pl-7 text-left w-1/4 py-2 text-xs font-medium text-black uppercase tracking-wider">
                  Sale ID
                </th>
                <th className="text-left w-1/4 text-xs font-medium text-black uppercase tracking-wider">
                  <button
                    className="flex items-center w-full text-left cursor-pointer"
                    onClick={() =>
                      handleActionItemClick(
                        ActionType.FILTER,
                        "Filter by StartDate"
                      )
                    }
                  >
                    Start Date
                    {sortField === "startDate" &&
                      (sortOrder === "asc" ? (
                        <ArrowUp size={16} className="ml-1" />
                      ) : (
                        <ArrowDown size={16} className="ml-1" />
                      ))}
                  </button>
                </th>
                <th className="text-left w-1/4 text-xs font-medium text-black uppercase tracking-wider">
                  <button
                    className="flex items-center w-full text-left cursor-pointer"
                    onClick={() =>
                      handleActionItemClick(
                        ActionType.FILTER,
                        "Filter by EndDate"
                      )
                    }
                  >
                    End Date
                    {sortField === "endDate" &&
                      (sortOrder === "asc" ? (
                        <ArrowUp size={16} className="ml-1" />
                      ) : (
                        <ArrowDown size={16} className="ml-1" />
                      ))}
                  </button>
                </th>
                <th className="text-left w-1/4 text-xs font-medium text-black uppercase tracking-wider">
                  <button
                    className="flex items-center w-full text-left cursor-pointer"
                    onClick={() =>
                      handleActionItemClick(
                        ActionType.FILTER,
                        "Filter by Revenue"
                      )
                    }
                  >
                    Revenue
                    {sortField === "revenue" &&
                      (sortOrder === "asc" ? (
                        <ArrowUp size={16} className="ml-1" />
                      ) : (
                        <ArrowDown size={16} className="ml-1" />
                      ))}
                  </button>
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
