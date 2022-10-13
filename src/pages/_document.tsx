import { Html, Head, Main, NextScript } from 'next/document';
import Meta from '@src/components/Meta';

export default function Document() {
  return (
    <Html lang="ko" className="leading-tight text-gray-900">
      <Head>
        <Meta />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
