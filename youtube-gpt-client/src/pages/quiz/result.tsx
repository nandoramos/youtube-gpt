import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import QuizResult from '@/components/quiz/result';
import { QuizPageResultProps } from '@/types';

const QuizPage = ({ questions, correct, wrong }: QuizPageResultProps) => {
  return <QuizResult questions={questions} correct={correct} wrong={wrong} />;
};

export default QuizPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  let { locale } = context;
  const { questions, correct, wrong } = context.query;

  if (!questions || !correct || !wrong) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en')),
      ...context.query,
    },
  };
};
