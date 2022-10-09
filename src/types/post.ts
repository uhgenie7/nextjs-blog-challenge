export interface IAllPosts {
  allPosts: ISimplePost[];
}

export interface ISimplePost {
  title: string;
  description: string;
  date: string;
  slug: string;
}

export interface IPost {
  postData: {
    title: string;
    date: string;
    contentHtml: string;
  };
}
