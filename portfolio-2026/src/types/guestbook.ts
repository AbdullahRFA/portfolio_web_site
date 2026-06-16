export interface IGuestbookEntry {
  id: string;
  name: string;
  avatar: string;
  message: string;
  date: string;
  isOwner?: boolean; // Highlight your responses to visitors!
}