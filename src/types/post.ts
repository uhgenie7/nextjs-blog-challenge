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
  postData: ISimplePost;
}
