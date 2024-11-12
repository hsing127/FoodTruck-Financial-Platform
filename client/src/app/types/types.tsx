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
