import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { motion } from "framer-motion";
import ReceiptTableRow from "./ReceiptTableRow";
import SearchInput from "../Common/SearchInput";
import Pagination from "../Common/Pagination";
import { Upload, Plus, Filter, ArrowUp, ArrowDown } from "lucide-react";
import { Receipt } from "@/app/types/types";
import AddReceiptEntryModal from "./AddReceiptEntryModal";
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
type FilterField = "date" | "cost" | "location";

interface ReceiptTableProps {
  receipts: Receipt[];
  setReceipts: React.Dispatch<React.SetStateAction<Receipt[]>>;
}

const ReceiptTable: React.FC<ReceiptTableProps> = ({
  receipts,
  setReceipts,
}) => {
  const [searchInput, setSearchInput] = useState("");
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
    async (localReceiptId: number) => {
      const receiptToDelete = receipts.find(
        (receipt) => receipt.localReceiptId === localReceiptId
      );

      if (!receiptToDelete) return;

      const email = "ajwitt2@asu.edu"; // Use the given email

      // API call to delete the receipt
      try {
        const response = await fetch(
          "https://y4frxnym9g.execute-api.ca-central-1.amazonaws.com/dev/data/deleteRow",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              table: "purchase",
              body: {
                Email: email,
                DateTime: receiptToDelete.completeDateTime,
                Location: receiptToDelete.location,
              },
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete receipt");
        }

        const data = await response.json();
        console.log("Receipt deleted successfully:", data);

        // Update state after successful deletion
        setReceipts((prev) =>
          prev.filter((receipt) => receipt.localReceiptId !== localReceiptId)
        );
      } catch (error) {
        console.error("Error deleting receipt:", error);
      }
    },
    [receipts, setReceipts]
  );

  // Handle item deletion for ingredients
  const handleItemDelete = useCallback(
    (receiptId: number, itemIndex: number) => {
      setReceipts((prev) =>
        prev.map((receipt) => {
          if (receipt.localReceiptId === receiptId) {
            const itemToDelete = receipt.details[itemIndex];
            //console.log("Found Receipt:", receipt.completeDateTime);
            //console.log("Item to be removed:", itemToDelete.ingredient);
            const email = "ajwitt2@asu.edu";
            try {
                const response = fetch(
                  "https://y4frxnym9g.execute-api.ca-central-1.amazonaws.com/dev/data/deleteRow",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      table: "includes", // Assuming you are deleting from the "inventory" table
                      body: {
                        Email: email,
                        DateTime: receipt.completeDateTime,
                        Location: receipt.location,
                        IngredientName: itemToDelete.ingredient,
                      },
                    }),
                  }
                );
          
                //if (!response.ok) {
               //   throw new Error("Failed to delete inventory item");
               // }
          
                //const data = await response.json();
                //console.log("Inventory item deleted successfully:", data);
          
                // Update state after successful deletion
              } catch (error) {
                console.error("Error deleting inventory item:", error);
              }
            return {
              ...receipt,
              details: receipt.details.filter((_, idx) => idx !== itemIndex),
            };
          }
          return receipt;
        })
      );
    },
    [setReceipts]
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
        item === "Add Receipt Entry"
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

  // Derive filtered receipts based on search input
  const filteredReceipts = useMemo(() => {
    if (!searchInput) return receipts;

    return receipts.filter(
      (receipt) =>
        receipt.location.toLowerCase().includes(searchInput) ||
        receipt.date.toLowerCase().includes(searchInput) ||
        receipt.cost.toLowerCase().includes(searchInput)
    );
  }, [receipts, searchInput]);

  // Derive sorted receipts based on sortField and sortOrder
  const sortedReceipts = useMemo(() => {
    if (!sortField) return filteredReceipts;
    return sortData(filteredReceipts);
  }, [filteredReceipts, sortField, sortData]);

  // Calculate pagination indices
  const indexOfLastReceipt = currentPage * itemsPerPage;
  const indexOfFirstReceipt = indexOfLastReceipt - itemsPerPage;
  const currentReceipts = useMemo(
    () => sortedReceipts.slice(indexOfFirstReceipt, indexOfLastReceipt),
    [sortedReceipts, indexOfFirstReceipt, indexOfLastReceipt]
  );
  const totalPages = Math.ceil(sortedReceipts.length / itemsPerPage);

  // Reset animations when sortedReceipts change
  useEffect(() => {
    if (sortField) {
      setCurrentPage(1);
      setIsAnimating(true);
    }
  }, [sortField, sortOrder, sortData]);

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
                items: ["Add Receipt Entry"],
              },
              {
                icon: <Filter size={20} />,
                type: ActionType.FILTER,
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

      {sortedReceipts.length === 0 ? (
        <p className="text-center text-gray-600 mt-8">
          You have not uploaded or added any receipt data.
        </p>
      ) : (
        <>
          <table className="min-w-full divide-y divide-white">
            <thead>
              <tr>
                <th className="pl-7 text-left w-1/5 py-2 text-xs font-medium text-black uppercase tracking-wider">
                  Receipt ID
                </th>
                <th className="text-left w-1/5 text-xs font-medium text-black uppercase tracking-wider">
                  <button
                    className="flex items-center w-full text-left cursor-pointer"
                    onClick={() =>
                      handleActionItemClick(
                        ActionType.FILTER,
                        "Filter by Location"
                      )
                    }
                  >
                    Location
                    {sortField === "location" &&
                      (sortOrder === "asc" ? (
                        <ArrowUp size={16} className="ml-1" />
                      ) : (
                        <ArrowDown size={16} className="ml-1" />
                      ))}
                  </button>
                </th>
                <th className="text-left w-1/5 text-xs font-medium text-black uppercase tracking-wider">
                  <button
                    className="flex items-center w-full text-left cursor-pointer"
                    onClick={() =>
                      handleActionItemClick(ActionType.FILTER, "Filter by Date")
                    }
                  >
                    Date
                    {sortField === "date" &&
                      (sortOrder === "asc" ? (
                        <ArrowUp size={16} className="ml-1" />
                      ) : (
                        <ArrowDown size={16} className="ml-1" />
                      ))}
                  </button>
                </th>
                <th className="text-left w-1/5 text-xs font-medium text-black uppercase tracking-wider">
                  Time
                </th>
                <th className="text-left w-1/5 text-xs font-medium text-black uppercase tracking-wider">
                  <button
                    className="flex items-center w-full text-left cursor-pointer"
                    onClick={() =>
                      handleActionItemClick(ActionType.FILTER, "Filter by Cost")
                    }
                  >
                    Cost
                    {sortField === "cost" &&
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
