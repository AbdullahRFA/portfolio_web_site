// src/lib/blogData.ts
import { IBlogPost } from '../types/blog';

export const mockBlogPosts: IBlogPost[] = [
  {
    slug: 'demystifying-explainable-ai-xai',
    title: 'Demystifying Explainable AI (XAI) in Modern Decision Systems',
    excerpt: 'An engineering look at making complex machine learning pipelines transparent. Learn how to bridge the gap between predictive accuracy and interpretability.',
    date: 'June 12, 2026',
    category: 'AI & ML',
    readingTime: '5 min read',
    content: 'Explainable AI (XAI) addresses the black-box dilemma of deep networks... By exploring tools like SHAP and LIME, engineers can debug data processing layers and justify model weights.'
  },
  {
    slug: 'building-resilient-architectures-django',
    title: 'Structuring Scalable Web Architectures with Django and React',
    excerpt: 'Deep-dive into component-driven frontend architecture tied into robust Python-backed RESTful APIs. Best practices for schema design and query isolation.',
    date: 'May 28, 2026',
    category: 'Web Development',
    readingTime: '7 min read',
    content: 'Combining Reacts dynamic rendering with Djangos secure ORM provides an exceptional full-stack paradigm... This breakdown explores token-based auth and isolated database collections.'
  },
  {
    slug: 'automated-testing-sqa-pipelines',
    title: 'Shifting Left: Implementing Automated Testing in SQA Workflows',
    excerpt: 'Stop manual checking delays. Understand how to design structured automated test scripts that catch critical edge-case regressions directly inside your deployment pipeline.',
    date: 'April 15, 2026',
    category: 'SQA Engineering',
    readingTime: '4 min read',
    content: 'Software Quality Assurance requires more than basic happy-path validations... Designing test suites that mimic authentic user mutation sequences guarantees complete regression tracking.'
  }
];