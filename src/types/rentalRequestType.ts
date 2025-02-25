export interface RentalRequest {
  itemId: number;
  count: number;
  rentalTime: {
    hour: number;
    minute: number;
  };
  ignoreDuplicate: boolean;
}
