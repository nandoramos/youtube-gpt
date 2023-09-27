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
      "Gaming and tech enthusiast, have some skills in C#, Xamarin, JavaScript, and frontend development, all while trying to keep my feline friends from writing code – they're quite persuasive!",
    github: 'anderson-olive',
    email: 'anderson.oliveira@tarmac.io',
  },
  {
    name: 'Fernando Ramos',
    role: 'Backend Dev, UI Designer',
    avatar: 'https://lh3.googleusercontent.com/a/ACg8ocIpUWD-sauEhNCr67PIv0y4P-qlnk8BoowHSiIGVvt47Rk=s576-c-no',
    description:
      'A creature who lives in a mix world of hippies and devs. Believe in peace, love, and clean code.',
    github: 'nandoramos',
    email: 'nando@tarmac.io',
  },
  {
    name: 'Florencia Rosas',
    role: 'Backend Dev',
    avatar: '',
    description:
      "When I'm not coding, I'm perfecting my Bachata moves. The artistry of dance inspires my work.",
    github: 'frosastn',
    email: 'florencia.rosas@tarmac.io',
  },
  {
    name: 'Nicolás López',
    role: 'Frontend Dev',
    avatar: '',
    description:
      'I have mainly worked with React and Angular in the last 5 years in addition to other less popular technologies. I have the joy of working at tarmac for a year now. But technology is not all in life, I also love playing music and sports.',
    github: 'nnicolopez',
    email: 'nicolas.lopez@tarmac.io',
  },
  {
    name: 'Paula Pereyra',
    role: 'Frontend Dev',
    avatar: 'https://lh3.googleusercontent.com/a/ACg8ocKHq1pd0mMq6wa5GiilN-xZYchNt5SD32UYeaVIEXgahw=s288-c-no',
    description:
      "I'm just a girl sitting in front of a computer asking my code to work so I can eat, travel & do murga.",
    github: 'paullieness',
    email: 'paula.pereyra@tarmac.io',
  },
];

const getAvatar = (member: TeamMember): string => {
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
            key={member.name}
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
