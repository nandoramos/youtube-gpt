import { Button, Flex, Input, Text } from '@chakra-ui/react';
import SearchLearnQuizIcon from '../searchLearnQuizIcon';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { getSummaryFromLink } from '@/services/videoProcessing';

const SearchLearnQuiz = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const router = useRouter();
  const { t } = useTranslation('home');

  const youtubeRegex = /^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.be)\/.+$/;

  const handleSubmit = async () => {
    const res = getSummaryFromLink(videoUrl);

    if (!res.ok) {
      alert('Something went wrong, please try again.');
      setVideoUrl('');
      return;
    }

    // IF SUCCESS REDIRECT TO VIDEO SUMMARY WITH RESPONSE FROM API
    router.push(
      { pathname: '/video-summary', query: res.data },
      '/video-summary',
    );
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
      <Flex width="80%" alignSelf="center" alignItems="center">
        <Input
          type="url"
          placeholder={t('placeholder')}
          padding="0 20px"
          variant="unstyled"
          style={{
            backgroundColor: '#F5F5F5',
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
          isDisabled={!videoUrl.match(youtubeRegex)}
          onClick={handleSubmit}
        >
          {t('start')}
        </Button>
      </Flex>
    </Flex>
  );
};

export default SearchLearnQuiz;
