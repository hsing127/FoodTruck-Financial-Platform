import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { motion } from "framer-motion";
import InventoryTableRow from "./InventoryTableRow";
import SearchInput from "../Common/SearchInput";
import Pagination from "../Common/Pagination";
import { Upload, Plus, Filter, ArrowUp, ArrowDown } from "lucide-react";
import { InventoryItem } from "@/app/types/types";
import AddInventoryItemModal from "./AddInventoryItemModal";
import UploadLogic, { UploadLogicHandle } from "../Common/UploadLogic";
import useSortLogic from "../Common/SortingLogic";

// Constants
const ROW_HEIGHT = 56;
const BOTTOM_PADDING = 40;
const MIN_ROWS = 6;

// Action Types
enum ActionType {
  UPLOAD = "upload",
  ADD_ENTRY = "addEntry",
  FILTER = "filter",
}

// Filter Fields
type FilterField = "Name" | "Amount" | "AmountUnits";

interface InventoryTableProps {
  inventory: InventoryItem[];
  setInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
}

const InventoryTable: React.FC<InventoryTableProps> = ({
  inventory,
  setInventory,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(MIN_ROWS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Use the custom useSortLogic hook with InventoryItem
  const { sortField, sortOrder, setSortFieldAndOrder, sortData } =
    useSortLogic<InventoryItem>();

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

  // Handle adding a new inventory item
  const handleAddInventoryItem = useCallback(
    (item: InventoryItem) => {
      setInventory((prev) => [...prev, item]);
      setCurrentPage(1);
      closeModal();
    },
    [setInventory, closeModal]
  );

  // Handle editing an inventory item
  const handleItemEdit = useCallback(
    (id: number, updatedItem: InventoryItem) => {
      setInventory((prev) =>
        prev.map((item) => (item.id === id ? updatedItem : item))
      );
    },
    [setInventory]
  );

  // Handle deleting an inventory item
  const handleDeleteClick = useCallback(
    (id: number) => {
      setInventory((prev) => prev.filter((item) => item.id !== id));
    },
    [setInventory]
  );

  // Handle action item clicks from SearchInput
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
        item === "Add Inventory Item"
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
          case "Filter by Name":
            field = "Name"; // Correct mapping
            break;
          case "Filter by Amount":
            field = "Amount";
            break;
          case "Filter by Units":
            field = "AmountUnits";
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

  // Derive filtered inventory based on search input
  const filteredInventory = useMemo(() => {
    if (!searchInput) return inventory;

    return inventory.filter(
      (item) =>
        item.Name.toLowerCase().includes(searchInput) ||
        item.Amount.toLowerCase().includes(searchInput) ||
        item.AmountUnits.toLowerCase().includes(searchInput)
    );
  }, [inventory, searchInput]);

  // Derive sorted inventory based on sortField and sortOrder
  const sortedInventory = useMemo(() => {
    if (!sortField) return filteredInventory;
    return sortData(filteredInventory);
  }, [filteredInventory, sortField, sortData]);

  // Calculate pagination indices
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInventory = useMemo(
    () => sortedInventory.slice(indexOfFirstItem, indexOfLastItem),
    [sortedInventory, indexOfFirstItem, indexOfLastItem]
  );
  const totalPages = Math.ceil(sortedInventory.length / itemsPerPage);

  // Reset animations when sortedInventory changes
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
        <h2 className="text-xl font-semibold text-black mb-2">Inventory</h2>

        {/* Search Input */}
        <div className="w-full">
          <SearchInput
            searchInput={searchInput}
            handleSearch={handleSearch}
            actions={[
              {
                icon: <Upload size={20} />,
                type: ActionType.UPLOAD,
                title: "Upload File",
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
                items: ["Add Inventory Item"],
              },
              {
                icon: <Filter size={20} />,
                type: ActionType.FILTER,
                title: "Filter",
                items: [
                  "Filter by Name",
                  "Filter by Amount",
                  "Filter by Units",
                ],
              },
            ]}
            onActionItemClick={handleActionItemClick}
          />

          {/* UploadLogic handles all file uploads */}
          <UploadLogic ref={uploadLogicRef} onFileUpload={handleFileUpload} />

          {/* Modal for Adding Inventory Item */}
          <AddInventoryItemModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onSave={handleAddInventoryItem}
          />
        </div>
      </div>

      {/* Conditionally Render No Items Message or Inventory Table */}
      {sortedInventory.length === 0 ? (
        <p className="text-center text-gray-600 mt-8">
          No inventory items found. Add or upload items to get started.
        </p>
      ) : (
        <>
          {/* Table to display inventory data */}
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="text-left w-1/3 py-2 text-xs font-medium text-black uppercase tracking-wider">
                  <button
                    className="flex items-center w-full text-left cursor-pointer"
                    onClick={() =>
                      handleActionItemClick(ActionType.FILTER, "Filter by Name")
                    }
                  >
                    Name
                    {sortField === "Name" &&
                      (sortOrder === "asc" ? (
                        <ArrowUp size={16} className="ml-1" />
                      ) : (
                        <ArrowDown size={16} className="ml-1" />
                      ))}
                  </button>
                </th>
                <th className="text-left w-1/3 text-xs font-medium text-black uppercase tracking-wider">
                  <button
                    className="flex items-center w-full text-left cursor-pointer"
                    onClick={() =>
                      handleActionItemClick(
                        ActionType.FILTER,
                        "Filter by Amount"
                      )
                    }
                  >
                    Amount
                    {sortField === "Amount" &&
                      (sortOrder === "asc" ? (
                        <ArrowUp size={16} className="ml-1" />
                      ) : (
                        <ArrowDown size={16} className="ml-1" />
                      ))}
                  </button>
                </th>
                <th className="text-left w-1/3 text-xs font-medium text-black uppercase tracking-wider">
                  <button
                    className="flex items-center w-full text-left cursor-pointer"
                    onClick={() =>
                      handleActionItemClick(
                        ActionType.FILTER,
                        "Filter by Units"
                      )
                    }
                  >
                    Units
                    {sortField === "AmountUnits" &&
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
              initial="hidden"
              animate="visible"
              onAnimationComplete={() => setIsAnimating(false)}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.07 },
                },
              }}
              key={currentPage}
            >
              {currentInventory.map((item, idx) => (
                <InventoryTableRow
                  key={item.id}
                  item={item}
                  index={indexOfFirstItem + idx}
                  onItemEdit={handleItemEdit}
                  onItemDelete={handleDeleteClick}
                  setIsAnimating={setIsAnimating}
                />
              ))}
            </motion.tbody>
          </table>

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
