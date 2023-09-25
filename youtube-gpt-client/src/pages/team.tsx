import { GetStaticProps } from 'next';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Box, Grid, GridItem, Heading } from '@chakra-ui/react';
import TeamCard from '@/components/teamCard';

const Team = () => {
  const { t } = useTranslation('team');
  const members = t('members', { returnObjects: true }) as { name: string, role: string, avatar: string, description: string, github: string, email: string }[];

  return (
    <Box>
      <Heading
        as="h2"
        textAlign="center"
        fontWeight="semibold"
        fontSize="32px"
        color="#0E6CCB"
      >
        {t('title')}
      </Heading>
      <Grid templateColumns="repeat(5, 1fr)" gap="30px">
        {members.map((member) => (
          <GridItem>
            <TeamCard name={member.name} role={member.role} avatar={member.avatar} description={member.description} github={member.github} email={member.email} />
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
