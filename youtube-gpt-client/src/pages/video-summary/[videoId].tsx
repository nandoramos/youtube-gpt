import { getSummaryByVideoId } from '@/services/videoProcessing';
import { SummaryData } from '@/types';
import { GetServerSideProps, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Spinner,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface Props {
  summaryData: SummaryData;
}

const VideoSummaryDetail = () => {
  const { t, i18n } = useTranslation('videoSummary');
  const router = useRouter();
  const [summaryData, setSummaryData] = useState<SummaryData>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const videoId = router.query.videoId;

  const handleCancel = () => {
    router.push('/');
  };

  const handleStartQuiz = () => {
    router.push(`/quiz/${videoId}`);
  };

  const getSummary = async () => {
    setIsLoading(true);

    const apiRoute = `/api/summary?${new URLSearchParams({
      videoId: videoId as string,
      lang: i18n?.language,
    })}`;
    const response = await fetch(apiRoute);
    const summary = await response.json();

    if (!summary) {
      setError(true);
    }

    setSummaryData(summary);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!videoId) {
      setError(true);
    }

    getSummary();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  return (
    <Container maxW={'7xl'}>
      <Stack
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        alignItems={'flex-start'}
        direction={{ base: 'column', md: 'row' }}
      >
        <Flex
          flex={1}
          justify={'center'}
          align={'center'}
          position={'relative'}
          w={'full'}
        >
          <Box
            position={'relative'}
            height={'400px'}
            rounded={'2xl'}
            boxShadow={'2xl'}
            width={'full'}
            overflow={'hidden'}
          >
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </Box>
        </Flex>
        {error ? (
          <Flex
            flex={1}
            alignSelf="center"
            justifyContent="center"
            width="100%"
          >
            <Text>Something went wrong</Text>
          </Flex>
        ) : (
          <Stack
            flex={1}
            width="100%"
            spacing={{ base: 5, md: 10 }}
            alignSelf={isLoading ? 'center' : ''}
            alignItems={isLoading ? 'center' : ''}
          >
            {isLoading ? (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            ) : (
              <>
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: '2xl', sm: '3xl', lg: '4xl' }}
                >
                  <Text
                    as={'span'}
                    position={'relative'}
                    _after={{
                      content: "''",
                      width: 'full',
                      height: '30%',
                      position: 'absolute',
                      bottom: 1,
                      left: 0,
                      bg: 'red.400',
                      zIndex: -1,
                    }}
                  >
                    {summaryData?.title}
                  </Text>
                </Heading>
                <Text color={'gray.500'}>{summaryData?.summary}</Text>
                <Stack
                  spacing={{ base: 4, sm: 6 }}
                  direction={{ base: 'column', sm: 'row' }}
                >
                  <Button
                    rounded={'full'}
                    size={'lg'}
                    fontWeight={'normal'}
                    px={6}
                    colorScheme={'red'}
                    bg={'#5893CE'}
                    _hover={{ bg: 'red.500' }}
                    onClick={handleStartQuiz}
                  >
                    {t('startQuiz')}
                  </Button>
                  <Button
                    rounded={'full'}
                    size={'lg'}
                    fontWeight={'normal'}
                    px={6}
                    onClick={handleCancel}
                  >
                    {t('cancel')}
                  </Button>
                </Stack>
              </>
            )}
          </Stack>
        )}
      </Stack>
    </Container>
  );
};

export default VideoSummaryDetail;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;

  return {
    props: { ...(await serverSideTranslations(locale ?? 'en')) },
  };
};
