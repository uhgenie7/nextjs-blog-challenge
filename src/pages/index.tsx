import Head from 'next/head';
import Layout from '@src/components/ui/Layout';
import Container from '@src/components/ui/Container';
import { getAllPostsData } from '@src/utils/getPosts';
import Posts from '@src/components/ui/Posts';
import { SWRConfig } from 'swr';
import type { Fallback } from '@src/types/swr';
import Link from 'next/link';
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
      <div className="mt-16 text-center">
        <Link href={'/posts/write'}>
          <a className="center w-full cursor-pointer bg-pink-500/75 p-2 hover:bg-pink-700 hover:text-gray-50">
            글쓰기
          </a>
        </Link>
      </div>
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
