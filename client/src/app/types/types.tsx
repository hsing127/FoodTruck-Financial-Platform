import { ReactElement } from "react";

// Interface for individual receipt items (ingredients)
export interface ReceiptItem {
  ingredient: string;
  quantity: number;
  units: string;
  price: string;
}

// Interface for a receipt
export interface Receipt {
  localReceiptId: number;
  location: string;
  date: string;
  time: string;
  cost: string;
  details: ReceiptItem[];
}

export interface Sale {
  localSaleId: number;
  startDate: string;
  endDate: string;
  revenue: string;
  details: SaleItem[];
}

export interface SaleItem {
  menuitemname: string;
  count: number;
  itemrevenue: number;
}

// Interface for ingredients (used in MenuItem)
export interface Ingredient {
  ingredient: string;
  quantity: number;
  units: string;
  price: string;
}

// Interface for menu items
export interface MenuItem {
  id: number;
  image: ReactElement;
  name: string;
  price: string;
  ingredients: Ingredient[];
}

// Interface for inventory items
export interface InventoryItem {
  id: number;
  Name: string;
  Amount: string;
  AmountUnits: string;
}

// Interface for individual notifications
export interface Notification {
  id: number;
  title: string;
  description: string;
}
