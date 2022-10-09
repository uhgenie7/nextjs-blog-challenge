import type { IAllPosts } from '@src/types/post';
import SimplePost from './SimplePost';

const Posts = ({ allPosts }: IAllPosts) => {
  return (
    <section>
      <div>
        {allPosts &&
          allPosts.map(({ ...props }) => (
            <SimplePost key={props.slug} {...props} />
          ))}
      </div>
    </section>
  );
};

export default Posts;
