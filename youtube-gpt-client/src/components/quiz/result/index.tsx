import BronzeMedalIcon from '@/resources/svg/BronzeMedalIcon';
import SilverMedalIcon from '@/resources/svg/SilverMedalIcon';
import TrophyStarIcon from '@/resources/svg/TrophyStarIcon';
import { QuizPageResultProps } from '@/types';
import { Flex, Text, Button, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const QuizResult = ({ questions, correct, time }: QuizPageResultProps) => {
  const { t } = useTranslation('quiz');
  const router = useRouter();

  const userHasCorrectAnswer =
    questions !== undefined && correct !== undefined && correct > 0;
  const percentageBreakPoint = 0.5;

  const handleCancel = () => {
    router.push('/');
  };

  const handleStartQuiz = () => {
    router.back();
  };

  const GetResultTitle = () => {
    if (userHasCorrectAnswer) {
      if (correct === questions) {
        return t('result.youRock');
      }

      if (correct >= questions * percentageBreakPoint) {
        return t('result.niceWork');
      }

      if (correct <= questions * percentageBreakPoint) {
        return t('result.niceTry');
      }
    }
    return t('result.unlucky');
  };
  const GetResultIcon = () => {
    if (userHasCorrectAnswer) {
      if (correct === questions) {
        return <TrophyStarIcon />;
      }

      if (correct >= questions * percentageBreakPoint) {
        return <SilverMedalIcon />;
      }

      if (correct <= questions * percentageBreakPoint) {
        return <BronzeMedalIcon />;
      }
    }
    return <></>;
  };
  return (
    <Flex flexDirection="column" gap="23px" alignItems="center" margin="0 auto">
      <Text
        textAlign="center"
        fontWeight="700"
        fontSize="30px"
        lineHeight="45px"
        letterSpacing="0.3"
      >
        <GetResultTitle />
      </Text>

      <GetResultIcon />

      <Text
        textAlign="center"
        fontWeight="500"
        fontSize="20px"
        lineHeight="30px"
        whiteSpace="pre-line"
      >
        {userHasCorrectAnswer
          ? t('result.subTitle', {
              score: correct,
              questions,
            })
          : t('result.subTitleFailure')}
      </Text>
      <Text
        textAlign="center"
        fontWeight="500"
        fontSize="20px"
        lineHeight="30px"
        marginBottom="15px"
      >
        {t('result.time', {
          time,
        })}
      </Text>
      <Flex flexDirection="row" gap="16px" alignItems="center">
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
            {t('result.tryAgain')}
          </Button>
          <Button
            rounded={'full'}
            size={'lg'}
            fontWeight={'normal'}
            px={6}
            onClick={handleCancel}
          >
            {t('result.tryAnother')}
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default QuizResult;
