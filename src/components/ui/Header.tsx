import Link from 'next/link';

const Header = () => {
  return (
    <h1>
      <Link href="/">
        <a>Next.js Blog</a>
      </Link>
    </h1>
  );
};

export default Header;
