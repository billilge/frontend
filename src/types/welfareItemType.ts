export interface Item {
  itemId: number;
  itemName: string;
  itemType: 'CONSUMPTION' | 'RENTAL';
  count: number;
  imageUrl: string;
}

export interface WelfareItemData {
  items: Item[];
}
