import Head from 'next/head';
import Layout from '@src/components/ui/Layout';
import Container from '@src/components/ui/Container';
import { getAllPosts } from '@src/utils/getAllPosts';
import Posts from '@src/components/ui/Posts';
import type { IAllPosts } from '@src/types/post';

const Home = ({ allPosts }: IAllPosts) => {
  return (
    <Layout>
      <Head>
        <title>Next.js Blog Challenge</title>
      </Head>
      <Container>
        <Posts allPosts={allPosts} />
      </Container>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const allPosts = getAllPosts(['title', 'date', 'description', 'slug']);

  return {
    props: { allPosts },
  };
};

export default Home;
