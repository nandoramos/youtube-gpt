import { Flex, Heading, Link } from '@chakra-ui/react';

const Header = () => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      padding="15px 50px"
      color="#fff"
      height="50px"
    >
      <Heading size="md">
        <Link href="/">Youtube GPT</Link>
      </Heading>
      <Flex gap="20px">
        <Link href="/how-it-works">How it works</Link>
        <Link href="/team">Team</Link>
      </Flex>
    </Flex>
  );
};

export default Header;
