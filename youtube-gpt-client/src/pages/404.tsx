import { Box, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';

const NotFound = () => {
  return (
    <Box>
      <Heading as="h2">Not Found</Heading>
      <Text>Could not find requested resource</Text>
      <Link href="/">Return Home</Link>
    </Box>
  );
};

export default NotFound;
