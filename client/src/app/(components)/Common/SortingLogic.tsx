import { useState, useCallback } from "react";

//types for sort fields and order
type SortField =
  | "date"
  | "cost"
  | "location"
  | "name"
  | "price"
  | "ingredients"
  | null;
type SortOrder = "asc" | "desc";

//generic type for items to sort
interface SortableItem {
  [key: string]: any;
}

// Hook return type
interface UseSortLogicReturn<T extends SortableItem> {
  sortField: SortField;
  sortOrder: SortOrder;
  setSortFieldAndOrder: (field: SortField) => void;
  sortData: (data: T[]) => T[];
}

const useSortLogic = <T extends SortableItem>(): UseSortLogicReturn<T> => {
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  // Function to toggle sort order or set new sort field
  const setSortFieldAndOrder = (field: SortField) => {
    if (field === sortField) {
      // Toggle sort order if the same field is clicked
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      // Set new sort field and default to ascending order
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Memoize the sortData function
  const sortData = useCallback(
    (data: T[]): T[] => {
      if (!sortField) return data;

      return [...data].sort((a, b) => {
        let aField = a[sortField];
        let bField = b[sortField];

        // Handle different data types
        if (sortField === "date") {
          aField = new Date(aField);
          bField = new Date(bField);
        } else if (sortField === "cost" || sortField === "price") {
          aField = parseFloat(String(aField).replace(/[^0-9.-]+/g, ""));
          bField = parseFloat(String(bField).replace(/[^0-9.-]+/g, ""));
        } else if (sortField === "location" || sortField === "name") {
          aField = String(aField).toLowerCase();
          bField = String(bField).toLowerCase();
        } else if (sortField === "ingredients") {
          aField = Array.isArray(aField) ? aField.length : 0;
          bField = Array.isArray(bField) ? bField.length : 0;
        }

        if (aField < bField) return sortOrder === "asc" ? -1 : 1;
        if (aField > bField) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    },
    [sortField, sortOrder]
  );

  return { sortField, sortOrder, setSortFieldAndOrder, sortData };
};

export default useSortLogic;
