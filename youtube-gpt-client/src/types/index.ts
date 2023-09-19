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

