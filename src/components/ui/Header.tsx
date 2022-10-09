import Link from 'next/link';

const Header = () => {
  return (
    <header className="relative mb-3 flex flex-wrap items-center justify-between bg-pink-500 px-2 py-3">
      <h1 className="mt-0 mb-2 text-3xl font-normal leading-normal text-white">
        <Link href="/">
          <a>Next.js Blog</a>
        </Link>
      </h1>
    </header>
  );
};

export default Header;
