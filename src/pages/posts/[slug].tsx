import Layout from '@src/components/ui/Layout';
import { getPostBySlug, getAllPostsData } from '@src/utils/getPosts';
import remarkHtml from '@src/utils/remarkHtml';
import useSWR, { SWRConfig, useSWRConfig } from 'swr';
import { fetcher } from '@src/utils/fetcher';
import { useRouter } from 'next/router';
import type { Fallback } from '@src/types/swr';

interface IParams {
  params: { slug: string };
}

const PostContent = () => {
  const { cache } = useSWRConfig();
  const { query } = useRouter();
  const { data: post, error } = useSWR(
    `/api/posts/${query.slug || null}`,
    fetcher
  );

  const check = cache.get('/api/posts');
  console.log(check);

  if (error) {
    console.error(error);
    return <div>에러</div>;
  }

  if (!post && !error) return <div>로딩중..</div>;

  const { title, date, contentHtml } = post;

  return (
    <Layout>
      <article className="prose m-auto my-4 sm:my-16 lg:prose-xl">
        <h2 className="mt-0 mb-2 text-5xl font-normal leading-normal text-rose-800">
          {title}
        </h2>
        <em>{date}</em>
        <br />
        <div
          className="prose m-auto my-4 sm:my-16 lg:prose-xl"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>
    </Layout>
  );
};

// 실제 데이터를 가져옴
export async function getStaticProps({ params }: IParams) {
  const post = getPostBySlug(params.slug);
  const contentHtml = await remarkHtml(post.content || '');

  return {
    props: {
      fallback: {
        [`/api/posts/${params.slug}`]: {
          ...post,
          contentHtml,
        },
      },
    },
  };
}

// 목록을 배열로 가져옴
export async function getStaticPaths() {
  const posts = getAllPostsData();

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}

const PostDetail = ({ fallback }: Fallback) => {
  return (
    <SWRConfig value={{ fallback }}>
      <PostContent />
    </SWRConfig>
  );
};

export default PostDetail;
