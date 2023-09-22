import { SystemStyleObject } from "@chakra-ui/react";
import { ReactElement } from "react";

export interface PropsWithChildren {
  children?: ReactElement;
  isClientLoaded?: boolean;
}
export interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

export interface QuestionQA {
  a: string;
  c: boolean;
}
export interface QuestionModel {
  q: string;
  as: QuestionQA[];
}

export interface QuestionResponse {
  questionIndex: number;
  response: boolean;
}

export interface QuizItemProps {
  answer: QuestionQA;
  id: number;
  resultCallBack?: (correct: boolean) => void;
  canSelect: boolean;
}

export interface QuizItemColorVariants {
  backgroundColor: string;
  border: string;
  _hover: SystemStyleObject | undefined;
}

export interface QuizPageResultProps {
  questions?: number;
  correct?: number;
  wrong?: number;
}
