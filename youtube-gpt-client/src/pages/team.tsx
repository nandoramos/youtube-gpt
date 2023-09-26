import { GetStaticProps } from 'next';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Box, Grid, GridItem, Heading } from '@chakra-ui/react';
import TeamCard from '@/components/teamCard';

const members = [
  {
    name: '1 Lorem ipsum',
    role: 'Lorem',
    avatar: 'https://i.blogs.es/ef92d3/avatar-sentido-del-agua/450_1000.jpg',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
    github: 'https://github.com/nandoramos/youtube-gpt/1',
    email: 'hola@tarmac.io',
  },
  {
    name: '2 Lorem ipsum',
    role: 'Perspiciatis',
    avatar: 'https://i.blogs.es/ef92d3/avatar-sentido-del-agua/450_1000.jpg',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam. ',
    github: 'https://github.com/nandoramos/youtube-gpt/2',
    email: 'hola@tarmac.io',
  },
  {
    name: '3 Lorem ipsum',
    role: 'Omnis',
    avatar: 'https://i.blogs.es/ef92d3/avatar-sentido-del-agua/450_1000.jpg',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam. ',
    github: 'https://github.com/nandoramos/youtube-gpt/3',
    email: 'hola@tarmac.io',
  },
  {
    name: '4 Lorem ipsum',
    role: 'Natus',
    avatar: 'https://i.blogs.es/ef92d3/avatar-sentido-del-agua/450_1000.jpg',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam. ',
    github: 'https://github.com/nandoramos/youtube-gpt/4',
    email: 'hola@tarmac.io',
  },
  {
    name: '5 Lorem ipsum',
    role: 'Natus',
    avatar: 'https://i.blogs.es/ef92d3/avatar-sentido-del-agua/450_1000.jpg',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam. ',
    github: 'https://github.com/nandoramos/youtube-gpt/4',
    email: 'hola@tarmac.io',
  },
];

const Team = () => {
  const { t } = useTranslation('team');
  return (
    <Box width="100%">
      <Heading
        as="h2"
        textAlign="center"
        fontWeight="semibold"
        fontSize="32px"
        color="#0E6CCB"
        paddingBottom="4"
      >
        {t('title')}
      </Heading>
      <Grid templateColumns="repeat(4, 1fr)" gap="30px" rowGap='70px'>
        {members.map((member) => (
          <GridItem display="flex" justifyContent="center">
            <TeamCard
              name={member.name}
              role={member.role}
              avatar={member.avatar}
              description={member.description}
              github={member.github}
              email={member.email}
            />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default Team;

export const getStaticProps: GetStaticProps = async (context) => {
  let { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en')),
    },
  };
};
