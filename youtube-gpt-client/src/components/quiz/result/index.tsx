import BronzeMedalIcon from '@/resources/svg/BronzeMedalIcon';
import SilverMedalIcon from '@/resources/svg/SilverMedalIcon';
import TrophyStarIcon from '@/resources/svg/TrophyStarIcon';
import { QuizPageResultProps } from '@/types';
import { Flex, Text, Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const QuizResult = ({ questions, correct }: QuizPageResultProps) => {
  const { t } = useTranslation('quiz');
  const userHasCorrectAnswer =
    questions !== undefined && correct !== undefined && correct > 0;
  const percentageBreakPoint = 0.5;

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
    <Flex flexDirection="column" gap="23px" alignItems="center">
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
        lineHeight="45px"
        letterSpacing="0.3"
        whiteSpace="pre-line"
      >
        {userHasCorrectAnswer
          ? t('result.subTitle', {
              score: correct,
              questions,
            })
          : t('result.subTitleFailure')}
      </Text>
      <Flex flexDirection="row" gap="16px" alignItems="center">
        {userHasCorrectAnswer && (
          <Button
            w="145px"
            fontSize="14px"
            color="#5893CE"
            bg="rgba(0, 122, 255, 0.10)"
            borderRadius="8px"
          >
            {t('result.shareResults')}
          </Button>
        )}
        <Button
          w="145px"
          fontSize="14px"
          bg="#5893CE"
          borderRadius="8px"
          color="#FFFFFF"
        >
          {t('result.tryAgain')}
        </Button>
      </Flex>
    </Flex>
  );
};

export default QuizResult;
