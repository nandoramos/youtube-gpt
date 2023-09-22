import QuizItemErrorIcon from '@/resources/svg/QuizItemErrorIcon';
import QuizItemSuccessItem from '@/resources/svg/QuizItemSuccessIcon';
import { QuizItemProps, QuizItemColorVariants } from '@/types';
import { Box } from '@chakra-ui/layout';
import { useState } from 'react';

const QuizItem = ({ answer, id, resultCallBack, canSelect }: QuizItemProps) => {
  const quizStyle = {
    default: {
      backgroundColor: '#F4F3F6',
      border: '2px solid #F4F3F6',
      _hover: { cursor: 'pointer', bg: '#EDE8E3', borderColor: '#222222' },
    },
    success: {
      backgroundColor: '#1DF64D',
      border: '2px solid #1DF64D',
      _hover: { cursor: 'pointer' },
    },
    error: {
      backgroundColor: '#FF3F3F',
      border: '2px solid #FF3F3F',
      _hover: { cursor: 'pointer' },
    },
  };

  const [variant, setVariant] = useState<QuizItemColorVariants>(
    quizStyle.default,
  );

  const checkQuizItem = () => {
    if (!canSelect) return;

    if (answer.c) {
      setVariant(quizStyle.success);
    } else {
      setVariant(quizStyle.error);
    }

    if (resultCallBack) {
      resultCallBack(answer.c);
    }
  };
  const item = (id: number) => {
    if (JSON.stringify(variant) === JSON.stringify(quizStyle.error)) {
      return <QuizItemErrorIcon width={32} height={32} />;
    }
    if (JSON.stringify(variant) === JSON.stringify(quizStyle.success)) {
      return <QuizItemSuccessItem width={36} height={36} />;
    }

    return (
      <Box
        borderRadius="16px"
        width="32px"
        height="32px"
        border="2px solid #EDE8E3"
        backgroundColor="#EDE8E3"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        verticalAlign="middle"
        _groupHover={{ border: '2px solid #222222' }}
      >
        {String.fromCharCode(97 + id).toUpperCase()}
      </Box>
    );
  };
  return (
    <Box
      width="100%"
      height="60px"
      padding="12px 16px"
      fontWeight="400"
      display="flex"
      flexDirection="row"
      gap="17px"
      role="group"
      borderRadius="8px"
      onClick={() => checkQuizItem()}
      sx={variant}
    >
      {item(id)}
      {answer.a}
    </Box>
  );
};

export default QuizItem;
