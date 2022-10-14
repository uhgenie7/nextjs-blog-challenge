import PreviewPost from './PreviewPost';
import useSWR from 'swr';
import { fetcher } from '@src/utils/fetcher';
import type { IPreviewPost } from '@src/types/post';
const Posts = () => {
  const { data: allPosts, error } = useSWR<IPreviewPost[]>(
    '/api/posts',
    fetcher
  );

  if (error) {
    console.error(error);
    return <div>에러</div>;
  }

  if (!allPosts && !error) return <div>로딩중..</div>;

  return (
    <section className='flex justify-center'>
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
