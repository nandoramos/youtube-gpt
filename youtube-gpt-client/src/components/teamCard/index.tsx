import { TeamMember } from '@/types';
import { Card, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, ButtonGroup, Button, Box, IconButton, useColorModeValue } from '@chakra-ui/react'
import { BsGithub } from 'react-icons/bs'
import { MdEmail} from 'react-icons/md'

// const TeamCard = ({ name, avatar, description }: TeamMember) => {
const TeamCard = ({ name, role, avatar, description, github, email }: TeamMember) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minH="300px">
      <Card maxW='sm'>
        <CardBody>
          <Image
            src={avatar}
            alt={name}
            borderRadius='lg'
          />
          <Stack mt='6' spacing='3'>
            <Heading size='md'>{name}</Heading>
            <Text>
              {role}
            </Text>
            <Text>
              {description}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing='2'>
            <Box as="a" href={github}>
              <IconButton
                aria-label="github"
                variant="ghost"
                size="lg"
                fontSize="3xl"
                icon={<BsGithub />}
                _hover={{
                  bg: 'blue.500',
                  color: useColorModeValue('white', 'gray.700'),
                }}
                isRound
              />
            </Box>

            <Box as="a" href={email}>
              <IconButton
                aria-label="twitter"
                variant="ghost"
                size="lg"
                icon={<MdEmail size="28px" />}
                _hover={{
                  bg: 'blue.500',
                  color: useColorModeValue('white', 'gray.700'),
                }}
                isRound
              />
            </Box>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </Box>
  );
};


export default TeamCard;