export type ArchiveCardSize = 'small' | 'medium' | 'large';

export interface Archive {
  archiveId: number;
  title: string;
  date: string; // YYYY.MM.DD
  year: number;
  imageUrl: string;
  size: ArchiveCardSize;
}
