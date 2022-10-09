export interface IAllPosts {
  allPosts: IPreviewPost[];
}

export interface IPreviewPost {
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
