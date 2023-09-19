import { Flex, Skeleton } from '@chakra-ui/react';
import Header from '@/components/header';
import MainContent from '@/components/mainContent';
import { PropsWithChildren } from '@/types';

const Layout = ({ children, isClientLoaded }: PropsWithChildren) => {
  if (!isClientLoaded) {
    return <Skeleton height="100vh" />;
  }

  return (
    <Flex direction="column" width="100vw" height="100vh">
      <Header />
      <MainContent>{children}</MainContent>
    </Flex>
  );
};

export default Layout;
