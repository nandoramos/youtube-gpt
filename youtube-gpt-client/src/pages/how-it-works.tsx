import { CSSProperties } from 'react';
import { GetStaticProps } from 'next';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Box, Grid, GridItem, Heading, Text } from '@chakra-ui/react';
import { getFeatures } from '@/services/howItWorks';

const indexDotStyle: CSSProperties = {
  content: '""',
  display: 'inline-block',
  width: '8px',
  height: '8px',
  borderRadius: '4px',
  backgroundColor: '#5893CE',
  marginLeft: '5px',
};

const HowItWorks = () => {
  const { t } = useTranslation('howItWorks');
  const features = getFeatures();

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
      <Grid templateColumns="repeat(2, 1fr)" gap="50px">
        {features.map((feature, index) => (
          <GridItem key={index} padding="30px">
            <Box>
              <Text _after={indexDotStyle} fontSize="36px" fontWeight="semibold">
                {index + 1}
              </Text>
              <Heading fontSize="24px" fontWeight="semibold" margin="15px 0 10px">
                {t(feature.title)}
              </Heading>
            </Box>
            <Text fontSize='16px' fontWeight="medium" color="#828282">
              {t(feature.description)}
            </Text>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default HowItWorks;

export const getStaticProps: GetStaticProps = async (context) => {
  let { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en')),
    },
  };
};
