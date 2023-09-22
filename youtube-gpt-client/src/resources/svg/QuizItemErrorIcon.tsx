import { IconProps } from '@/types';

const QuizItemErrorIcon = ({ width, height, color }: IconProps) => {
  return (
    <svg
      width={width || '36'}
      height={height || '36'}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="18" cy="18" r="18" fill="#EDE8E3" />
      <path
        d="M15.3182 10.3636L17.6648 14.3295H17.7557L20.1136 10.3636H22.892L19.3409 16.1818L22.9716 22H20.142L17.7557 18.0284H17.6648L15.2784 22H12.4602L16.1023 16.1818L12.5284 10.3636H15.3182Z"
        fill={color || '#FF3F3F'}
      />
    </svg>
  );
};

export default QuizItemErrorIcon;
