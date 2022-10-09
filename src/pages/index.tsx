import Head from 'next/head';
import Layout from '@src/components/ui/Layout';
import Container from '@src/components/ui/Container';

const Home = () => {
  return (
    <Layout>
      <Head>
        <title>Next.js Blog Challenge</title>
      </Head>
      <Container></Container>
    </Layout>
  );
};

export default Home;
