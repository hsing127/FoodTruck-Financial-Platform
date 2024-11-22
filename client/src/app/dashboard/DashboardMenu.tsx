import "@/app/globals.css";
import React, { useMemo } from "react";
import DashboardLayout from "./DashboardWrapper";
import { motion } from "framer-motion";
import { Pizza, DollarSign, ClipboardList, BookOpen } from "lucide-react";
import DashCardLong from "../(components)/DashboardHomeComponents/DashCardLong";
import MenuTable from "../(components)/DashboardMenuComponents/MenuTable";
import { useMenuData } from "../(components)/DashboardMenuComponents/MenuAPI";

export const DashboardMenu: React.FC = () => {
  const [menuItems, setMenuItems] = useMenuData("ajwitt2@asu.edu");

  // Compute Total Menu Items
  const totalMenuItems = menuItems.length;

  // Compute Average Price
  const averagePrice = useMemo(() => {
    if (menuItems.length === 0) return "0.00";
    const total = menuItems.reduce((acc, item) => {
      const price = parseFloat(item.price.replace("$", ""));
      return acc + (isNaN(price) ? 0 : price);
    }, 0);
    return (total / menuItems.length).toFixed(2);
  }, [menuItems]);

  // Compute Total Unique Ingredients
  const totalUniqueIngredients = useMemo(() => {
    const ingredientSet = new Set<string>();
    menuItems.forEach((item) => {
      item.ingredients.forEach((ing) => ingredientSet.add(ing.ingredient));
    });
    return ingredientSet.size;
  }, [menuItems]);

  // Compute Total Inventory Items
  const totalInventoryItems = 150; // Placeholder value

  return (
    <DashboardLayout>
      <div className="outline outline-white outline-8 flex-1 relative border-white rounded-3xl border-[16px] overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-6">
          <div className="pt-2 mx-auto ">
            {/* First row of dashboard cards */}
            <motion.div
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 mb-4 mt-4"
              initial={{ opacity: 0, y: 20 }} // Animation for appearance
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              {/* Menu Dashboard Cards */}
              <div className="col-span-1 lg:col-span-1 space-y-[20px] sm:space-y-0 sm:grid sm:grid-cols-2 sm:col-span-2 lg:grid-cols-4 gap-4">
                <DashCardLong
                  name="Total Menu Items"
                  icon={Pizza}
                  value={totalMenuItems}
                  color="bg-gray-100"
                />
                <DashCardLong
                  name="Average Price"
                  icon={DollarSign}
                  value={`$${averagePrice}`}
                  color="bg-gray-100"
                />
                <DashCardLong
                  name="Total Ingredients"
                  icon={ClipboardList}
                  value={totalUniqueIngredients}
                  color="bg-gray-100"
                  isPurple={true}
                />
                <DashCardLong
                  name="Total Inventory Items"
                  icon={BookOpen}
                  value={totalInventoryItems}
                  color="bg-gray-100"
                  isPurple={true}
                />
              </div>
            </motion.div>
          </div>
          <MenuTable menuItems={menuItems} setMenuItems={setMenuItems} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardMenu;
