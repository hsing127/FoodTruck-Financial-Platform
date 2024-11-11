// Upload actions
export const handleUploadImage = () => {
  console.log("Upload Image");
};

export const handleUploadDocument = () => {
  console.log("Upload Document");
};

export const handleUploadSpreadsheet = () => {
  console.log("Upload Spreadsheet");
};

// Add Entry actions
export const handleAddManualEntry = (openModal: () => void) => {
  openModal();
};

export const handleAddExpense = () => {
  console.log("Add Expense");
};

// Filter actions
export const handleFilterByDate = () => {
  console.log("Filter by Date");
};

export const handleFilterByCost = () => {
  console.log("Filter by Cost");
};

export const handleFilterByLocation = () => {
  console.log("Filter by Location");
};
