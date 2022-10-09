import Layout from '@src/components/ui/Layout';
import Link from 'next/link';
const NotFound = () => {
  return (
    <Layout>
      <div>
        <h1>404 - Page Not Found</h1>
        <p>
          <Link href="/">홈으로 가기</Link>
        </p>
      </div>
    </Layout>
  );
};

export default NotFound;
