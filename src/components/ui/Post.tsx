const Post = ({ children: content }: { children: string }) => {
  return (
    <article
      className="prose lg:prose-xl px-8 m-auto my-4 sm:my-16"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default Post;
