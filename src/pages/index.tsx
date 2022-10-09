import Head from 'next/head';
import Layout from '@src/components/ui/Layout';
import Container from '@src/components/ui/Container';
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

export default Home;
