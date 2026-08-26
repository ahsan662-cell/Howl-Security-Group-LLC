import { INTEL_ARTICLES } from "@/constants/mock-data/articles.data";
import { IntelArticle } from "@/types/articles";

export class ArticlesService {
  static async getAllArticles(): Promise<IntelArticle[]> {
    return Promise.resolve(INTEL_ARTICLES);
  }

  static async getArticleBySlug(slug: string): Promise<IntelArticle | undefined> {
    return Promise.resolve(INTEL_ARTICLES.find((a) => a.slug === slug));
  }
}
