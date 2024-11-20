import { useState, useCallback } from "react";

// Types for sort fields and order
type SortOrder = "asc" | "desc";

type SortField =
  | "date"
  | "cost"
  | "location"
  | "name"
  | "price"
  | "ingredients"
  | "startDate"
  | "endDate"
  | "revenue"
  | "Amount"
  | "AmountUnits"
  | "ingredients"
  | "Name";

// Generic type for items to sort
interface SortableItem {
  [key: string]: any;
}

// Hook return type
interface UseSortLogicReturn<T extends SortableItem> {
  sortField: SortField | null;
  sortOrder: SortOrder;
  setSortFieldAndOrder: (field: SortField) => void;
  sortData: (data: T[]) => T[];
}

const useSortLogic = <T extends SortableItem>(): UseSortLogicReturn<T> => {
  const [sortConfig, setSortConfig] = useState<{
    sortField: SortField | null;
    sortOrder: SortOrder;
  }>({
    sortField: null,
    sortOrder: "asc",
  });

  const { sortField, sortOrder } = sortConfig;

  // Function to toggle sort order or set a new sort field
  const setSortFieldAndOrder = (field: SortField) => {
    setSortConfig((prevConfig) => {
      if (field === prevConfig.sortField) {
        // Toggle sort order if the same field is clicked
        return {
          sortField: field,
          sortOrder: prevConfig.sortOrder === "asc" ? "desc" : "asc",
        };
      } else {
        // Set new sort field and default to ascending order
        return {
          sortField: field,
          sortOrder: "asc",
        };
      }
    });
  };

  // Memoize the sortData function
  const sortData = useCallback(
    (data: T[]): T[] => {
      if (!sortField) return data;

      return [...data].sort((a, b) => {
        let aField = a[sortField];
        let bField = b[sortField];

        // Handle undefined or null values
        if (aField == null && bField == null) return 0;
        if (aField == null) return sortOrder === "asc" ? -1 : 1;
        if (bField == null) return sortOrder === "asc" ? 1 : -1;

        // Handle different data types
        if (sortField === "date") {
          aField = new Date(aField).getTime();
          bField = new Date(bField).getTime();
        } else if (
          sortField === "cost" ||
          sortField === "price" ||
          sortField === "Amount"
        ) {
          // Parse numeric values from strings
          aField = parseFloat(String(aField).replace(/[^0-9.-]+/g, ""));
          bField = parseFloat(String(bField).replace(/[^0-9.-]+/g, ""));
        } else if (
          sortField === "location" ||
          sortField === "name" ||
          sortField === "AmountUnits" ||
          sortField === "Name"
        ) {
          // Convert to lowercase strings for case-insensitive comparison
          aField = String(aField).toLowerCase();
          bField = String(bField).toLowerCase();
        } else if (sortField === "ingredients") {
          // Sort based on the number of ingredients
          aField = Array.isArray(aField) ? aField.length : 0;
          bField = Array.isArray(bField) ? bField.length : 0;
        } else {
          // Fallback for any other fields
          aField = String(aField).toLowerCase();
          bField = String(bField).toLowerCase();
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
