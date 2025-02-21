import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, RefreshCcw, X } from "lucide-react";
import EditableCell from "../Common/EditableCell";
import { Sale } from "@/app/types/types";
import {
  backdropVariants,
  modalVariants,
  tableVariants,
} from "../Common/Animations";
import MenuItemRow from "./AddSaleMenuItemRow";
import { useSalesData } from "./SalesAPI";


interface AddManualEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddSaleEntryModal: React.FC<AddManualEntryModalProps> = ({
  isOpen,
  onClose,
}) => {
  // Initial state for a new sale
  const initialSale: Sale = {
    localSaleId: Date.now(),
    completeStartDate: "",
    completeEndDate: "",
    startDate: "",
    endDate: "",
    revenue: "",
    details: [],
  };

  // State to hold all sales (can be used for multiple sales)
  const [sales, setSales] = useState<Sale[]>([]);

  // Use useSalesData hook to get the addSaleAPI function
  const { addSaleAPI } = useSalesData("ajwitt2@asu.edu");
  
  // State for the current new sale being added
  const [newSale, setNewSale] = useState<Sale>(initialSale);

  // Handle changes in the sale input fields
  const handleSaleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSale((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle changes in the sale details (menuItems) fields
  const handleMenuItemChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setNewSale((prevSale) => {
      const updatedDetails = [...prevSale.details];
      updatedDetails[index] = {
        ...updatedDetails[index],
        [name]: name === "quantity" ? parseFloat(value) || 0 : value,
      };
      return {
        ...prevSale,
        details: updatedDetails,
      };
    });
  };

  // Add a new empty sale detail (menuItem) row
  const handleAddMenuItem = () => {
    setNewSale((prevSale) => ({
      ...prevSale,
      details: [
        ...prevSale.details,
        { menuitemname: "", count: 0, itemrevenue: 0 },
      ],
    }));
  };

  // Delete a sale detail (menuItem) at a specific index
  const handleDeleteMenuItem = (index: number) => {
    setNewSale((prevSale) => {
      const updatedDetails = prevSale.details.filter((_, idx) => idx !== index);
      return {
        ...prevSale,
        details: updatedDetails,
      };
    });
  };

  // Save the current sale to the sales list
  const handleSaveSale = () => {
    if (newSale.details.length === 0) {
      alert("Please add at least one menu item before saving.");
      return;
    }

    addSaleAPI(newSale);
    setNewSale(initialSale);
    onClose();
  };
  
  // Reset the sale fields to their initial state
  const handleResetSale = () => {
    setNewSale(initialSale);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-50"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg p-8 w-[90%] max-w-4xl overflow-y-auto max-h-[90%]"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            layout // Enables layout animations for smooth transitions
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-black">
                Add Sale Entry
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={28} />
              </button>
            </div>

            {/* Sale Details Table */}
            <motion.table
              className="w-full mt-4 mb-6"
              variants={tableVariants}
              initial="hidden"
              animate="visible"
              layout // Enables layout animations
            >
              <thead>
                <tr>
                  <th className="w-1/3 text-left text-sm font-medium text-black">
                    Start Date
                  </th>
                  <th className="w-1/3 text-left text-sm font-medium text-black">
                    End Date
                  </th>
                  <th className="w-1/3 text-left text-sm font-medium text-black">
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody>
                <motion.tr
                  className="bg-white"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout // Enables layout animations
                >
                  <EditableCell
                    isEditing={true}
                    value={newSale.startDate}
                    name="startDate"
                    onChange={handleSaleInputChange}
                    type="date"
                    placeholder="Start Date"
                  />
                  <EditableCell
                    isEditing={true}
                    value={newSale.endDate}
                    name="endDate"
                    onChange={handleSaleInputChange}
                    type="date"
                    placeholder="End Date"
                  />
                  <EditableCell
                    isEditing={true}
                    value={newSale.revenue}
                    name="revenue" 
                    onChange={handleSaleInputChange}
                    type="text"
                    placeholder="$Revenue"
                  />
                  <td className="pl-2 pt-2 text-sm text-black">
                    <button
                      onClick={handleResetSale}
                      className="text-blue-600 hover:text-blue-800"
                      title="Reset Fields"
                    >
                      <RefreshCcw size={20} />
                    </button>
                  </td>
                </motion.tr>
              </tbody>
            </motion.table>

            {/* MenuItems (Details) Table */}
            <AnimatePresence>
              {newSale.details.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6"
                >
                  <motion.table
                    className="w-full mt-4"
                    variants={tableVariants}
                    initial="hidden"
                    animate="visible"
                    layout // Enables layout animations
                  >
                    <thead>
                      <tr>
                        <th className="text-left text-sm font-medium text-black">
                          Menu Item
                        </th>
                        <th className="text-left text-sm font-medium text-black">
                          Quantity
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Render each sale detail row */}
                      <AnimatePresence>
                        {newSale.details.map((detail, idx) => (
                          <MenuItemRow
                            key={`${newSale.localSaleId}-menuItem-${idx}`}
                            index={idx}
                            menuItem={detail}
                            handleMenuItemChange={handleMenuItemChange}
                            handleDeleteMenuItem={handleDeleteMenuItem}
                          />
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </motion.table>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between mt-6">
              {/* Save Sale Button on the Left */}
              <button
                onClick={handleSaveSale}
                className="px-4 py-2 text-white font-medium rounded bg-[#8B5CF6] hover:bg-[#b07ff0]"
              >
                Add Sale
              </button>

              {/* Add MenuItem Button on the Right */}
              <button
                onClick={handleAddMenuItem}
                className="flex items-center text-sm text-blue-500 font-medium hover:text-blue-700"
              >
                <Plus size={20} className="mr-1" /> Add MenuItem
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddSaleEntryModal;
