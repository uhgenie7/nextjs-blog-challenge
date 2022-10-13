import Head from 'next/head';

const Meta = () => {
  return (
    <>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="keywords" content="nextjs, 지니, 블로그" />
      <meta name="description" content="지니의 블로그 사이트" />
      <meta name="author" content="genie" />
      <meta property="og:title" content="지니의 블로그 사이트" />
      <meta property="og:site_name" content="genie blog" />
      <meta property="og:type" content="website" />
      <meta property="og:description" content="지니의 블로그 사이트" />
      <meta
        property="og:url"
        content="https://nextjs-blog-challenge.vercel.app/"
      />
      <meta
        property="og:image"
        content="https://user-images.githubusercontent.com/72803184/189064724-ad951731-ba1f-4227-8986-3dfe01234d08.png"
      />
      <link rel="canonical" href="https://nextjs-blog-challenge.vercel.app/" />
      <meta name="theme-color" content="rgb(236, 72, 153)" />
      <title>지니의 블로그 사이트</title>
    </>
  );
};

export default Meta;
