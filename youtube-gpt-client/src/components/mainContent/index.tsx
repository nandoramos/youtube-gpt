import { PropsWithChildren } from '@/types';
import { Box } from '@chakra-ui/react';

const MainContent = ({ children }: PropsWithChildren) => {
  return (
    <Box
      as="main"
      width="100%"
      backgroundColor="#fff"
      borderRadius="20px 20px 0 0"
      height="calc(100vh - 50px)"
      padding="30px 50px"
    >
      {children}
    </Box>
  );
};

export default MainContent;
