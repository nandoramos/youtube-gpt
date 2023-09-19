import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '@/components/layout';
import { appWithTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

const App = ({ Component, pageProps }: AppProps) => {
  const [isClientLoaded, setIsClientLoaded] = useState(false);

  useEffect(() => {
    setIsClientLoaded(true);
  }, []);

  return (
    <ChakraProvider>
      <Layout isClientLoaded={isClientLoaded}>
        <Component {...pageProps} suppressHydrationWarning />
      </Layout>
    </ChakraProvider>
  );
};

export default appWithTranslation(App);
