import { BLOG_TYPE } from "./enums";

export interface BlogHeadConfig {
  date: string;
  category: string;
  description: string;
  slug: string;
  path: string;
  tags: string[];
  title: string;
  thumbnail: string;
  type: BLOG_TYPE;
}
