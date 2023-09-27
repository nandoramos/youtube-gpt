import { GetStaticProps } from 'next';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Box, Flex, Grid, GridItem, Heading } from '@chakra-ui/react';
import TeamCard from '@/components/teamCard';
import { TeamMember } from '@/types';

const members = [
  {
    name: 'Anderson Oliveira',
    role: 'Frontend Dev, UI Designer',
    avatar: '',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
    github: 'anderson-olive',
    email: 'anderson.oliveira@tarmac.io',
  },
  {
    name: 'Fernando Ramos',
    role: 'Backend Dev, UI Designer',
    avatar: '',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam. ',
    github: 'nandoramos',
    email: 'nando@tarmac.io',
  },
  {
    name: 'Florencia Rosas',
    role: 'Backend Dev',
    avatar: '',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam. ',
    github: 'frosastn',
    email: 'florencia.rosas@tarmac.io',
  },
  {
    name: 'Nicolás López',
    role: 'Frontend Dev',
    avatar: '',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam. ',
    github: 'nnicolopez',
    email: 'nicolas.lopez@tarmac.io',
  },
  {
    name: 'Paula Pereyra',
    role: 'Frontend Dev',
    avatar: '',
    description:
      'I\'m just a girl asking my code to work so I can eat, travel & do murga',
    github: 'paullieness',
    email: 'paula.pereyra@tarmac.io',
  },
];

const getAvatar = (member: TeamMember) : string => {
  return member.avatar || `https://github.com/${member.github}.png`;
};

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
      <Flex justifyContent="center" gap="30px" width="100%" flexFlow="wrap">
        {members.map((member) => (
          <TeamCard
            name={member.name}
            role={member.role}
            avatar={getAvatar(member)}
            description={member.description}
            github={`https://github.com/${member.github}`}
            email={member.email}
          />
        ))}
      </Flex>
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


