import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export enum Lang {
  EN = 'en',
  ES = 'es',
}

export class ProcessVideo {
  @IsNotEmpty()
  videoId: string;

  @IsEnum(Lang)
  lang: Lang = Lang.EN;
}


