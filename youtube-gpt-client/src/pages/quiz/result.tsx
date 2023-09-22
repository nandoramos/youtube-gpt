import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import QuizResult from '@/components/quiz/result';
import { QuizPageResultProps } from '@/types';

const QuizPage = ({ questions, correct, wrong, time }: QuizPageResultProps) => {
  return (
    <>
      <Head>
        <title>Youtube GPT - Quiz</title>
      </Head>
      <QuizResult
        questions={questions}
        correct={correct}
        wrong={wrong}
        time={time}
      />
    </>
  );
};

export default QuizPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  let { locale } = context;
  const { questions, correct, wrong, time } = context.query;
  if (!questions || !correct || !wrong || !time) {
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
