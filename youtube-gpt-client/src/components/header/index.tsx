import { Flex, Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/header/languageSwitcher';
import Link from 'next/link';

const Header = () => {
  const { t, i18n } = useTranslation('menu');
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      padding="15px 50px"
      color="#fff"
      height="60px"
    >
      <Heading size="md">
        <Link href="/">Youtube GPT</Link>
      </Heading>
      <Flex gap="20px" fontSize="20px">
        <Link href="/how-it-works" locale={i18n.language}>
          {t('howItWorks')}
        </Link>
        <Link href="/team" locale={i18n.language}>
          {t('team')}
        </Link>
        <LanguageSwitcher />
      </Flex>
    </Flex>
  );
};

export default Header;
