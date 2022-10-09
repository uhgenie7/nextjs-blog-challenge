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
  author: IAuthor;
  content: string;
  slug: string;
}

export interface IAuthor {
  name: string;
  picture: string;
}
