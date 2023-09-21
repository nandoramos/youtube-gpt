import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Quiz from '@/components/quiz';

const QuizPage = () => {
  return (
    <>
      <Head>
        <title>Youtube GPT - Quiz</title>
      </Head>

      <Quiz />
    </>
  );
};

export default QuizPage;

export const getStaticProps: GetStaticProps = async (context) => {
  let { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en')),
    },
  };
};
