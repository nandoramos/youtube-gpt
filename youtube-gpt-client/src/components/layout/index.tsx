import { Flex } from '@chakra-ui/react';
import { ReactElement } from 'react';

interface AppLayoutInterface {
  children?: ReactElement;
}

function Navbar() {
  return (
    <Flex bg="#5893CE" h="45px" padding="0px 20px" alignItems="center">
      <>HEADER</>
    </Flex>
  );
}

function Footer() {
  return <></>;
}

export default function Layout({ children }: AppLayoutInterface) {
  return (
    <Flex direction="column">
      <Navbar />
      <main
        style={{
          backgroundColor: '#fff',
          width: '100%',
          borderRadius: '20px 20px 0 0 ',
        }}
      >
        {children}
      </main>

      <Footer />
    </Flex>
  );
}
