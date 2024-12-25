import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, RefreshCcw, X } from "lucide-react";
import EditableCell from "../Common/EditableCell";
import { Receipt } from "@/app/types/types";
import {
  backdropVariants,
  modalVariants,
  tableVariants,
} from "../Common/Animations";
import IngredientRow from "./AddReceiptIngredientRow";
import { useReceiptsData } from "./ReceiptAPI";

interface AddManualEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddReceiptEntryModal: React.FC<AddManualEntryModalProps> = ({
  isOpen,
  onClose,
}) => {
  // Initial state for a new receipt
  const initialReceipt: Receipt = {
    localReceiptId: Date.now(),
    completeDateTime: "",
    location: "",
    date: "",
    time: "",
    cost: "",
    details: [],
  };

  // State to hold all receipts (can be used for multiple receipts)
  const [receipts, setReceipts] = useState<Receipt[]>([]);

  //Email var for page
  const email = "ajwitt2@asu.edu";

  // State for the current new receipt being added
  const [newReceipt, setNewReceipt] = useState<Receipt>(initialReceipt);

  // API functions
  const {
    areceipts,
    asetReceipts,
    loading,
    editReceiptAPI,
    addReceiptAPI,
    addReceiptIngredientAPI,
  } = useReceiptsData(email);

  // Handle changes in the receipt input fields
  const handleReceiptInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewReceipt((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle changes in the receipt details (ingredients) fields
  const handleIngredientChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setNewReceipt((prevReceipt) => {
      const updatedDetails = [...prevReceipt.details];
      updatedDetails[index] = {
        ...updatedDetails[index],
        [name]: name === "quantity" ? parseFloat(value) || 0 : value,
      };
      return {
        ...prevReceipt,
        details: updatedDetails,
      };
    });
  };

  // Add a new empty receipt detail (ingredient) row
  const handleAddIngredient = () => {
    setNewReceipt((prevReceipt) => ({
      ...prevReceipt,
      details: [
        ...prevReceipt.details,
        { ingredient: "", quantity: 0, units: "", price: "" },
      ],
    }));
  };

  // Delete a receipt detail (ingredient) at a specific index
  const handleDeleteIngredient = (index: number) => {
    setNewReceipt((prevReceipt) => {
      const updatedDetails = prevReceipt.details.filter(
        (_, idx) => idx !== index
      );
      return {
        ...prevReceipt,
        details: updatedDetails,
      };
    });
  };

  // Save the current receipt to the receipts list
  const handleSaveReceipt = async () => {
    try {
      await addReceiptAPI(email, newReceipt);

      // Add each ingredient (detail) to the includes table
      const ingredientPromises = newReceipt.details.map((ingredient) =>
        addReceiptIngredientAPI(email, newReceipt, ingredient)
      );

      await Promise.all(ingredientPromises);

      // Update the local receipts state
      setReceipts((prevReceipts) => [...prevReceipts, newReceipt]);

      // Reset the new receipt form
      setNewReceipt(initialReceipt);

      // Close the modal
      onClose();
    } catch (error) {
      alert("There was an error saving the receipt item");
    }
    setReceipts((prevReceipts) => [...prevReceipts, newReceipt]);
    setNewReceipt(initialReceipt);
    onClose();
  };

  // Reset the receipt fields to their initial state
  const handleResetReceipt = () => {
    setNewReceipt(initialReceipt);
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
                Add Receipt Entry
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={28} />
              </button>
            </div>

            {/* Receipt Details Table */}
            <motion.table
              className="w-full mt-4 mb-6"
              variants={tableVariants}
              initial="hidden"
              animate="visible"
              layout // Enables layout animations
            >
              <thead>
                <tr>
                  <th className="w-1/4 text-left text-sm font-medium text-black">
                    Location
                  </th>
                  <th className="w-1/4 text-left text-sm font-medium text-black">
                    Date
                  </th>
                  <th className="w-1/4 text-left text-sm font-medium text-black">
                    Time
                  </th>
                  <th className="w-1/4 text-left text-sm font-medium text-black">
                    Cost
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
                    value={newReceipt.location}
                    name="location"
                    onChange={handleReceiptInputChange}
                    placeholder="Location"
                  />
                  <EditableCell
                    isEditing={true}
                    value={newReceipt.date}
                    name="date"
                    onChange={handleReceiptInputChange}
                    type="date"
                    placeholder="Date"
                  />
                  <EditableCell
                    isEditing={true}
                    value={newReceipt.time}
                    name="time"
                    onChange={handleReceiptInputChange}
                    type="time"
                    placeholder="Time"
                  />
                  <EditableCell
                    isEditing={true}
                    value={newReceipt.cost}
                    name="cost"
                    onChange={handleReceiptInputChange}
                    type="text"
                    placeholder="$Cost"
                  />
                  <td className="pl-2 pt-2 text-sm text-black">
                    <button
                      onClick={handleResetReceipt}
                      className="text-blue-600 hover:text-blue-800"
                      title="Reset Fields"
                    >
                      <RefreshCcw size={20} />
                    </button>
                  </td>
                </motion.tr>
              </tbody>
            </motion.table>

            {/* Ingredients (Details) Table */}
            <AnimatePresence>
              {newReceipt.details.length > 0 && (
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
                          Ingredient
                        </th>
                        <th className="text-left text-sm font-medium text-black">
                          Quantity
                        </th>
                        <th className="text-left text-sm font-medium text-black">
                          Units
                        </th>
                        <th className="text-left text-sm font-medium text-black">
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Render each receipt detail row */}
                      <AnimatePresence>
                        {newReceipt.details.map((detail, idx) => (
                          <IngredientRow
                            key={`${newReceipt.localReceiptId}-ingredient-${idx}`}
                            index={idx}
                            ingredient={detail}
                            handleIngredientChange={handleIngredientChange}
                            handleDeleteIngredient={handleDeleteIngredient}
                          />
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </motion.table>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between mt-6">
              {/* Save Receipt Button on the Left */}
              <button
                onClick={handleSaveReceipt}
                className="px-4 py-2 text-white font-medium rounded bg-[#8B5CF6] hover:bg-[#b07ff0]"
              >
                Add Receipt
              </button>

              {/* Add Ingredient Button on the Right */}
              <button
                onClick={handleAddIngredient}
                className="flex items-center text-sm text-blue-500 font-medium hover:text-blue-700"
              >
                <Plus size={20} className="mr-1" /> Add Ingredient
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddReceiptEntryModal;
