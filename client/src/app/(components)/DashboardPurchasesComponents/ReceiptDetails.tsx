import React, { useState } from "react";
import ReceiptDetailsRow from "./ReceiptDetailsRow";
import { Receipt, ReceiptItem } from "@/app/types/types";
import { motion } from "framer-motion"; // Optional: For animations
import { useReceiptsData } from "./ReceiptAPI";

// Define the type for ReceiptDetails component props
interface ReceiptDetailsProps {
  details: ReceiptItem[];
  onItemEdit?: (index: number, updatedItem: ReceiptItem) => void;
  onItemDelete?: (index: number) => void;
}

const ReceiptDetails: React.FC<ReceiptDetailsProps> = ({
  details,
  onItemEdit,
  onItemDelete,
}) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedItem, setEditedItem] = useState<ReceiptItem | null>(null);
  const [originalItem, setOriginalItem] = useState<ReceiptItem | null>(null); // To track the original receipt
  const [editedReceipt, setEditedReceipt] = useState<Receipt | null>(null); // To track updated receipt fields

  //Email var for page
  const email = "ajwitt2@asu.edu";

  // API functions
  const { 
    areceipts,
    asetReceipts,
    loading, 
    editReceiptAPI, 
    addReceiptAPI, 
    addReceiptIngredientAPI,
    editReceiptIngredientAPI, 
  } = useReceiptsData(email);

  // Toggle edit mode and initialize edited item
  const handleEditClick = (index: number, item: ReceiptItem) => {
    setEditingIndex(index);
    setEditedItem({ ...item });
    setOriginalItem({ ...item }); // Save the original item before edits
    // setEditedReceipt({ ...receipt});
  };

  // Handle save button click
  const handleSaveClick = async(index: number) => {
    // if (editedItem && originalItem && editedReceipt){
    //   try {
    //     await editReceiptIngredientAPI(email, editedItem, originalItem, editedReceipt);
        
    //     if(onItemEdit) {
    //       onItemEdit(index, editedItem);
    //     }
    //     alert("Successfully Updated.");
    //     resetEditing();
    //   } catch (error) {
    //     alert("There was an error editing the receipt item");
    //   }
    // }
    if(editedItem && onItemEdit) onItemEdit(index, editedItem);
    resetEditing();
  };

  // Reset editing mode
  const resetEditing = () => {
    setEditingIndex(null);
    setEditedItem(null);
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedItem((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  return (
    <div>
      {details.length === 0 ? (
        <motion.p
          className="text-center text-gray-600 p-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          No ingredients found for this receipt.
        </motion.p>
      ) : (
        <div className="pl-[19%]">
          <table className="min-w-full mt-4 overflow-hidden">
            <thead>
              <tr>
                {["Ingredient", "Quantity", "Units", "Price", "Actions"].map(
                  (header) => (
                    <th
                      key={header}
                      className="w-1/4 text-left text-xs font-medium text-black uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {details.map((detail, idx) => (
                <ReceiptDetailsRow
                  key={idx}
                  item={detail}
                  index={idx}
                  isEditing={editingIndex === idx}
                  editedItem={editedItem}
                  onEditClick={handleEditClick}
                  onSaveClick={handleSaveClick}
                  onCancelClick={resetEditing}
                  handleInputChange={handleInputChange}
                  onItemDelete={
                    onItemDelete ? () => onItemDelete(idx) : () => {}
                  }
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReceiptDetails;
