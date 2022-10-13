import Head from 'next/head';
import Layout from '@src/components/ui/Layout';
import Container from '@src/components/ui/Container';
import { getAllPostsData } from '@src/utils/getPosts';
import Posts from '@src/components/ui/Posts';
import type { IAllPosts } from '@src/types/post';
import useSWR, { useSWRConfig } from 'swr';

const Home = ({ allPosts }: IAllPosts) => {
  // const { cache, mutate, ...extraConfig } = useSWRConfig();
  // console.log(cache);
  // const { data } = useSWR('/api/allPosts', {
  //   fetcher: undefined,
  //   fallbackData: allPosts,
  // });

  return (
    <Layout>
      <Head>
        <title>Next.js Blog Challenge</title>
      </Head>
      <Container>
        {
          // data &&
          <Posts allPosts={allPosts} />
        }
      </Container>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const allPosts = getAllPostsData(['title', 'description', 'date', 'slug']);

  return {
    props: {
      allPosts,
    },
  };
};

export default Home;
