import { IBlogPost } from '../types/blog';

export const mockBlogPosts: IBlogPost[] = [
  {
    slug: 'mastering-typescript-interfaces',
    title: 'Mastering TypeScript Interfaces for Scalable Architectures',
    excerpt: 'Learn how to use declarative type safety rules, extension parameters, and optional assertions to structure large-scale full-stack application nodes.',
    date: 'June 12, 2026',
    category: 'TypeScript',
    readingTime: '4 min read',
    content: 'TypeScript interfaces provide structure during development time... Here we look deeply into explicit type safety mappings, optional property bindings, and interface merging mechanics.'
  },
  {
    slug: 'nextjs-server-components-deep-dive',
    title: 'Next.js Server Components: An Engineering Deep Dive',
    excerpt: 'A clean exploration of React Server Components (RSC) architecture. Understand data streaming, hydration processes, and serverless performance optimizations.',
    date: 'May 28, 2026',
    category: 'Next.js',
    readingTime: '7 min read',
    content: 'React Server Components revolutionize how web applications execute... By processing intensive layout data fetches directly on server runtimes, zero client-side bundles are generated.'
  },
  {
    slug: 'mongodb-indexing-for-beginners',
    title: 'Optimizing Document Databases: MongoDB Indexing 101',
    excerpt: 'Stop writing sluggish queries. Dive into single-field compound indices, execution explain plans, and strategies to lower server lookups from O(N) down to O(log N).',
    date: 'April 15, 2026',
    category: 'Database',
    readingTime: '5 min read',
    content: 'When database collections scale into hundreds of thousands of entry records, collection scans degrade infrastructure. This guide covers B-Tree index optimizations.'
  }
];