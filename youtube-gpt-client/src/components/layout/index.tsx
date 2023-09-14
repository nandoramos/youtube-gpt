import { Flex } from '@chakra-ui/react';
import Header from '../header';
import MainContent from '../mainContent';
import { PropsWithChildren } from '@/types';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Flex direction="column" width="100vw" height="100vh">
      <Header />
      <MainContent>{children}</MainContent>
    </Flex>
  );
};

export default Layout;
