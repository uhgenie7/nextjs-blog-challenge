import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import 'prismjs/themes/prism-tomorrow.css';
import { SWRConfig } from 'swr';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        provider: () => new Map(),
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
