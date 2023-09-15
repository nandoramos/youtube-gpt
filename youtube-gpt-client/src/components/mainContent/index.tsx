import { Flex } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

const MainContent: typeof Flex = ({ children }: PropsWithChildren) => {
  return (
    <Flex alignSelf="center" width="100%" height="100%">
      {children}
    </Flex>
  );
};

export default MainContent;
