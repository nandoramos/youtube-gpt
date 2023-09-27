import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';

const QuizIndex = () => {
  return (
    <>
      <Head>
        <title>Youtube GPT - Quiz</title>
      </Head>

      <>TODO ADD, QUIZ NOT FOUND COMPONENT</>
    </>
  );
};

export default QuizIndex;

export const getStaticProps: GetStaticProps = async (context) => {
  let { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en')),
    },
  };
};
