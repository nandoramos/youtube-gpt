import { Flex } from '@chakra-ui/react';
import Header from '../header';
import Body from '../body';
import { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Flex direction="column" width="100vw" min-height="100vh" padding="0">
      <Header />
      <Body>{children}</Body>
    </Flex>
  );
};

export default Layout;
