import Head from 'next/head';
import Layout from '@src/components/ui/Layout';
import Container from '@src/components/ui/Container';
import { getAllPostsData } from '@src/utils/getPosts';
import Posts from '@src/components/ui/Posts';
import type { IAllPosts } from '@src/types/post';
import useSWR, { useSWRConfig } from 'swr';
import { GET_ALL_POSTS } from '@src/constants';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home = ({ fallback }) => {
  // const { cache, mutate, ...extraConfig } = useSWRConfig();
  const { data, error } = useSWR(GET_ALL_POSTS, fetcher, {
    fallbackData: fallback,
  });

  // const { data, error } = useSWR('/api/posts', fetcher);

  console.log(data);
  if (!data) return <div>로딩중..</div>;
  if (error) {
    console.error(error);
    return <div>에러</div>;
  }

  return (
    <Layout>
      <Head>
        <title>Next.js Blog Challenge</title>
      </Head>
      <Container>
        <Posts allPosts={data.allPosts} />
      </Container>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const allPosts = getAllPostsData(['title', 'description', 'date', 'slug']);

  return {
    props: {
      // allPosts,
      fallback: {
        GET_ALL_POSTS: allPosts,
      },
    },
  };
};

export default Home;
