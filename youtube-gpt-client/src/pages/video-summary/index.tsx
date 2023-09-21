import { Flex, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { withRouter, NextRouter } from 'next/router';

interface WithRouterProps {
  router: NextRouter;
}

const VideoSummaryPage = ({ router }: WithRouterProps) => {
  console.log(router.query);
  return (
    <Flex direction="column">
      <Heading>Youtube video</Heading>
      <Link href={router.query.youtubeUrl as string}>
        {router.query.youtubeUrl}
      </Link>
      <Heading>Summary</Heading>
      <Text>{router.query.summary}</Text>
    </Flex>
  );
};

export default withRouter(VideoSummaryPage);
