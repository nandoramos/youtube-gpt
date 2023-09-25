
import { GetStaticProps } from 'next';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ReactElement } from 'react';
import { FcStart, FcRules, FcApprove } from 'react-icons/fc';
import {
  Box,
  Heading,
  Text,
  Icon,
  SimpleGrid,
  Flex,
  Stack,
} from '@chakra-ui/react';


interface FeatureProps {
  title: string;
  text: string;
  icon: ReactElement;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'gray.100'}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={'gray.600'}>{text}</Text>
    </Stack>
  );
};

const HowItWorks = () => {
  const { t } = useTranslation('howItWorks');

  return (
    <Box p={6}>
      <Heading
        fontWeight={600}
        fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
        lineHeight={'110%'}
        w="90vw"
        textAlign={'center'}
      >
        {t('title')} <br />
        <Text as={'span'} color={'#0E6CCB'} fontSize={'28px'}>
        {t('subtitle')}


        </Text>
      </Heading>

      <Box p={4} marginTop={'10px'}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <Feature
            icon={<Icon as={FcStart} w={10} h={10} />}
            title={t('step1.title')}
            text={t('step1.text')}
          />
          <Feature
            icon={<Icon as={FcRules} w={10} h={10} />}
            title={t('step2.title')}
            text={t('step2.text')}
          />
          <Feature
            icon={<Icon as={FcApprove} w={10} h={10} />}
            title={t('step3.title')}
            text={t('step3.text')}
          />
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default HowItWorks;
export const getStaticProps: GetStaticProps = async (context) => {
  let { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en')),
    },
  };
};
