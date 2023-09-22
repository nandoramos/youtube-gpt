import { QuestionResponse } from '@/types';
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import QuizItem from './quizItem';
import { getQuizQuestions } from '@/services/quiz';
import { useRouter } from 'next/router';

const Quiz = () => {
  const router = useRouter();
  const quizQuestions = getQuizQuestions();
  const [quizStatus, setQuizStatus] = useState<QuestionResponse[]>([]);
  const [tabIndex, setTabIndex] = useState(0);

  const displayResults = (results: QuestionResponse[]) => {
    router.push(
      {
        pathname: '/quiz/result',
        query: {
          questions: quizQuestions.length,
          correct: results.filter((w) => w.response).length,
          wrong: results.filter((w) => w.response !== true).length,
        },
      },
      '/quiz/result',
    );
  };

  const moveToNextQuestion = (
    questionIndex: number,
    quizResults: QuestionResponse[],
  ) => {
    const nextQuestion = questionIndex + 1;
    if (quizQuestions.length > nextQuestion) {
      setTabIndex(nextQuestion);
    } else {
      displayResults(quizResults);
    }
  };

  const selectAnswer = (questionIndex: number, correctAnswer: boolean) => {
    if (!canSelect(questionIndex)) return;

    const response = [
      ...(quizStatus || []),
      { questionIndex: questionIndex, response: correctAnswer },
    ];

    setQuizStatus(response);
    moveToNextQuestion(questionIndex, response);
  };

  const canSelect = (questionIndex: number) => {
    return (
      quizStatus !== undefined &&
      quizStatus !== null &&
      quizStatus.findIndex((w) => w.questionIndex === questionIndex) < 0
    );
  };

  return (
    <>
      <Tabs
        variant="soft-rounded"
        width={['100%', '800px']}
        margin="0 auto"
        padding="0px !important"
        onChange={(index) => setTabIndex(index)}
        index={tabIndex}
      >
        <TabList
          padding="0"
          marginBottom="20px"
          justifyContent="center"
          gap="20px"
        >
          {quizQuestions.map((question, index) => (
            <Tab
              key={question.q}
              bg="#5893CE"
              _selected={{ bg: '#00A3FF' }}
              color="#fff"
            >
              {index + 1}
            </Tab>
          ))}
        </TabList>
        <TabPanels padding="0">
          {quizQuestions.map((question, index) => (
            <TabPanel key={index}>
              <Text
                color="#0E6CCB"
                marginBottom="45px"
                fontSize="26px"
                textAlign="center"
                fontWeight="600"
              >
                {question.q}
              </Text>
              <Flex flexDirection="column" gap="15px">
                {question.as.map((answer, answerIndex) => (
                  <QuizItem
                    key={answerIndex}
                    answer={answer}
                    id={answerIndex}
                    resultCallBack={(result: boolean) =>
                      selectAnswer(index, result)
                    }
                    canSelect={canSelect(index)}
                  />
                ))}
              </Flex>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Quiz;
