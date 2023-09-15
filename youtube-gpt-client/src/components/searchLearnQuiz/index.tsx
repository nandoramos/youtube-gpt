import { Button, Flex, Input, Text } from '@chakra-ui/react';
import SearchLearnQuizIcon from '../searchLearnQuizIcon';
import { useState } from 'react';

const SearchLearnQuiz = () => {
  const [videoUrl, setVideoUrl] = useState('');

  const handleSubmit = () => {
    // Send video URL to API

    // Reset input
    setVideoUrl('');
  };

  return (
    <Flex width="700px" direction="column" margin="0 auto">
      <Flex gap="30px">
        <SearchLearnQuizIcon />
        <Flex direction="column" fontSize="70px" fontWeight="bold">
          <Text>Search</Text>
          <Text>Learn</Text>
          <Text>Quiz</Text>
        </Flex>
      </Flex>
      <Flex width="80%" alignSelf="center" alignItems="center">
        <Input
          type="url"
          placeholder="Paste your video link here"
          padding="0 20px"
          variant="unstyled"
          style={{
            backgroundColor: '#F5F5F5',
            borderRadius: '20px',
            border: '2px solid #fff',
            zIndex: 2,
            boxSizing: 'content-box',
            height: '40px',
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
          }}
          onClick={handleSubmit}
        >
          START
        </Button>
      </Flex>
    </Flex>
  );
};

export default SearchLearnQuiz;
