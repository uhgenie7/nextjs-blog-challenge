import Layout from '@src/components/ui/Layout';
import { getPostBySlug, getAllPostsData } from '@src/utils/getPosts';
import remarkHtml from '@src/utils/remarkHtml';
import type { IPost } from '@src/types/post';
import Post from '@src/components/ui/Post';

interface IParams {
  params: { slug: string };
}

const PostDetail = ({ postData }: IPost) => {
  return (
    <Layout>
      <h2>{postData.title}</h2>
      <em>{postData.date}</em>
      <br />
      <Post>{postData.contentHtml}</Post>
    </Layout>
  );
};

export default PostDetail;

export async function getStaticProps({ params }: IParams) {
  const post = getPostBySlug(params.slug, ['title', 'date', 'slug', 'content']);

  const contentHtml = await remarkHtml(post.content || '');

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
