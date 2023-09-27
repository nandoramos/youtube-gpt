import { Button, Flex, Input, Spinner, Text } from '@chakra-ui/react';
import SearchLearnQuizIcon from '../searchLearnQuizIcon';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { getSummaryFromLink } from '@/services/videoProcessing';
import { YOUTUBE_REGEX } from '@/utils/constants';

const SearchLearnQuiz = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);
  const router = useRouter();
  const { t } = useTranslation('home');

  const handleSubmit = async () => {
    setShowSpinner(true);
    const summary = await getSummaryFromLink(videoUrl);
    setShowSpinner(false);

    // IF SUCCESS REDIRECT TO VIDEO SUMMARY WITH RESPONSE FROM API
    router.push(
      { pathname: `/video-summary/${summary.videoId}`, query: summary },
      `/video-summary/${summary.videoId}`,
    );
  };

  const isInputValid = useMemo(
    () => !videoUrl.match(YOUTUBE_REGEX) && videoUrl !== '',
    [videoUrl],
  );
  const OverlaySpinner = () => {
    if (showSpinner) {
      return (
        <Flex
          position="fixed"
          top="0"
          right="0"
          bottom="0"
          left="0"
          alignItems="center"
          justifyContent="center"
          backgroundColor="rgba(0, 0, 0, 0.3)" // semi-transparent white
          zIndex="1000"
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      );
    }
  };

  return (
    <Flex width="700px" direction="column" margin="0 auto">
      <Flex gap="30px">
        <SearchLearnQuizIcon />
        <Flex direction="column" fontSize="70px" fontWeight="bold">
          <Text>{t('search')}</Text>
          <Text>{t('learn')}</Text>
          <Text>{t('quiz')}</Text>
        </Flex>
      </Flex>
      <Flex width="90%" alignSelf="end" alignItems="center" position="relative">
        <Input
          type="url"
          placeholder={t('placeholder')}
          padding="0 20px"
          variant="unstyled"
          style={{
            backgroundColor: '#F5F5F5',
            boxShadow: isInputValid ? '0 1px 4px rgb(200, 0, 0, .5)' : '',
            borderRadius: '20px',
            border: '2px solid #fff',
            zIndex: 2,
            boxSizing: 'content-box',
            height: '40px',
            width: '70%',
          }}
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.currentTarget.value)}
        />
        <Button
          variant="unstyled"
          style={{
            backgroundColor: '#5893CE',
            borderRadius: '20px',
            padding: '0 30px 0 40px',
            marginLeft: '-30px',
            zIndex: 1,
            height: '40px',
            color: '#fff',
            textTransform: 'uppercase',
          }}
          isDisabled={isInputValid || !videoUrl || showSpinner}
          onClick={handleSubmit}
        >
          {t('start')}
        </Button>
        {isInputValid && (
          <Text
            fontSize="10px"
            padding="5px 10px"
            color="rgb(200, 0, 0, .6)"
            position="absolute"
            top="42px"
            left="10px"
          >
            {t('inputInvalidMessage')}
          </Text>
        )}
      </Flex>
      <OverlaySpinner />
    </Flex>
  );
};

export default SearchLearnQuiz;
