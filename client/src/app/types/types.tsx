export interface ReceiptItem {
  ingredient: string;
  quantity: number;
  units: string;
  price: string;
}

export interface Receipt {
  localReceiptId: number;
  location: string;
  date: string;
  time: string;
  cost: string;
  details: ReceiptItem[];
}

export interface Ingredient {
  ingredient: string;
  quantity: number;
  units: string;
  price: string;
}

export interface MenuItem {
  id: number;
  image: JSX.Element;
  name: string;
  price: string;
  ingredients: Ingredient[];
}

export interface InventoryItem {
  Name: string;
  Amount: string;
  AmountUnits: string;
}