import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import SearchLearnQuiz from '@/components/searchLearnQuiz';
import { Flex } from '@chakra-ui/react';

const Home = () => {
  return (
    <Flex justifyContent="center" alignItems="center" width="100%">
      <SearchLearnQuiz />
    </Flex>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  let { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en')),
    },
  };
};
