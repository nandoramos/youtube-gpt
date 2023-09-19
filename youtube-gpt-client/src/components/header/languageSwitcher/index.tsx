import LanguageIcon from '@/resources/svg/LanguageIcon';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation('menu');
  const router = useRouter();
  const { pathname, asPath, query } = router;

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang, () => {
      setCookie(null, 'NEXT_LOCALE', lang, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
      router.push({ pathname, query }, asPath, { locale: lang });
    });
  };

  return (
    <Menu closeOnSelect={true}>
      <MenuButton>
        <LanguageIcon />
      </MenuButton>
      <MenuList minWidth="240px" color="#000">
        <MenuOptionGroup
          defaultValue={i18n?.language}
          title={t('lang.select')}
          type="radio"
        >
          <MenuItemOption value="en" onClick={() => changeLang('en')}>
            {t('lang.en')}
          </MenuItemOption>
          <MenuItemOption value="es" onClick={() => changeLang('es')}>
            {t('lang.es')}
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default LanguageSwitcher;
