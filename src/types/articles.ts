export interface IntelArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: 'Tactical Analysis' | 'Threat Assessment' | 'Executive Protection' | 'Combatives Doctrine';
  publishedAt: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  content: string[];
  keyTakeaways: string[];
}
