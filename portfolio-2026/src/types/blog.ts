export interface IBlogPost {
  slug: string;        // URL identifier (e.g., "understanding-nextjs-app-router")
  title: string;
  excerpt: string;     // Short summary snippet shown on cards
  date: string;
  category: string;    // Primarily used for our tag-based filter sorting
  readingTime: string;
  content: string;     // The actual text body layout
}