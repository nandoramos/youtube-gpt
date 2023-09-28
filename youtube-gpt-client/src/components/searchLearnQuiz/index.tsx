import { Button, Flex, Input, Spinner, Text } from '@chakra-ui/react';
import SearchLearnQuizIcon from '../searchLearnQuizIcon';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { YOUTUBE_REGEX } from '@/utils/constants';
import { getIdFromYoutubeVideoUrl } from '@/utils';

const SearchLearnQuiz = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);
  const router = useRouter();
  const { t } = useTranslation('home');

  const handleSubmit = async () => {
    const videoId = await getIdFromYoutubeVideoUrl(videoUrl);

    router.push(`/video-summary/${videoId}`);
  };

  const isInputValid = useMemo(
    () => !videoUrl.match(YOUTUBE_REGEX) && videoUrl !== '',
    [videoUrl],
  );

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
    </Flex>
  );
};

export default SearchLearnQuiz;
