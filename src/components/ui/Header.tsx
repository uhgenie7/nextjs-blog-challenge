import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const Header = () => {
  // 초기 함수를 주면 lazy하게 발생.
  // lazy하다는 것은 로컬을 읽어왔을 때 읽어온 후에 서버사이드에서 동작하게 한다.
  const [theme, setTheme] = useState(() =>
    typeof window !== 'undefined'
      ? localStorage.getItem('theme') === 'dark'
        ? 'dark'
        : 'light'
      : 'light'
  );

  useEffect(() => {
    const body = document.querySelector('body') as HTMLBodyElement;
    if (theme === 'dark') {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }
  }, [theme]);

  const handleClick = () => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      localStorage.setItem('theme', 'light');
      setTheme('light');
    } else {
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    }
  };

  return (
    <header className="relative mb-3 flex flex-wrap items-center justify-between bg-pink-500 px-2 py-3">
      <h1 className="mt-0 mb-2 text-3xl font-normal leading-normal text-white">
        <Link href="/">
          <a>Next.js Blog</a>
        </Link>
      </h1>
      <button className="w-12 px-2" onClick={handleClick}>
        {theme === 'dark' ? (
          <Image width={32} height={32} src="/light-mode.svg" alt="light" />
        ) : (
          <Image width={32} height={32} src="/dark-mode.svg" alt="dark" />
        )}
      </button>
    </header>
  );
};

export default Header;
