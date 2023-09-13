import { IsNotEmpty } from "class-validator";

export class CreateTranscriptionDto {
  @IsNotEmpty()
  videoId: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  text: string;
}
