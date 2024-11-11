import React from "react";
import { Upload, Plus, Filter } from "lucide-react";
import {
  handleUploadMenuImage,
  handleUploadMenuDocument,
  handleUploadMenuSpreadsheet,
  handleAddMenuItem,
  handleAddMenuCategory,
  handleFilterMenuByDate,
  handleFilterMenuByPrice,
  handleFilterMenuByCategory,
} from "./ActionHandlers";

// Define the actions array as a function that accepts dependencies
const actions = (dependencies: { openModal: () => void }) => [
  {
    icon: <Upload size={20} />,
    type: "upload",
    title: "Upload Menu",
    items: [
      { label: "Upload Menu Image", onClick: handleUploadMenuImage },
      { label: "Upload Menu Document", onClick: handleUploadMenuDocument },
      {
        label: "Upload Menu Spreadsheet",
        onClick: handleUploadMenuSpreadsheet,
      },
    ],
  },
  {
    icon: <Plus size={20} />,
    type: "addEntry",
    title: "Add Menu Item",
    items: [
      {
        label: "Add Menu Item",
        onClick: () => handleAddMenuItem(dependencies.openModal),
      },
      { label: "Add Menu Category", onClick: handleAddMenuCategory },
    ],
  },
  {
    icon: <Filter size={20} />,
    type: "filter",
    title: "Filter Menu",
    items: [
      { label: "Filter by Date", onClick: handleFilterMenuByDate },
      { label: "Filter by Price", onClick: handleFilterMenuByPrice },
      { label: "Filter by Category", onClick: handleFilterMenuByCategory },
    ],
  },
];

export default actions;
