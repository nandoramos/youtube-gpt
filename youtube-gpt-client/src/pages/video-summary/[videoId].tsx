import { getSummaryByVideoId } from '@/services/videoProcessing';
import { SummaryData } from '@/types';
import { Flex, Heading, Text } from '@chakra-ui/react';
import { GetServerSideProps, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface Props {
  summaryData: SummaryData;
}

const VideoSummaryDetail = ({ summaryData }: Props) => {
  console.log(summaryData)
  return (
    <Flex direction="column">
      <Flex justifyContent="center">
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${summaryData.videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </Flex>
      <Heading>{summaryData.title}</Heading>
      <Text>{summaryData.text}</Text>
    </Flex>
  );
};

export default VideoSummaryDetail;

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
