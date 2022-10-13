import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import 'prismjs/themes/prism-tomorrow.css';
import { SWRConfig } from 'swr';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        provider: () => new Map(),

        onError: (error, key) => {
          if (error.status !== 403 && error.status !== 404) {
            console.error('에러발생');
          }
        },
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
