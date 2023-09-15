import { Flex } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

const Body = ({ children }: PropsWithChildren) => {
  return (
    <Flex
      as="main"
      backgroundColor="#fff"
      borderRadius="20px 20px 0 0"
      height="calc(100% - 50px)"
      minHeight="calc(100vh - 50px)"
      padding="30px 50px"
      width="100%"
    >
      {children}
    </Flex>
  );
};

export default Body;
