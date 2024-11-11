import React from "react";
import { Upload, Plus, Filter } from "lucide-react";
import {
  handleUploadImage,
  handleUploadDocument,
  handleUploadSpreadsheet,
  handleAddManualEntry,
  handleAddExpense,
  handleFilterByDate,
  handleFilterByCost,
  handleFilterByLocation,
} from "./ActionHandlers";

// Define the actions array as a function that accepts dependencies
const actions = (dependencies: { openModal: () => void }) => [
  {
    icon: <Upload size={20} />,
    type: "upload",
    title: "Upload File",
    items: [
      { label: "Upload Image", onClick: handleUploadImage },
      { label: "Upload Document", onClick: handleUploadDocument },
      { label: "Upload Spreadsheet", onClick: handleUploadSpreadsheet },
    ],
  },
  {
    icon: <Plus size={20} />,
    type: "addEntry",
    title: "Add Entry",
    items: [
      {
        label: "Add Manual Entry",
        onClick: () => handleAddManualEntry(dependencies.openModal),
      },
      { label: "Add Expense", onClick: handleAddExpense },
    ],
  },
  {
    icon: <Filter size={20} />,
    type: "filter",
    title: "Filter",
    items: [
      { label: "Filter by Date", onClick: handleFilterByDate },
      { label: "Filter by Cost", onClick: handleFilterByCost },
      { label: "Filter by Location", onClick: handleFilterByLocation },
    ],
  },
];

export default actions;
