import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RefreshCcw,
  X,
  Image as ImageIcon,
  Plus,
  Coffee,
  IceCream,
  Pizza,
  Salad,
  Sandwich,
} from "lucide-react";
import EditableCell from "../Common/EditableCell";
import { MenuItem, Ingredient } from "@/app/types/types";
import {
  backdropVariants,
  imageSelectorVariants,
  modalVariants,
  tableVariants,
} from "../Common/Animations";
import MenuItemIngredientRow from "./AddMenuItemIngredientRow";
import { useMenuData } from "./MenuAPI";

interface AddMenuItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (menuItem: MenuItem) => void;
}

const email = "ajwitt2@asu.edu";

// Define the available food icons
const availableIcons = [
  { name: "Pizza", component: <Pizza size={44} /> },
  { name: "IceCream", component: <IceCream size={44} /> },
  { name: "Coffee", component: <Coffee size={44} /> },
  { name: "Sandwich", component: <Sandwich size={44} /> },
  { name: "Salad", component: <Salad size={44} /> },
];

const AddMenuItemModal: React.FC<AddMenuItemModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  // Initial state for a new menu item
  const initialMenuItem: Omit<MenuItem, "id"> = {
    name: "",
    price: "",
    image: <Pizza size={44} color="#8B5CF6" />, // Default icon
    ingredients: [],
  };

  // State for the new menu item being added
  const [newMenuItem, setNewMenuItem] =
    useState<Omit<MenuItem, "id">>(initialMenuItem);

  // State to manage image selection
  const [isImageSelectorOpen, setIsImageSelectorOpen] = useState(false);

  // Ref for the image selector to detect outside clicks
  const imageSelectorRef = useRef<HTMLDivElement>(null);

  const [menuItems, setMenuItems, loading, addMenuItem, sendMenuItemToAPI] =
    useMenuData(email);

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
  const handleSaveMenuItem = async () => {
    if (!newMenuItem.name || !newMenuItem.price) {
      alert("Please fill in all required fields.");
      return;
    }

    const menuItem: MenuItem = {
      id: Date.now(),
      name: newMenuItem.name,
      price: newMenuItem.price,
      image: newMenuItem.image || <Pizza size={44} color="#8B5CF6" />, // Fallback to Pizza if no image selected
      ingredients: newMenuItem.ingredients,
    };

    try {
      // Send the menu item to the API
      await sendMenuItemToAPI(email, menuItem);
      // If successful, execute onSave callback
      onSave(menuItem);
      setNewMenuItem(initialMenuItem); // Reset the form
      onClose(); // Close the modal
    } catch (error) {
      alert("There was an error saving the menu item.");
    }

    onSave(menuItem);
    setNewMenuItem(initialMenuItem);
    onClose();
  };

  // Reset the menu item fields to their initial state
  const handleResetMenuItem = () => {
    setNewMenuItem(initialMenuItem);
  };

  // Handle changes in the ingredient input fields
  const handleIngredientChange = (
    index: number,
    updatedIngredient: Ingredient
  ) => {
    setNewMenuItem((prevMenuItem) => {
      const updatedIngredients = [...prevMenuItem.ingredients];
      updatedIngredients[index] = updatedIngredient;
      return {
        ...prevMenuItem,
        ingredients: updatedIngredients,
      };
    });
  };

  // Add a new empty ingredient row
  const handleAddIngredient = () => {
    setNewMenuItem((prevMenuItem) => ({
      ...prevMenuItem,
      ingredients: [
        ...prevMenuItem.ingredients,
        { ingredient: "", quantity: 0, units: "", price: "" },
      ],
    }));
  };

  // Delete an ingredient at a specific index
  const handleDeleteIngredient = (index: number) => {
    setNewMenuItem((prevMenuItem) => {
      const updatedIngredients = prevMenuItem.ingredients.filter(
        (_, idx) => idx !== index
      );
      return {
        ...prevMenuItem,
        ingredients: updatedIngredients,
      };
    });
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
            className="bg-white rounded-lg shadow-lg p-8 w-[90%] max-w-4xl overflow-y-auto relative"
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
              className="w-full mt-4 mb-4"
              variants={tableVariants}
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
                  variants={tableVariants}
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

            {/* Ingredients Table */}
            <AnimatePresence>
              {newMenuItem.ingredients.length > 0 && (
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
                    layout
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
                      {/* Render each ingredient row */}
                      <AnimatePresence>
                        {newMenuItem.ingredients.map((ingredient, idx) => (
                          <MenuItemIngredientRow
                            key={`menuitem-${newMenuItem.name}-ingredient-${idx}`}
                            index={idx}
                            ingredient={ingredient}
                            onChange={handleIngredientChange}
                            onDelete={handleDeleteIngredient}
                          />
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </motion.table>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between mt-6 items-center">
              {/* Left Side: Add Menu Item */}
              <div className="flex space-x-2">
                <button
                  onClick={handleSaveMenuItem}
                  className="px-4 py-2 text-white font-medium rounded bg-[#8B5CF6] hover:bg-[#b07ff0]"
                >
                  Add Menu Item
                </button>
              </div>

              {/* Right Side: Choose Image and Add Ingredient */}
              <div className="flex space-x-2 relative" ref={imageSelectorRef}>
                {/* Choose Image Button */}
                <button
                  onClick={() => setIsImageSelectorOpen(!isImageSelectorOpen)}
                  className="pr-2 flex items-center text-sm text-blue-500 font-medium hover:text-blue-700"
                  aria-label="Select Image"
                >
                  <ImageIcon size={20} className="mr-1" />
                  <span className="text-sm">Choose Image</span>
                </button>

                {/* Add Ingredient Button */}
                <button
                  onClick={handleAddIngredient}
                  className="flex items-center text-sm text-blue-500 font-medium hover:text-blue-700"
                >
                  <Plus size={20} className="mr-1" /> Add Ingredient
                </button>

                {/* Image Selector Dropdown */}
                <AnimatePresence>
                  {isImageSelectorOpen && (
                    <motion.div
                      className="absolute bottom-full mb-2 bg-white border border-gray-200 rounded-lg shadow-lg grid grid-cols-5 z-50 w-48"
                      variants={imageSelectorVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      {availableIcons.map((icon) => (
                        <button
                          key={icon.name}
                          onClick={() => handleSelectImage(icon.component)}
                          className={`p-1 rounded-md hover:bg-gray-100 focus:outline-none flex justify-center items-center ${
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
