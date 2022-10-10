import { useEffect } from 'react';
import Prism from 'prismjs';

const Post = ({ children: content }: { children: string }) => {
  useEffect(() => {
    const highlight = async () => {
      await Prism.highlightAll(); // <--- prepare Prism
    };
    highlight(); // <--- call the async function
  }, [content]);

  return (
    <div
      className="prose m-auto my-4 sm:my-16 lg:prose-xl"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default Post;
