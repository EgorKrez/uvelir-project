import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { fetchJwt } from '../utils/auth.utils';
import { ProvideCurrentHref } from '../utils/hooks/current-href.hook';
import { ProvideUser } from '../utils/hooks/user.hook';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (process.browser) {
      fetchJwt();
    }
  });

  return <ProvideCurrentHref>
    <ProvideUser value={{} as any}>
      <Component {...pageProps} />
    </ProvideUser>
  </ProvideCurrentHref>;
}
