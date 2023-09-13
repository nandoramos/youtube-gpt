import { IsNotEmpty } from "class-validator";

export class VideoResult {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  transcription: string;

  @IsNotEmpty()
  summary: string;

  @IsNotEmpty()
  quiz: string
}
