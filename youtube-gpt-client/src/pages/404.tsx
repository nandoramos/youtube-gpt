import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <Flex
      width="100%"
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
        <Heading fontSize="60px" mb="20px" mt="40px">
          {t('notFoundPage.title')}
        </Heading>
        <Text mb="10px">{t('notFoundPage.subtitle')}</Text>
        <Link href="/">
          <Text color="#5893CE" fontWeight="400">
            {t('notFoundPage.cta')}
          </Text>
        </Link>
    </Flex>
  );
};

export default NotFound;

export const getStaticProps: GetStaticProps = async (context) => {
  let { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en')),
    },
  };
};
