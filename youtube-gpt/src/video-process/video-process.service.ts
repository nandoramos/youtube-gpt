import { OpenaiService } from "src/openai/openai.service";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import * as ytdl from "ytdl-core";

@Injectable()
export class VideoProcessService {
  constructor(private openaiService: OpenaiService) {}

  questions = [
    {
      en: "Add a title to this text",
      es: "Puedes generarme un titulo para este texto?",
    },
    {
      en: "give me a 200 words summary to this text",
      es: "Puedes generar un resumen de 200 palabras para este texto?",
    },
    {
      en: "give me a quiz with 5 multiple options questions taken from the text and the results",
      es: "dame un quiz de 5 preguntas multiple opcion y el resultado relativas al texo que te pase",
    },
  ];

  async processVideo(videoId: string, lang: string): Promise<string> {
    const transcribedText =
      "This is an example text in order to show something long";
    const question = "What is the meaning of life?";
    const max_tokens = 80;

    console.log("videoId", videoId);
    console.log("lang", lang);

    return this.transcribe(videoId, lang)

    // return await this.openaiService.getResponseFromOpenAI(
    //   transcribedText,
    //   question,
    //   max_tokens
    // );
  }

  async transcribe(videoId: string, lang: string): Promise<string> {

    console.log("transcribe 0");
    const url = `https://www.youtube.com/watch?v=${videoId}`;

    console.log("transcribe 0", url);

    if (!ytdl.validateURL(url)) {
      throw new HttpException("Invalid URL", HttpStatus.BAD_REQUEST);
    }

    console.log("transcribe 0.5", url);

    const info = await ytdl.getInfo(url);

    console.log("transcribe 1");
    const audioFormat = ytdl.chooseFormat(info.formats, {
      filter: "audioonly",
      quality: "highestaudio",
    });
    console.log("transcribe 2");
    if (!audioFormat) {
      throw new HttpException("No audio found", HttpStatus.BAD_REQUEST);
    }
    console.log("transcribe 3");
    const audioStream = ytdl(url, { format: audioFormat });
    console.log("transcribe 4");
    const transcribedText = await this.openaiService.transcribeAudio(audioStream);
    console.log("transcribe 5");
    return transcribedText;
  }


}
