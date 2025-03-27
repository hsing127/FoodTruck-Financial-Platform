import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, RefreshCcw, X } from "lucide-react";
import EditableCell from "../Common/EditableCell";
import {
  backdropVariants,
  modalVariants,
  tableVariants,
} from "../Common/Animations";

interface AddSoldItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void; 
}

const AddSoldItemModal: React.FC<AddSoldItemModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const initialSoldItem = {
    menuitemname: "",
    count: 0,
    itemrevenue: 0,
    profitmargin: 0,
  };

  const [details, setDetails] = useState([initialSoldItem]);

  const handleItemChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setDetails((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [name]: ["count", "itemrevenue", "profitmargin"].includes(name)
          ? parseFloat(value) || 0
          : value,
      };
      return updated;
    });
  };

  const handleAddItem = () => {
    setDetails((prev) => [...prev, initialSoldItem]);
  };

  const handleDeleteItem = (index: number) => {
    setDetails((prev) => prev.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    setDetails([initialSoldItem]);
  };

  const handleSave = () => {
    if (details.length === 0) {
      alert("Please add at least one item.");
      return;
    }
    onSave(details); // Send JSON to parent
    handleReset();
    onClose();
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
            onClick={(e) => e.stopPropagation()}
            layout
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-black">
                Add Sold Item Entry
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={28} />
              </button>
            </div>

            <motion.table
              className="w-full mt-4 mb-6"
              variants={tableVariants}
              initial="hidden"
              animate="visible"
              layout
            >
              <thead>
                <tr>
                  <th className="text-left text-sm font-medium text-black">
                    Menu Item
                  </th>
                  <th className="text-left text-sm font-medium text-black">
                    Quantity
                  </th>
                  <th className="text-left text-sm font-medium text-black">
                    Item Revenue
                  </th>
                  <th className="text-left text-sm font-medium text-black">
                    Profit Margin
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {details.map((item, idx) => (
                  <motion.tr key={idx} layout>
                    <EditableCell
                      isEditing={true}
                      value={item.menuitemname}
                      name="menuitemname"
                      onChange={(e) => handleItemChange(idx, e)}
                      type="text"
                      placeholder="Item Name"
                    />
                    <EditableCell
                      isEditing={true}
                      value={item.count.toString()}
                      name="count"
                      onChange={(e) => handleItemChange(idx, e)}
                      type="number"
                      placeholder="Qty"
                    />
                    <EditableCell
                      isEditing={true}
                      value={item.itemrevenue.toString()}
                      name="itemrevenue"
                      onChange={(e) => handleItemChange(idx, e)}
                      type="number"
                      placeholder="$ Revenue"
                    />
                    <EditableCell
                      isEditing={true}
                      value={item.profitmargin.toString()}
                      name="profitmargin"
                      onChange={(e) => handleItemChange(idx, e)}
                      type="number"
                      placeholder="0.25"
                    />
                    <td className="pl-2 pt-2 text-sm text-black">
                      <button
                        onClick={() => handleDeleteItem(idx)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete Row"
                      >
                        ✕
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </motion.table>

            <div className="flex justify-between mt-6">
              <button
                onClick={handleSave}
                className="px-4 py-2 text-white font-medium rounded bg-[#8B5CF6] hover:bg-[#b07ff0]"
              >
                Add Sold Item(s)
              </button>

              <button
                onClick={handleAddItem}
                className="flex items-center text-sm text-blue-500 font-medium hover:text-blue-700"
              >
                <Plus size={20} className="mr-1" /> Add Row
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddSoldItemModal;

