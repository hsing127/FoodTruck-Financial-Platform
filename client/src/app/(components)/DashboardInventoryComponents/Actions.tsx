import React from "react";
import { Upload, Plus, Filter } from "lucide-react";
import {
  handleUploadInventoryImage,
  handleUploadInventoryDocument,
  handleUploadInventorySpreadsheet,
  handleAddInventoryItem,
  handleFilterInventoryByDate,
  handleFilterInventoryByAmount,
  handleFilterInventoryByName,
} from "./ActionHandlers";

const actions = (dependencies: { openModal: () => void }) => [
  {
    icon: <Upload size={20} />,
    type: "upload",
    title: "Upload Inventory",
    items: [
      { label: "Upload Image", onClick: handleUploadInventoryImage },
      { label: "Upload Document", onClick: handleUploadInventoryDocument },
      {
        label: "Upload Spreadsheet",
        onClick: handleUploadInventorySpreadsheet,
      },
    ],
  },
  {
    icon: <Plus size={20} />,
    type: "addEntry",
    title: "Add Inventory Item",
    items: [
      {
        label: "Add Item",
        onClick: () => handleAddInventoryItem(dependencies.openModal),
      },
    ],
  },
  {
    icon: <Filter size={20} />,
    type: "filter",
    title: "Filter Inventory",
    items: [
      { label: "Filter by Date", onClick: handleFilterInventoryByDate },
      { label: "Filter by Amount", onClick: handleFilterInventoryByAmount },
      { label: "Filter by Name", onClick: handleFilterInventoryByName },
    ],
  },
];

export default actions;
