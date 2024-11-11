import React from "react";
import { motion } from "framer-motion";

interface TableRowProps {
  cells: React.ReactNode[];
  rowIndex: number;
  variants: any;
}

const TableRow: React.FC<TableRowProps> = ({ cells, rowIndex, variants }) => (
  <motion.tr
    variants={variants}
    initial="hidden"
    animate="visible"
    transition={{ delay: rowIndex * 0.1, duration: 0.3 }}
  >
    {cells}
  </motion.tr>
);

export default TableRow;
