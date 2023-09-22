import { Flex } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

const MainContent = ({ children }: PropsWithChildren) => {
  return (
    <Flex
      as="main"
      width="100%"
      backgroundColor="#fff"
      borderRadius="20px 20px 0 0"
      minHeight="calc(100vh - 60px)"
      padding={['20px 10px', '55px 50px']}
    >
      {children}
    </Flex>
  );
};

export default MainContent;
