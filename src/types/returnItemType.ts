export interface Item {
  itemName: string;
  imageUrl: string;
}

export interface ReturnItem {
  item: Item;
  rentalDayCount: number;
}

export interface ReturnData {
  items: ReturnItem[];
}
