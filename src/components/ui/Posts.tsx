import type { IAllPosts } from '@src/types/post';
import SimplePost from './SimplePost';

const Posts = ({ allPosts }: IAllPosts) => {
  return (
    <section>
      <ul>
        {allPosts &&
          allPosts.map(({ ...props }) => (
            <SimplePost key={props.slug} {...props} />
          ))}
      </ul>
    </section>
  );
};

export default Posts;
