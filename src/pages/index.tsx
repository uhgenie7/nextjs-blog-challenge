import Head from 'next/head';
import Layout from '@src/components/ui/Layout';
import Container from '@src/components/ui/Container';
import { getAllPostsData } from '@src/utils/getPosts';
import Posts from '@src/components/ui/Posts';
import { SWRConfig } from 'swr';
import type { Fallback } from '@src/types/swr';

const Home = ({ fallback }: Fallback) => {
  return (
    <Layout>
      <Head>
        <title>Next.js Blog Challenge</title>
      </Head>
      <Container>
        <SWRConfig value={{ fallback }}>
          <Posts />
        </SWRConfig>
      </Container>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const allPosts = getAllPostsData();

  return {
    props: {
      fallback: {
        '/api/posts': allPosts,
      },
    },
  };
};

export default Home;
