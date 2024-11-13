import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RefreshCcw,
  X,
  Image as ImageIcon,
  Pizza,
  IceCream,
  Coffee,
  Sandwich,
  Salad,
} from "lucide-react";
import EditableCell from "../Common/EditableCell";
import { MenuItem } from "@/app/types/types";

interface AddMenuItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (menuItem: MenuItem) => void;
}

// Define the available food icons
const availableIcons = [
  { name: "Pizza", component: <Pizza size={44} /> },
  { name: "IceCream", component: <IceCream size={44} /> },
  { name: "Coffee", component: <Coffee size={44} /> },
  { name: "Sandwich", component: <Sandwich size={44} /> },
  { name: "Salad", component: <Salad size={44} /> },
];

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
  exit: { scale: 0.95, opacity: 0, transition: { duration: 0.3 } },
};

const AddMenuItemModal: React.FC<AddMenuItemModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  // Initial state for a new menu item
  const initialMenuItem: Omit<MenuItem, "id" | "ingredients"> = {
    name: "",
    price: "",
    image: <Pizza size={44} color="#8B5CF6" />, // Default icon
  };

  // State for the new menu item being added
  const [newMenuItem, setNewMenuItem] = useState(initialMenuItem);

  // State to manage image selection
  const [isImageSelectorOpen, setIsImageSelectorOpen] = useState(false);

  // Ref for the image selector to detect outside clicks
  const imageSelectorRef = useRef<HTMLDivElement>(null);

  // Handle changes in the menu item input fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMenuItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle selecting an image
  const handleSelectImage = (iconComponent: React.ReactElement) => {
    // Clone the icon component to set the color
    const coloredIcon = React.cloneElement(iconComponent, { color: "#8B5CF6" });
    setNewMenuItem((prev) => ({
      ...prev,
      image: coloredIcon,
    }));
    setIsImageSelectorOpen(false);
  };

  // Save the current menu item
  const handleSaveMenuItem = () => {
    const menuItem: MenuItem = {
      id: Date.now(),
      name: newMenuItem.name,
      price: newMenuItem.price,
      image: newMenuItem.image || <Pizza size={44} color="#8B5CF6" />, // Fallback to Pizza if no image selected
      ingredients: [],
    };
    onSave(menuItem);
    setNewMenuItem(initialMenuItem);
    onClose();
  };

  // Reset the menu item fields to their initial state
  const handleResetMenuItem = () => {
    setNewMenuItem(initialMenuItem);
  };

  // Close image selector when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        imageSelectorRef.current &&
        !imageSelectorRef.current.contains(event.target as Node)
      ) {
        setIsImageSelectorOpen(false);
      }
    };

    if (isImageSelectorOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isImageSelectorOpen]);

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
            className="bg-white rounded-lg shadow-lg p-8 w-[90%] max-w-md overflow-y-auto relative"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            layout // Enables layout animations for smooth transitions
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-black">
                Add Menu Item
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Close Modal"
              >
                <X size={28} />
              </button>
            </div>

            {/* Menu Item Details Form */}
            <motion.table
              className="w-full mt-4 mb-4" // Reduced margin-bottom from mb-6 to mb-4
              initial="hidden"
              animate="visible"
              layout
            >
              <thead>
                <tr>
                  <th className="w-1/2 text-left text-sm font-medium text-black">
                    Name
                  </th>
                  <th className="w-1/2 text-left text-sm font-medium text-black">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                <motion.tr
                  className="bg-white"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                >
                  <EditableCell
                    isEditing={true}
                    value={newMenuItem.name}
                    name="name"
                    onChange={handleInputChange}
                    placeholder="Menu Item Name"
                  />
                  <EditableCell
                    isEditing={true}
                    value={newMenuItem.price}
                    name="price"
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Price"
                  />
                  <td className="pl-2 pt-2 text-sm text-black">
                    <button
                      onClick={handleResetMenuItem}
                      className="text-blue-600 hover:text-blue-800"
                      title="Reset Fields"
                      aria-label="Reset Fields"
                    >
                      <RefreshCcw size={20} />
                    </button>
                  </td>
                </motion.tr>
              </tbody>
            </motion.table>

            {/* Combined Save and Choose Image Buttons */}
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={handleSaveMenuItem}
                className="px-4 py-2 text-white font-medium rounded bg-[#8B5CF6] hover:bg-[#b07ff0]"
                disabled={!newMenuItem.name || !newMenuItem.price}
              >
                Add Menu Item
              </button>
              {/* Choose Image Button */}
              <div className="relative" ref={imageSelectorRef}>
                <button
                  onClick={() => setIsImageSelectorOpen(!isImageSelectorOpen)}
                  className="flex items-center text-blue-600 hover:text-blue-800 focus:outline-none"
                  aria-label="Select Image"
                >
                  <ImageIcon size={28} className="mr-1" />
                  <span className="text-sm">Choose Image</span>
                </button>

                {/* Image Selector Modal */}
                <AnimatePresence>
                  {isImageSelectorOpen && (
                    <motion.div
                      className="-left-40 absolute bottom-full mb-2 bg-white border border-gray-200 rounded-lg shadow-lg p-3 grid grid-cols-5 gap-2 z-50 w-72"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                    >
                      {availableIcons.map((icon) => (
                        <button
                          key={icon.name}
                          onClick={() => handleSelectImage(icon.component)}
                          className={`p-2 rounded-md hover:bg-gray-100 focus:outline-none flex justify-center items-center ${
                            newMenuItem.image.type === icon.component.type
                              ? "border-2 border-blue-500"
                              : ""
                          }`}
                          aria-label={`Select ${icon.name} icon`}
                        >
                          {React.cloneElement(icon.component, {
                            color: "#8B5CF6",
                          })}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddMenuItemModal;
