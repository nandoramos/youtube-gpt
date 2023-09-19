import { IconProps } from '@/types';

const LanguageIcon = ({ width, height, color }: IconProps) => {
  const iconColor = color || 'white';
  return (
    <svg
      width={width || '30'}
      height={height || '30'}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 25C20.5228 25 25 20.5228 25 15C25 9.47715 20.5228 5 15 5C9.47715 5 5 9.47715 5 15C5 20.5228 9.47715 25 15 25Z"
        stroke={iconColor}
        strokeWidth="2"
      />
      <path
        d="M15 25C17.0711 25 18.75 20.5228 18.75 15C18.75 9.47715 17.0711 5 15 5C12.9289 5 11.25 9.47715 11.25 15C11.25 20.5228 12.9289 25 15 25Z"
        stroke={iconColor}
        strokeWidth="2"
      />
      <path
        d="M15 25C17.0711 25 18.75 20.5228 18.75 15C18.75 9.47715 17.0711 5 15 5C12.9289 5 11.25 9.47715 11.25 15C11.25 20.5228 12.9289 25 15 25Z"
        stroke={iconColor}
        strokeWidth="2"
      />
      <path
        d="M5 15H25"
        stroke={iconColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M7 10H23"
        stroke={iconColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M7 20H23"
        stroke={iconColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default LanguageIcon;
