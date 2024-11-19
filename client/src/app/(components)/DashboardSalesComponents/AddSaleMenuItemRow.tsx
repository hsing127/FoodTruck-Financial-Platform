import React from "react";
import EditableCell from "../Common/EditableCell";
import { X } from "lucide-react";
import { SaleItem } from "@/app/types/types";
import { motion } from "framer-motion";
import { menuItemRowVariants } from "../Common/Animations";

interface AddSaleMenuItemRowProps {
  index: number;
  menuItem: SaleItem;
  handleMenuItemChange: (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleDeleteMenuItem: (index: number) => void;
}

const AddSaleMenuItemRow: React.FC<AddSaleMenuItemRowProps> = ({
  index,
  menuItem,
  handleMenuItemChange,
  handleDeleteMenuItem,
}) => {
  return (
    <motion.tr
      className="bg-white"
      variants={menuItemRowVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
    >
      <EditableCell
        isEditing={true}
        value={menuItem.menuitemname}
        name="menuItem"
        onChange={(e) => handleMenuItemChange(index, e)}
        placeholder="MenuItem"
      />

      <EditableCell
        isEditing={true}
        value={menuItem.count.toString()}
        name="quantity"
        onChange={(e) => handleMenuItemChange(index, e)}
        type="number"
        placeholder="Quantity"
      />

      <td className="pl-2 pt-2 text-sm text-black">
        <button
          className="text-red-600 hover:text-red-800"
          onClick={() => handleDeleteMenuItem(index)}
          title="Delete MenuItem"
        >
          <X size={20} />
        </button>
      </td>
    </motion.tr>
  );
};

export default AddSaleMenuItemRow;
