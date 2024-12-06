// import "@/app/globals.css";
// import React, { useEffect, useState, useMemo } from "react";
// import DashboardLayout from "./DashboardWrapper";
// import { motion } from "framer-motion";
// import { AlertCircle, Box, DollarSign, FileText } from "lucide-react";
// import InventoryTable from "../(components)/DashboardInventoryComponents/InventoryTable";
// import DashCardLong from "../(components)/DashboardHomeComponents/DashCardLong";
// import { useInventoryData } from "../(components)/DashboardInventoryComponents/InventoryApi";
// import { validateToken, getToken } from "@/app/login/tokenAuth";
// import { useRouter } from "next/router";

// export const DashboardInventory: React.FC = () => {
//   const [email, setEmail] = useState<string | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const verifyToken = async () => {
//       const token = getToken();
//       if (!token) {
//         console.error("No token found. Redirecting to login.");
//         router.push("/login");
//         return;
//       }

//       const validationResult = await validateToken();

//       if (!validationResult || !validationResult.email) {
//         console.error("Token validation failed. Redirecting to login.");
//         router.push("/login");
//         return;
//       }

//       setEmail(validationResult.email);
//       console.log("Token validated. Email:", validationResult.email);
//     };

//     verifyToken();
//   }, [router]);

//   const { inventory, setInventory } = useInventoryData(email || ""); // Pass email to fetch data.

//   const totalInventoryItems = useMemo(() => inventory.length, [inventory]);
//   const lowStockItems = useMemo(() => {
//     const threshold = 5;
//     return inventory.filter((item) => parseFloat(item.Amount) < threshold).length;
//   }, [inventory]);
//   const outOfStockItems = useMemo(() => {
//     return inventory.filter((item) => parseFloat(item.Amount) === 0).length;
//   }, [inventory]);
//   const totalInventoryValue = useMemo(() => "$10,000", []); // Placeholder

//   if (!email) return <p>Loading...</p>;

//   return (
//     <DashboardLayout>
//       <div className="outline outline-white outline-8 flex-1 relative border-white rounded-3xl border-[16px] overflow-hidden">
//         <div className="max-w-[1600px] mx-auto px-4 lg:px-6">
//           <div className="pt-2 mx-auto ">
//             <motion.div
//               className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 mb-4 mt-4"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 1 }}
//             >
//               <div className="col-span-1 lg:col-span-1 space-y-[20px] sm:space-y-0 sm:grid sm:grid-cols-2 sm:col-span-2 lg:grid-cols-4 gap-4">
//                 <DashCardLong
//                   name="Total Inventory Items"
//                   icon={FileText}
//                   value={totalInventoryItems}
//                   color="bg-gray-100"
//                 />
//                 <DashCardLong
//                   name="Low Stock Items"
//                   icon={AlertCircle}
//                   value={lowStockItems}
//                   color="bg-gray-100"
//                   isPurple={true}
//                 />
//                 <DashCardLong
//                   name="Out of Stock Items"
//                   icon={Box}
//                   value={outOfStockItems}
//                   color="bg-gray-100"
//                 />
//                 <DashCardLong
//                   name="Total Inventory Value"
//                   icon={DollarSign}
//                   value={totalInventoryValue}
//                   color="bg-gray-100"
//                   isPurple={true}
//                 />
//               </div>
//             </motion.div>
//           </div>
//           <InventoryTable inventory={inventory} setInventory={setInventory} />
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default DashboardInventory;