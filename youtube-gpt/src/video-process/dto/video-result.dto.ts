import { IsNotEmpty } from "class-validator";

export class VideoResult {
  @IsNotEmpty()
  videoId: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  transcription: string;

  @IsNotEmpty()
  summary: string;

  @IsNotEmpty()
  quiz: string
}
