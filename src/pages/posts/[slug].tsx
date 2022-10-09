import Layout from '@src/components/ui/Layout';
import { getPostBySlug, getAllPostsData } from '@src/utils/getPosts';
import remarkHtml from '@src/utils/remarkHtml';
import type { IPost } from '@src/types/post';

interface IParams {
  params: { slug: string };
}

const Post = ({ postData }: IPost) => {
  return (
    <Layout>
      <h2>{postData.title}</h2>
      <em>{postData.date}</em>
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.description }} />
    </Layout>
  );
};

export default Post;

export async function getStaticProps({ params }: IParams) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'description',
  ]);

  const contentHtml = await remarkHtml(post.description);

  return {
    props: {
      postData: {
        ...post,
        contentHtml,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPostsData(['slug']);

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
