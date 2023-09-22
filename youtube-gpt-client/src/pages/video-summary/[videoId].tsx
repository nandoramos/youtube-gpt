import { getSummaryFromLink } from '@/services/videoProcessing';
import { SummaryData } from '@/types';
import { Flex, Heading, Text } from '@chakra-ui/react';
import { GetServerSideProps, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';

interface Props {
  summaryData: SummaryData;
}

const VideoSummaryDetail = ({ summaryData }: Props) => {

  return (
    <Flex direction="column">
      <Heading>Youtube video</Heading>
      <Link href={summaryData.youtubeUrl as string}>
        {summaryData.youtubeUrl}
      </Link>
      <Heading>Summary</Heading>
      <Text>{summaryData.summary}</Text>
    </Flex>
  );
};

export default VideoSummaryDetail;

export const getServerSideProps: GetServerSideProps = async (context) => {
  let { locale } = context;
  const response = await getSummaryFromLink('https://www.youtube.com/watch?v=jqexpuWDQxI');
  const summaryData = { ...response.data };
  const newProps = {
    ...(await serverSideTranslations(locale ?? 'en')),
    summaryData,
  };

  return {
    props: {...newProps},
  };
};
