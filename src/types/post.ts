export interface IAllPosts {
  allPosts: IPost[];
}

export interface ISimplePost {
  title: string;
  description: string;
  date: string;
  slug: string;
}

export interface IPost {
  title: string;
  description: string;
  date: string;
  content: string;
  slug: string;
}
