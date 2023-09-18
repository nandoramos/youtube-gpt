import { Flex, Heading, Link, Text } from '@chakra-ui/react';
import { CSSProperties } from 'react';

const buttonStyle: CSSProperties = {
  textTransform: 'uppercase',
  padding: '10px 30px',
  borderRadius: '5px',
  textDecoration: 'none',
};

const buttonHover: CSSProperties = {
  boxShadow: '0 2px 4px rgb(0, 0, 0, .3)',
}

const VideoSummary = () => {
  const youtubeVideoURL =
    'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4';
  const summaryText = `Consectetur officia dolor voluptate aute. Qui sunt sit qui consequat minim nulla esse velit anim laboris voluptate. Ipsum culpa ad cupidatat fugiat sint occaecat aute nostrud. Qui nulla sint voluptate amet nulla excepteur sint in.
    Quis et laborum consectetur proident commodo incididunt fugiat reprehenderit. Excepteur id ullamco id pariatur do. Commodo laborum elit consectetur amet velit consequat aute ullamco excepteur laboris adipisicing quis laborum. Reprehenderit et eu aliqua voluptate enim in ex sunt pariatur ipsum. Consequat reprehenderit incididunt amet fugiat deserunt. Tempor enim officia sunt et esse incididunt Lorem reprehenderit commodo dolore mollit dolore.
    Lorem dolor et aute et sunt est. Veniam eu officia nulla non labore velit cillum. Cillum duis nostrud veniam aute reprehenderit velit ut minim aliquip id quis reprehenderit nisi. Pariatur sint et cillum minim. Aliquip cillum sit non reprehenderit eiusmod id amet officia. Lorem dolor voluptate laborum esse commodo eu aute sit sit. Laborum ipsum laboris commodo reprehenderit sunt nostrud cillum.
    Officia cillum aliqua elit adipisicing tempor in eu exercitation est dolore quis non dolore do. Cillum eu duis nostrud cupidatat sunt voluptate ea cillum occaecat pariatur id est labore. Sit deserunt in sit anim esse proident. Adipisicing elit aliquip mollit dolor est cillum consequat nulla fugiat nisi do.
    Cupidatat eiusmod veniam enim sunt aute excepteur quis voluptate. Aliquip occaecat tempor cillum ea nostrud ex sunt. Cupidatat minim ea ut deserunt elit consectetur. Elit anim ad voluptate nostrud cupidatat minim officia tempor laborum consequat quis. Id ullamco ullamco laboris id voluptate officia incididunt.
`;
  return (
    <Flex gap="30px">
      <Flex direction="column">
        <video
          controls
          poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
          src={youtubeVideoURL}
          width="620"
        >
          <Text>
            Your browser doesn't support HTML video. Here is a
            <Link href="myVideo.mp4">link to the video</Link> instead.
          </Text>
        </video>
        <Flex justifyContent="flex-end" gap="20px" padding="20px 0">
          <Link
            style={buttonStyle}
            color="#5893CE"
            backgroundColor="rgb(0, 122, 255, .1)"
            href="/"
            _hover={buttonHover}
          >
            Cancel
          </Link>
          <Link
            style={buttonStyle}
            color="#fff"
            backgroundColor="#5893CE"
            href="/quiz"
            _hover={buttonHover}
          >
            Start Quiz
          </Link>
        </Flex>
      </Flex>
      <Flex direction="column" width="60%">
        <Heading as="h3" textAlign="center" marginBottom="20px 0">
          Video Summary
        </Heading>
        <Text>{summaryText}</Text>
      </Flex>
    </Flex>
  );
};

export default VideoSummary;
