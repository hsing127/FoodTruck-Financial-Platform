// Upload actions
export const handleUploadMenuImage = () => {
  console.log("Upload Menu Image");
};

export const handleUploadMenuDocument = () => {
  console.log("Upload Menu Document");
};

export const handleUploadMenuSpreadsheet = () => {
  console.log("Upload Menu Spreadsheet");
};

// Add Entry actions
export const handleAddMenuItem = (openModal: () => void) => {
  openModal();
};

export const handleAddMenuCategory = () => {
  console.log("Add Menu Category");
};

// Filter actions
export const handleFilterMenuByDate = () => {
  console.log("Filter Menu by Date");
};

export const handleFilterMenuByPrice = () => {
  console.log("Filter Menu by Price");
};

export const handleFilterMenuByCategory = () => {
  console.log("Filter Menu by Category");
};
