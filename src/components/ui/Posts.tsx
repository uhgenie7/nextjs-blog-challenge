import type { IAllPosts } from '@src/types/post';
import PreviewPost from './PreviewPost';

const Posts = ({ allPosts }: IAllPosts) => {
  return (
    <section className="flex justify-center">
      <ul>
        {allPosts &&
          allPosts.map(({ ...props }) => (
            <PreviewPost key={props.slug} {...props} />
          ))}
      </ul>
    </section>
  );
};

export default Posts;
