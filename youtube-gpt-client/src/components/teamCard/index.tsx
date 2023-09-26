import { TeamMember } from '@/types';
import { EmailIcon } from '@chakra-ui/icons';
import { Card, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, ButtonGroup, Box, IconButton, useColorModeValue } from '@chakra-ui/react'
import { BsGithub } from 'react-icons/bs'

// const TeamCard = ({ name, avatar, description }: TeamMember) => {
const TeamCard = ({ name, role, avatar, description, github, email }: TeamMember) => {

  return (
      <Card align='center' rounded='xl' boxShadow='2xl' width='320px'>
        <CardBody>
          <Image
            src={avatar}
            alt={name}
            width='278px'
            height='220px'
            objectFit='cover'
          />
          <Stack mt='6' spacing='3' align='center'>
            <Heading size='md' fontSize='18px'>{name}</Heading>
            <Text fontSize='14px' color='#7E7E7E'>
              {role}
            </Text>
            <Text fontSize='12px' >
              {description}
            </Text>
          </Stack>
        </CardBody>
        <CardFooter>
          <ButtonGroup spacing='1'>
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

            <Box as="a" href={`mailto:${email}`}>
              <IconButton
                aria-label="email"
                variant="ghost"
                size="lg"
                fontSize="3xl"
                icon={<EmailIcon />}
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
  );
};


export default TeamCard;