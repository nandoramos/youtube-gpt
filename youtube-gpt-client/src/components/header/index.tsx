import { Button, Flex, Heading, IconButton, Switch } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/header/languageSwitcher';
import Link from 'next/link';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useState } from 'react';

const Header = () => {
  const { t } = useTranslation('menu');
  const [display, changeDisplay] = useState('none');
  return (
    <>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        padding="15px 50px"
        color="#fff"
        height="60px"
        display={['none', 'flex']}
      >
        <Heading size="md">
          <Link href="/">Youtube GPT</Link>
        </Heading>
        <Flex gap="20px" fontSize="20px">
          <Link href="/how-it-works">{t('howItWorks')}</Link>
          <Link href="/team">{t('team')}</Link>
          <LanguageSwitcher />
        </Flex>
      </Flex>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        padding="15px 0px 15px 10px;"
        color="#fff"
        height="60px"
        width="100%"
        display={['flex', 'none']}
      >
        <Heading size="md">
          <Link href="/">Youtube GPT</Link>
        </Heading>
        <IconButton
          aria-label="Open Menu"
          size="lg"
          mr={2}
          icon={<HamburgerIcon />}
          onClick={() => changeDisplay('flex')}
          display={['flex', 'flex', 'none', 'none']}
        />
      </Flex>
      <Flex
        minW="100%"
        display={display}
        zIndex={20}
        h="100vh"
        pos="fixed"
        top="0"
        left="0"
        overflowY="auto"
        bg="#5893CE"
        color="#FFF"
        flexDir="column"
      >
        <Flex justify="flex-end">
          <IconButton
            mt={2}
            mr={2}
            aria-label="Close Menu"
            size="lg"
            icon={<CloseIcon />}
            onClick={() => changeDisplay('none')}
          />
        </Flex>

        <Flex
          flexDir="column"
          justifyContent="start"
          align="start"
          paddingLeft="20px"
          fontWeight="500"
          fontSize="20px"
          gap="20px"
        >
          <Link href="/" onClick={() => changeDisplay('none')}>
            {t('home')}
          </Link>
          <Link href="/how-it-works" onClick={() => changeDisplay('none')}>
            {t('howItWorks')}
          </Link>
          <Link href="/team" onClick={() => changeDisplay('none')}>
            {t('team')}
          </Link>
          <Flex w="100%" justifyContent="center">
            <LanguageSwitcher />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Header;
