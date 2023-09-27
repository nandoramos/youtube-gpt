import { getAllSummaries } from '@/services/videoProcessing';
import { SummaryData } from '@/types';
import { Card, CardBody, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

interface Props {
  summaries: SummaryData[];
}

const VideoSummaryList = ({ summaries }: Props) => {
  const { t } = useTranslation('videoSummary');

  return (
    <Flex direction="column" width="100%" gap="30px" alignItems="center">
      <Heading textAlign="center" color="#0E6CCB">{t('title')}</Heading>
      {summaries.map((summary: SummaryData) => (
        <Link
          key={summary.id}
          href={`/video-summary/${summary.videoId}`}
          style={{ width: '80%' }}
        >
          <Card _hover={{ boxShadow: '0 2px 6px rgba(0, 0, 0, .2)' }}>
            <CardBody>
              <Flex gap="30px">
                <Image
                  height={'150px'}
                  objectFit="cover"
                  src={`https://img.youtube.com/vi/${summary.videoId}/0.jpg`}
                  fallbackSrc="https://via.placeholder.com/150"
                  alt="summary preview image"
                />
                <Flex direction="column" gap="10px">
                  <Heading as="h3" fontSize="20px">
                    {summary.title}
                  </Heading>
                  <Text noOfLines={5}>{summary.text}</Text>
                </Flex>
              </Flex>
            </CardBody>
          </Card>
        </Link>
      ))}
    </Flex>
  );
};

export default VideoSummaryList;

export const getServerSideProps: GetServerSideProps = async (context) => {
  let { locale } = context;
  const summaries = await getAllSummaries();
  const newProps = {
    ...(await serverSideTranslations(locale ?? 'en')),
    summaries,
  };

  return {
    props: { ...newProps },
  };
};
