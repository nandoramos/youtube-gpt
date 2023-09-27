import Quiz from '@/components/quiz';
import { getSummaryByVideoId } from '@/services/videoProcessing';
import { SummaryData } from '@/types';
import { GetServerSideProps, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

interface Props {
  summaryData: SummaryData;
}

const QuizVideoDetail = ({ summaryData }: Props) => {
  const { t } = useTranslation('quiz');

  // AGREGAR UN IF ACA DE QUE SI NO HAY QUIZ, MOSTRAR EL MISMO COMPONENTE DE NO QUIZ QUE EN EL INDEX
  // este doble parse está rarísimo pero funciona, hay que revisarlo
  return <Quiz quizQuestions={JSON.parse(JSON.parse(summaryData.quiz))} />;
};

export default QuizVideoDetail;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  const videoId = context?.params?.videoId as string;

  const summaryData = await getSummaryByVideoId(videoId);
  const newProps = {
    ...(await serverSideTranslations(locale ?? 'en')),
    summaryData,
  };

  return {
    props: { ...newProps },
  };
};
