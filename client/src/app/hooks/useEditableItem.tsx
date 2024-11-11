import { useState } from "react";

interface UseEditableItemProps<T> {
  onItemEdit?: (index: number, updatedItem: T) => void;
}

function useEditableItem<T>({ onItemEdit }: UseEditableItemProps<T>) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedItem, setEditedItem] = useState<T | null>(null);

  const handleEditClick = (index: number, item: T) => {
    setEditingIndex(index);
    setEditedItem({ ...item });
  };

  const handleSaveClick = (index: number) => {
    if (onItemEdit && editedItem) onItemEdit(index, editedItem);
    resetEditing();
  };

  const resetEditing = () => {
    setEditingIndex(null);
    setEditedItem(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedItem((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  return {
    editingIndex,
    editedItem,
    handleEditClick,
    handleSaveClick,
    resetEditing,
    handleInputChange,
  };
}

export default useEditableItem;
