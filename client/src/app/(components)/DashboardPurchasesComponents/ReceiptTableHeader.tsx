import React from "react";
import SearchInput from "../Common/SearchInput";
import AddReceiptModal from "../DashboardPurchasesComponents/AddReceiptModal";
import IngredientTable from "../DashboardMenuComponents/IngredientTable";

interface ReceiptTableHeaderProps {
  searchInput: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  actions: any[];
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ReceiptTableHeader: React.FC<ReceiptTableHeaderProps> = ({
  searchInput,
  handleSearch,
  actions,
  isModalOpen,
  openModal,
  closeModal,
}) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold text-black mb-2">Receipt List</h2>
      <div className="w-full">
        <SearchInput
          searchInput={searchInput}
          handleSearch={handleSearch}
          actions={actions}
        />
        {/* Include Modal component to show IngredientTable form */}
        <AddReceiptModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Add New Receipt Entry"
        >
          {/* Modal content goes here */}
          <IngredientTable
            ingredients={[]}
            onItemAdd={(newItem) => {
              // Add logic
            }}
          />
        </AddReceiptModal>
      </div>
    </div>
  );
};

export default ReceiptTableHeader;
