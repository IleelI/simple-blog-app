import { type AppType } from 'next/dist/shared/lib/utils';
import { Inter } from '@next/font/google';

import '../styles/globals.scss';
import { QueryClient, QueryClientProvider } from 'react-query';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--inter-font',
});

const queryClient = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    // Applying globaly Inter font family
    <QueryClientProvider client={queryClient}>
      <div className={inter.className}>
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  );
};

export default MyApp;
