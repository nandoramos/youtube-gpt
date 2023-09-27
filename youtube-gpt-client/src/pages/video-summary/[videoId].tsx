import { getSummaryByVideoId } from '@/services/videoProcessing';
import { SummaryData } from '@/types';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { GetServerSideProps, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

interface Props {
  summaryData: SummaryData;
}

const VideoSummaryDetail = ({ summaryData }: Props) => {
  const { t } = useTranslation('videoSummary');
  const router = useRouter();

  const handleCancel = () => {
    router.push('/');
  };

  const handleStartQuiz = () => {
    router.push(`/quiz/${summaryData.videoId}`);
  };

  return (
    <Flex gap="50px">
      <Flex maxWidth="720px" width="100%" direction="column">
        <iframe
          width="100%"
          height="315"
          src={`https://www.youtube.com/embed/${summaryData.videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        <Flex justifyContent="flex-end" gap="20px" marginTop="20px">
          <Box
            as="button"
            backgroundColor="rgba(0, 122,  255, .1)"
            color="#5893CE"
            textTransform="uppercase"
            padding="10px 25px"
            borderRadius="10px"
            fontWeight="bold"
            _hover={{ boxShadow: '0 2px 6px rgba(0, 0, 0, .3)' }}
            onClick={handleCancel}
          >
            {t('cancel')}
          </Box>
          <Box
            as="button"
            backgroundColor="#5893CE"
            color="#ffffff"
            textTransform="uppercase"
            padding="10px 25px"
            borderRadius="10px"
            fontWeight="bold"
            _hover={{ boxShadow: '0 2px 6px rgba(0, 0, 0, .5)' }}
            onClick={handleStartQuiz}
          >
            {t('startQuiz')}
          </Box>
        </Flex>
      </Flex>
      <Flex direction="column" gap="30px">
        <Heading as="h3" textAlign="center" color="#0E6CCB">
          {t('videoSummary')}
        </Heading>
        <Text>{summaryData.summary}</Text>
      </Flex>
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
